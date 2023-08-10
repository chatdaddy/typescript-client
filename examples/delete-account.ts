import { AccountApi, Configuration, makeAccessTokenFactory } from "../src"

async function main() {
	const { REFRESH_TOKEN, TEAM_ID, ACCOUNT_ID } = process.env
	if(!REFRESH_TOKEN || !TEAM_ID || !ACCOUNT_ID) {
		throw new Error('refresh token or team id not specified')
	}

	const getAccessToken = makeAccessTokenFactory({
		request: {
			refreshToken: REFRESH_TOKEN,
			// get access to read chats
			scopes: ['ACCOUNT_DELETE']
		}
	})

	const { token: accessToken } = await getAccessToken(TEAM_ID)
	const accountsApi = new AccountApi(new Configuration({ accessToken }))

	console.log(`deleting account with ID: "${ACCOUNT_ID}"`)
	await accountsApi.accountsDelete({ accountId: ACCOUNT_ID })
	console.log(`deletion request submitted: "${ACCOUNT_ID}"`)
	// wait until account is deleted
	while(true) {
		const { data } = await accountsApi.accountsGet({ q: ACCOUNT_ID })
		if(!data.accounts.length) {
			break
		}

		await delay(2500)
	}

	console.log('account deleted')
}

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

main()