import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, Scope, ChatsApi, Configuration, MessagesApi } from '../src'

/**
 * Example
 * 
 * Finds the first chat in the team & sends a message to it
 */

const run = async() => {
	const { REFRESH_TOKEN, TEAM_ID } = process.env
	if(!REFRESH_TOKEN || !TEAM_ID) {
		throw new Error('refresh token or team id not specified')
	}

	const getAccessToken = makeAccessTokenFactory({
		request: {
			refreshToken: REFRESH_TOKEN,
			// get access to send messages, and read chats
			scopes: [Scope.MessagesSendToAll, Scope.ChatsAccessAll]
		}
	})

	const { token: accessToken } = await getAccessToken(TEAM_ID)
	
	const messagesApi = new MessagesApi(new Configuration({ accessToken }))
	const chatsApi = new ChatsApi(new Configuration({ accessToken }))
	// find the most recent chat in the account
	const { data } = await chatsApi.chatsGet({ count: 1 })
	const chat = data.chats[0]
	// throw error if no chat available
	if(!chat) {
		throw new Error('no chats available')
	}

	console.log(`got chat with name: "${chat.contact?.name || 'unknown'}" and ID: "${chat.id}"`)
	// send a text message to the chat
	const { data: messages } = await messagesApi.messagesPost({
		accountId: chat.accountId,
		chatId: chat.id,
		messageCompose: {
			text: 'Hello from API',
		}
	})

	console.log(`sent message with ID: "${messages[0].id}" to "${messages[0].chatId}"`)
}

run()