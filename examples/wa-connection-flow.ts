import dotenv from 'dotenv'
dotenv.config()

import { AccountState, AccountType } from './../src/OpenAPI/InstantMessaging/api'
import { Configuration, makeAccessTokenFactory, Scope } from '@chatdaddy/service-auth-client'
import { AccountApi } from '../src'
import qrterminal from 'qrcode-terminal'

const run = async () => {
  const { REFRESH_TOKEN, TEAM_ID } = process.env
  if (!REFRESH_TOKEN || !TEAM_ID) {
    throw new Error('refresh token or team id not specified')
  }

  const getAccessToken = makeAccessTokenFactory({
    request: {
      refreshToken: REFRESH_TOKEN,
      // get access to send messages, and read chats
      scopes: [Scope.AccountCreate, Scope.AccountRead, Scope.ChatsAccessAll],
    },
  })

  const { token: accessToken } = await getAccessToken(TEAM_ID)

  const accountsApi = new AccountApi(new Configuration({ accessToken }))

  //Get first account
  let result = await accountsApi.accountsGet()
  let account = result.data.accounts[0]

  if (!account) {
    //If account doesnt exist create one
    console.log('No account found creating account...')
    const result = await accountsApi.accountsPost({ type: AccountType.Wa, nickname: 'example' })
    account = result.data
  }

  console.log('Connecting account id: ' + account.accountId)

  if (account.state === AccountState.Open) {
    //if account is already open finish
    console.log('Account already open')
    return
  }

  if (account.state === AccountState.Close) {
    // if account is closed open it to start qr code scanning process
    await accountsApi.accountsOpen(account.accountId)
  }

  let qrCode

  while (!qrCode) {
    //poll account until qrcode is available in accounts state info
    result = await accountsApi.accountsGet()
    account = result.data.accounts[0]

    if (account.stateInfo.qr) {
      //print qr code to terminal
      qrCode = account.stateInfo.qr
      qrterminal.generate(account.stateInfo.qr, { small: true })
    }
  }

  // check code has been scanned and account is now open
  let accountNowOpen
  while (!accountNowOpen) {
    result = await accountsApi.accountsGet()
    account = result.data.accounts[0]
    if (account.stateInfo.qr !== qrCode && account.stateInfo.qr) {
      // If device is multi-device qr code will change so need to show again
      qrterminal.generate(account.stateInfo.qr, { small: true })
      qrCode = account.stateInfo.qr
    }
    console.log('Account State: ' + account.state)
    if (account.state === AccountState.Open) {
      accountNowOpen = true
    }
    if (account.state === AccountState.Close) {
      console.log('Account closed because: ' + account.error)
    }
  }

  while (true) {
    // poll account until latest chats fetched
    result = await accountsApi.accountsGet()
    account = result.data.accounts[0]
    if (account.stateInfo.chats) {
      console.log('Latest Chats Fetched at :' + account.stateInfo.chats.completed)
      return
    }
    if (account.stateInfo) {
      console.log('polling for latest chats please wait...')
    }
  }
}

run()
