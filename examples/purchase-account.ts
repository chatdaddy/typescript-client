import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, AccountApi, AccountTier, AccountType, Configuration, TeamDetailApi } from '../src'

(async() => {
	const { REFRESH_TOKEN, TEAM_ID } = process.env
	if(!REFRESH_TOKEN || !TEAM_ID) {
		throw new Error('refresh token or team id not specified')
	}

	const getAccessToken = makeAccessTokenFactory({
		request: { refreshToken: REFRESH_TOKEN }
	})

	const { token: accessToken } = await getAccessToken(TEAM_ID)

	await ensureAutoChargeEnabled()

	const accountsApi = new AccountApi(new Configuration({ accessToken }))
	const accountTier = AccountTier.LimitedMsgNoChatHistory
	const { data } =  await accountsApi.accountsPost({
		accountsPostRequest: {
			// just a nickname -- does not need to be unique
			// this is just for display purposes
			nickname: 'My New Account',
			// change the tier to upgrade/downgrade functionality
			// this one gives only limited messages, and syncs no chat history
			tier: accountTier,
			type: 'wa'
		}
	})

	console.log(`purchases & created a new account with ID: "${data.accountId}"!`)

	// call below functions as required

	/// removes the account & all associated data
	/// and cancels any active subscription
	async function deleteAccount(accountId: string) {
		await accountsApi.accountsDelete({ accountId })
	}

	/// logs out of the account & removes all synced chats, messages
	/// keeps contacts, and notes
	async function archiveAccount(accountId: string) {
		await accountsApi.accountsArchive({ accountId })
	}

	/// upgrades the account tier to "unlimited messages & chat history"
	async function updateAccountTier(accountId: string) {
		await accountsApi.accountsPatch({
			accountId,
			accountsPatchRequest: {
				tier: AccountTier.UnlimitedMsgChatHistory
			}
		})
	}

	/// Ensures that auto charge for new accounts is enabled
	/// this allows CD to automatically charge your card
	/// for any new accounts you create
	async function ensureAutoChargeEnabled() {
		const teamDetailApi = new TeamDetailApi(new Configuration({ accessToken }))
		const { data } = await teamDetailApi.teamDetailGet()
		const accountTier = 'limitedMsgNoHistoryAccountDay'
		if(!data.autoChargeItems.includes(accountTier)) {
			await teamDetailApi.teamDetailPatch({
				teamDetailUpdate: {
					autoChargeItems: new Set([...data.autoChargeItems, accountTier])
				}
			})

			console.log('auto charge enabled!')
		}
	}
})()