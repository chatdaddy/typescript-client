import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, Scope } from '../src'
import { ChatsApi, Configuration, MessageComposeStatusEnum, MessagesApi } from '../src'

/**
 * Example
 * 
 * Finds the first chat in the team & schedules a message to it
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
	const { data } = await chatsApi.chatsGet(1)
	const chat = data.chats[0]
	// throw error if no chat available
	if(!chat) {
		throw new Error('no chats available')
	}

	console.log(`got chat with name: "${chat.contact?.name || 'unknown'}" and ID: "${chat.id}"`)
	// send a text message to the chat
	const { data: messages } = await messagesApi.messagesPost('random', chat.id, undefined, undefined, undefined, {
		text: 'Hello from API',
		// mark it as a pending message
		// if you want to keep it as a "note", use the status "Note"
		status: MessageComposeStatusEnum.Pending,
		// will send the message in one minute (60_000ms in the future)
		timestamp: new Date(Date.now() + 60_000).toJSON()
	})

	console.log(`sending message with ID: "${messages[0].id}" to "${messages[0].chatId}" on ${messages[0].timestamp}`)
}

run()