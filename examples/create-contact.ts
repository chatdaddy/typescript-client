import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, Scope } from '@chatdaddy/service-auth-client'

import { ContactsApi, Configuration } from '../src'

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
			scopes: [Scope.ContactsCreate, Scope.ContactsReadAll]
		}
	})

	const { token: accessToken } = await getAccessToken(TEAM_ID)
	
	const contactsApi = new ContactsApi(new Configuration({ accessToken }))
    
    const contactData = {
        phoneNumber: '918555432346',
        name: 'Jimminy Crocket',
        email: 'jcrockers@gmail.com',
    }    
    await contactsApi.contactsPost({ contacts: [contactData] })
	console.log(`Successfully Created Contact Jimminy Crocket."`)
    
	// throw error if no chat available
	
    const { data: { contacts } } = await contactsApi.contactsGet(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,'Jimminy Crocket')
    
    const contact = contacts[0]
	console.log(`Successfully Fetched Contact ${contact.name}`)
}

run()