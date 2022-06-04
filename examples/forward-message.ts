import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, Scope } from '@chatdaddy/service-auth-client'

import { ChatsApi, Configuration, MessagesApi } from '../src'

/**
 * Example
 * 
 * Forwards latest message sent in one chat to another
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
    
	// find the 2 most recent chats in the account
	const { data } = await chatsApi.chatsGet(2)
    
	const firstChat = data.chats[0]
	const secondChat = data.chats[1]
	// throw error if no chat available
	if(!firstChat || !secondChat) {
		throw new Error('no chats available')
	}

	console.log(`got first chat with name: "${firstChat.contact?.name || 'unknown'}" and ID: "${firstChat.id}"`)
	console.log(`got second chat with name: "${secondChat.contact?.name || 'unknown'}" and ID: "${secondChat.id}"`)
    
    
	// send a text message to the first chat
	const { data: { messages } } = await messagesApi.messagesGet(firstChat.accountId, firstChat.id)
	const message = messages[0]
    
	// forward the message to the second chat
	const { data: forwardedMessages } = await messagesApi.messagesForward(firstChat!.accountId!, firstChat!.id!, message.id, [secondChat.id])

	console.log(`forwarded message with ID: "${forwardedMessages[0].id}" to "${forwardedMessages[0].chatId}" on ${forwardedMessages[0].timestamp}`)
}

run()