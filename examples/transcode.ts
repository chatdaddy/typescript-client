import { writeFileSync } from "fs"
import { makeAccessTokenFactory, MessageAttachment } from "../src"

async function main() {
    const { REFRESH_TOKEN, TEAM_ID } = process.env

	if(!REFRESH_TOKEN || !TEAM_ID) {
		throw new Error('refresh token or team id not specified')
	}

	const getAccessToken = makeAccessTokenFactory({
		request: {
			refreshToken: REFRESH_TOKEN,
		}
	})

	const { token: accessToken } = await getAccessToken(TEAM_ID)

    const message: Pick<MessageAttachment, 'url' | 'decryption'> = {
        // ensure this is the url of a jpg attachment
        // for this example to work
        url: '<insert url here>',
        decryption: {
            keys: {
                enc: '<insert enc here>',
                iv: '<insert iv here>'
            },
            algorithm: 'aes-256-cbc'
        }
    }
    const query = new URLSearchParams({
        url: message.url,
        key: message.decryption?.keys!['enc']!,
        iv: message.decryption?.keys!['iv']!
    })
	const res = await fetch(`https://api.chatdaddy.tech/transcoder/transcode/aes-256-cbc-decrypt?${query.toString()}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    if(!res.ok) {
        throw new Error(`Failed to transcode: ${res.statusText}`)
    }

    const data = await res.arrayBuffer()
    writeFileSync('test.jpg', Buffer.from(data))
}

if(require.main === module) {
    main()
}
