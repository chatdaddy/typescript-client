import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, Scope } from '@chatdaddy/service-auth-client'
import { ChatsApi, Configuration } from '../src'

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

	const { data: { chats: unreadChats } } = await chatsApi.chatsGet(
		undefined, // Count, Limit of chats to get eg. 10
		undefined, // Page count eg. 2,
		undefined, // Filter archieved or unarchived chats eg. false
		true, //Filter only unread messages eg. true
	)

	console.log(`got ${unreadChats.length} unread chats`)

	const { data: { chats: groupChats } } = await chatsApi.chatsGet(
		undefined, // Count, Limit of chats to get eg. 10
		undefined, // Page count eg. 2,
		undefined, // Filter archieved or unarchived chats eg. false
		undefined, //Filter only unread messages eg. true
		undefined, // Filter Chats that have pending messages eg. true
		undefined, // Search for user Id mentioned in chat
		undefined, // Filter chats that have any unsolved notes
		undefined, // Filter chats where last message was from me
		undefined, // Filter contacts who fall in either of these tags
		undefined, // Filter these specific contact ids
		undefined, // Search string for contact name/phone number/email
		undefined, // Filter contacts assigned to the specified users
		undefined, // Filter contacts only belonging to this account,
		undefined,
		'group'
	)

	console.log(`got ${groupChats.length} group chats`)

	const { data: { chats: individualChats } } = await chatsApi.chatsGet(
		undefined, // Count, Limit of chats to get eg. 10
		undefined, // Page count eg. 2,
		undefined, // Filter archieved or unarchived chats eg. false
		undefined, //Filter only unread messages eg. true
		undefined, // Filter Chats that have pending messages eg. true
		undefined, // Search for user Id mentioned in chat
		undefined, // Filter chats that have any unsolved notes
		undefined, // Filter chats where last message was from me
		undefined, // Filter contacts who fall in either of these tags
		undefined, // Filter these specific contact ids
		undefined, // Search string for contact name/phone number/email
		undefined, // Filter contacts assigned to the specified users
		undefined, // Filter contacts only belonging to this account,
		undefined, // only chats with the given account ID
		'individual'
	)

	console.log(`got ${individualChats.length} individual chats`)

}

run()
