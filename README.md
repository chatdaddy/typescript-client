# ChatDaddy Typescript Client

Typescript client for interacting with all ChatDaddy services.
You can use this client to authenticate, send & receive messages, update chats, create groups & everything you expect from the ChatDaddy APIs.

## API Docs

You can find the full API docs for the service [here](https://chatdaddy.stoplight.io/docs/openapi/YXBpOjMwMzA3ODYy-instant-messaging-service)

## Installing the Client

Using NPM:
```
npm i git+https://github.com/chatdaddy/typescript-client
```

Using yarn:
```
yarn add git+https://github.com/chatdaddy/typescript-client
```

You can then import in your code like:
``` ts
import { MessagesApi } from '@chatdaddy/client'
```


## Refresh Tokens and Generating Them

We recommend you use refresh tokens to generate these short lived access tokens. The refresh token is immune to password changes & prevents you from ever entering the password in plaintext. The refresh token automatically becomes invalid after **14 Days** of inactivity.

You do have to use your password to generate a refresh token.
``` ts
import { OAuthApi, encodeSHA256 } from '@chatdaddy/client'

const getRefreshToken = async() => {
	const oAuthApi = new OAuthApi()
	const {
      data: { refresh_token },
    } = await oAuthApi.tokenPost({
      phoneNumber: 85212345678, // use your own ChatDaddy registered phone number
	  password: encodeSHA256('plaintextPassword'), // pass the SHA encoded password
      returnRefreshToken: true,
    })
	return refresh_token
}
console.log(getRefreshToken()) // prints something like "676be3ff-8d6e-4e74-8b0a-16e769d1ee80"
```

## Generating Access Tokens and Using Them

All of ChatDaddy's APIs rely on a single access point using the short lived JWT access token. The access token's schema can be read about [here](https://chatdaddy.stoplight.io/docs/openapi/repos/chatdaddy-service-auth/openapi.yaml/components/schemas/JWT).

Presently, all access tokens last for **1 hour**.

This SDK includes functions to easily generate and persist access tokens from refresh tokens
``` ts
import { makeAccessTokenFactory, MessagesApi } from '@chatdaddy/client'
// create a factory that takes care of auto-renewing access tokens when they expire
const getToken = makeAccessTokenFactory({
	request: {
		refreshToken: '676be3ff-8d6e-4e74-8b0a-16e769d1ee80', // example, use your own refresh token
		scopes: ['MESSAGES_SEND_TO_ALL'] // only add scopes to send messages
	},
})
;(async() => {
	// enter the team ID you want to generate the token for
	// read the section below to see how to get your team ID
	const { token } = await getToken('976bf2fe-ar6e-4e74-8b0a-16e769d1ee80')
	console.log(token)
	// above line would print something like "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

	// send using WA API
	const config = new Configuration(
		{ accessToken: token },
	)
	const messagesApi = new MessagesApi(config)
	const { data: messages } = await messagesApi.messagesPost({
		// use a random channel (API term -- account) in your team
		accountId: 'random',
		// send to phone number
		chatId: '1234667772',
		messageCompose: {
			text: 'Hello from API',
		}
	})
})()

```

## API Tokens
In case you want to use the ChatDaddy API in an environment where you cannot easily generate access tokens from the refresh token, you can use an API token. Use these tokens with caution as they never expire. We recommend you use access tokens as they are more secure.

You can generate API tokens here: https://www.app.chatdaddy.tech/developer/apiToken with the scopes you require.

For examples of how to use API tokens, see the [api-token.ts](/examples/api-token.ts) example.

## Finding Out your Team ID

1. Login & open ChatDaddy App from `https://app.chatdaddy.tech`
2. Navigate to `https://app.chatdaddy.tech/settings/api`
3. Copy team ID from there

Example:
![example](/find-team-id.png)

## Examples

The library has a list of examples of how to use this client, you can find them [here](/examples).

### Running the examples

1. Clone this repository
2. Run `yarn` or `npm i` (whichever package you prefer)
3. Create a `.env` file in the repository folder with the following params:
	```
	REFRESH_TOKEN=<chatdaddy refresh token>
	TEAM_ID=<chatdaddy team id>
	```

	You can get this information from the [API page](https://app.chatdaddy.tech/settings/api) on ChatDaddy.
3. Run example scripts using `yarn ts-node examples/{example-script}`
	- Eg. `yarn ts-node examples/send-message`


### Transcoding Attachments
You should use the "permanentlyStoreAttachments" of "MessagesApi" to save the decoded attachments to your messages. Calling this route for a given message will save the attachment to the message and return the attachment object.

You can find an example of how to do this [here](/examples/transcode.ts)
