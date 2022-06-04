import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, Scope } from '@chatdaddy/service-auth-client'
import { ChatsApi, Configuration, ContactsApi, ContactsPatch, MessageComposeStatusEnum, MessagesApi } from '../src'

const MIN_MESSAGES_RECV = 5

/**
 * Example
 * 
 * Tags all contacts with at least 5 message recv from them
 */

const run = async() => {
	const { REFRESH_TOKEN, TEAM_ID } = process.env
	if(!REFRESH_TOKEN || !TEAM_ID) {
		throw new Error('refresh token or team id not specified')
	}

	const getAccessToken = makeAccessTokenFactory({
		request: {
			refreshToken: REFRESH_TOKEN,
			// get access to read & update contacts
			scopes: [Scope.ContactsReadAll, Scope.ContactsUpdate]
		}
	})

	const { token: accessToken } = await getAccessToken(TEAM_ID)
	
	const contactsApi = new ContactsApi(new Configuration({ accessToken }))
	// fetch all contacts with at least 5 message recv from them
	// also return the total count
	const { data } = await contactsApi.contactsGet(undefined, undefined, undefined, undefined, undefined, MIN_MESSAGES_RECV, undefined, undefined, undefined, undefined, undefined, undefined, true)

	console.log(`got ${data.totalCount} contacts with ${MIN_MESSAGES_RECV} messages recv`)
	// update all the contacts with the tag "Broadcast"
	const update: ContactsPatch = {
		patch: {
			tags: [
				{ name: 'Broadcast' }
			]
		}
	}
	await contactsApi.contactsPatch(undefined, undefined, undefined, undefined, undefined, MIN_MESSAGES_RECV, undefined, undefined, undefined, undefined, undefined, undefined, update)

	console.log(`tagged contacts`)
}

run()