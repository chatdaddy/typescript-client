import type { verify } from 'jsonwebtoken'
import { createHash } from 'crypto'
import { ActorMetadata, Configuration, ConfigurationParameters, JWT, OAuthApi, RefreshTokenLoginRequest, Scope } from '../OpenAPI'
import SCOPES from '../scopes.json'

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEevVHEB81+mIuHJ6Ka2+GveuyAb2P
SNEGnm4K1V6HzZF0F9+mQS7N0UHNE+gv0OQIKi5D6e48ZCVytj3iX4Todg==
-----END PUBLIC KEY-----
`

/** exports the binary string used in auth tokens */
export const generateBinaryString = (scopes: Scope[]) => {
	let str = ''
	for (const scope of scopes) {
		const { number } = SCOPES[scope]
		if (str.length <= number) {
			while (str.length < number) {
				str += '0'
			}
			str += '1'
		} else {
			str = str.slice(0, number) + '1' + str.slice(number + 1)
		}
	}
	return str
}

let verifyJWT: typeof verify
/** verify an access token really is valid, returns the decoded object */
export const verifyToken = (token: string) => {
	if (!verifyJWT) {
		verifyJWT = require('jsonwebtoken').verify
	}
	const user = verifyJWT(token, PUBLIC_KEY, { algorithms: ['ES256'] }) as JWT
	return user
}

/** decodes a JWT token and returns the included object */
export const decodeToken = (token: string) => {
	const comps = token.split('.')
	const str = Buffer.from(comps[1], 'base64')?.toString('utf-8')
	return JSON.parse(str || '') as JWT
}
/** get the expiry date of a JWT token */
export const expiryDateOfToken = (jwt: JWT) => (new Date(jwt.exp * 1000))

/** get the scopes from a binary encoded string */
export const getScopes = (binary: string) => {
	const scopes: Scope[] = []
	for (const scope of Object.keys(SCOPES) as Scope[]) {
		if (binary[SCOPES[scope].number] === '1') {
			scopes.push(scope)
		}
	}
	return scopes
}
/** Checks whether this JWT token data has at least one of these scopes */
export const validateUserScopes = (user: JWT, ...scopes: Scope[]) => {
	if (!scopes.length) return { authorized: true, missingScopes: [] }

	const userScopes: string = user.scope
	const missingScopes = scopes.filter(scope =>
		userScopes[SCOPES[scope]?.number] !== '1'
	)
	const authorized = missingScopes.length < scopes.length
	return { authorized, missingScopes }
}

/** Options to create an access token for use in APIs */
export type AccessTokenFactoryOptions = {
	/** extra parameters like scopes to pass to the token generation request */
	request: Omit<RefreshTokenLoginRequest, 'teamId'>
	/** optional list of existing tokens to inject into the cache */
	existingTokens?: string[]
	/** optional config to generate the API client */
	config?: ConfigurationParameters
	/** max number of retries, 500ms delay between requests */
	maxRetries?: number 
	/**
	 * margin in milliseconds to expire the token early
	 * to account for delays in network requests
	 * @default 2m
	 */
	tokenExpiryMarginMs?: number
}

type TokenCacheItem = {
	token: Promise<string | { error: Error }>
	expiresAt: Date | undefined
}

export const makeAccessTokenFactory = (
	{
		request,
		existingTokens,
		config,
		maxRetries,
		tokenExpiryMarginMs = 2 * 60_000
	}: AccessTokenFactoryOptions
) => {

	type TokenCache = { [_: string]: TokenCacheItem }

	existingTokens = existingTokens || []
	maxRetries = maxRetries || 1

	const tokenAPI = new OAuthApi(new Configuration(config || {}))
	const tokenCache: TokenCache = 
		existingTokens.reduce((dict, token) => {
			const jwt = decodeToken(token)
			const expiresAt = new Date(
				expiryDateOfToken(jwt).getTime()
					- tokenExpiryMarginMs
			)
			if(expiresAt.getTime() > Date.now()) {
				dict[jwt.user.teamId] = {
					token: Promise.resolve(token),
					expiresAt
				}
			}
			return dict
		}, {} as TokenCache)

	const makeTokenApiRequest = async(req: RefreshTokenLoginRequest) => {
		return tokenAPI.tokenPost({ authRequest: req })
	}

	return async (teamId: string, metadata?: ActorMetadata) => {
		const key = teamId
			+ (metadata ? '_' + metadata.objectId : '')
		let task = tokenCache[key]
		if(
			!task
			|| (
				!!task.expiresAt
				&& (task.expiresAt?.getTime() < Date.now())
			)
		) {
			tokenCache[key] = {
				token: (async() => {
					try {
						const { data: { access_token } } = await makeTokenApiRequest(
							{ ...request, metadata, teamId }
						)

						const jwt = decodeToken(access_token)
						const expiresAt = new Date(
							expiryDateOfToken(jwt).getTime()
							- tokenExpiryMarginMs
						)
						if(tokenCache[key]) {
							tokenCache[key]!.expiresAt = expiresAt
						}
						return access_token
					} catch(error) {
						delete tokenCache[key]
						return { error }
					}
				})(),
				expiresAt: undefined
			}
		}
		const result = tokenCache[key]
		const token = await result!.token
		if(typeof token === 'object') {
			throw token.error
		}
		return { token, expiresAt: result.expiresAt }
	}
}
/** get the SHA encoded value */
export const encodeSHA256 = (plaintext: string) => (
	createHash('sha256')
		.update(plaintext)
		.digest('base64')
)