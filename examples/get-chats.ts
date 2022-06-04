import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, Scope, ChatsApi, Configuration } from '../src'

/**
 * Example
 * 
 * fetch chats with different filters
 */

const run = async() => {
	const { REFRESH_TOKEN, TEAM_ID } = process.env
	if(!REFRESH_TOKEN || !TEAM_ID) {
		throw new Error('refresh token or team id not specified')
	}

	const getAccessToken = makeAccessTokenFactory({
		request: {
			refreshToken: REFRESH_TOKEN,
			// get access to read chats
			scopes: [Scope.ChatsAccessAll]
		}
	})

	const { token: accessToken } = await getAccessToken(TEAM_ID)
	
	const chatsApi = new ChatsApi(new Configuration({ accessToken }))

	const { data: { chats: unreadChats } } = await chatsApi.chatsGet({ unread: true })

	console.log(`got ${unreadChats.length} unread chats`)

	const { data: { chats: groupChats } } = await chatsApi.chatsGet({ type: 'group' })

	console.log(`got ${groupChats.length} group chats`)

	const { data: { chats: individualChats } } = await chatsApi.chatsGet({ type: 'individual' })

	console.log(`got ${individualChats.length} individual chats`)

}

run()
