import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory } from '@chatdaddy/service-auth-client'
import { AccountApi, AccountTier, AccountType, Configuration } from '../src'

(async() => {
	const { REFRESH_TOKEN, TEAM_ID } = process.env
	if(!REFRESH_TOKEN || !TEAM_ID) {
		throw new Error('refresh token or team id not specified')
	}

	const getAccessToken = makeAccessTokenFactory({
		request: { refreshToken: REFRESH_TOKEN }
	})

	const { token: accessToken } = await getAccessToken(TEAM_ID)
	const accountsApi = new AccountApi(new Configuration({ accessToken }))
	const { data } =  await accountsApi.accountsPost({
		// just a nickname -- does not need to be unique
		// this is just for display purposes
		nickname: 'My New Account',
		// change the tier to upgrade/downgrade functionality
		// this one gives only limited messages, and syncs no chat history
		tier: AccountTier.LimitedMsgNoChatHistory,
		type: AccountType.Wa
	})

	console.log(`purchases & created a new account with ID: "${data.accountId}"!`)

	// call below functions as required

	/// removes the account & all associated data
	/// and cancels any active subscription
	async function deleteAccount(accountId: string) {
		await accountsApi.accountsDelete(accountId)
	}

	/// logs out of the account & removes all synced chats, messages
	/// keeps contacts, and notes
	async function archiveAccount(accountId: string) {
		await accountsApi.accountsArchive(accountId)
	}

	/// upgrades the account tier to "unlimited messages & chat history"
	async function updateAccountTier(accountId: string) {
		await accountsApi.accountsPatch(accountId, {
			tier: AccountTier.UnlimitedMsgChatHistory	
		})
	}
})()