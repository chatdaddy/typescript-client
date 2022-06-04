import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, Scope } from '@chatdaddy/service-auth-client'
import { ChatsApi, Configuration, MessagesApi } from '../src'
import { downloadMessageAttachment } from './utils'

/**
 * Example
 * 
 * fetch messages, and download attachments from those messages
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
	const messagesApi = new MessagesApi(new Configuration({ accessToken }))
	// fetch one chat
	const { data: { chats } } = await chatsApi.chatsGet(1)
	if(!chats.length) {
		throw new Error('No chats found, cannot run the example')
	}
	// fetch messages in that chat
	const { data: { messages } } = await messagesApi.messagesGet(chats[0].accountId, chats[0].id)
	for(const msg of messages) {
		// if the message has some attachment, download it
		if(msg.attachments?.length) {
			// get the file name of the attachment
			let filename = msg.attachments![0]?.filename
			if(!filename) { // if it's not present, use message ID
				const type = msg.attachments![0]!.mimetype?.split('/')[1]
				filename = `${msg.id}.${type}`
			}
			// use utility function to download message attachment and save to file
			await downloadMessageAttachment(msg.attachments[0], filename)
		}
	}
}

run()
