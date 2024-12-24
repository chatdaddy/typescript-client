import { join } from "path"
import { Configuration, MessagesApi } from "../src"

import { FilesApi, makeAccessTokenFactory } from "../src"

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
	const filesApi = new FilesApi(new Configuration({ accessToken }))
    // file data
    const fileData = {
        url: 'https://picsum.photos/id/237/200/300',
        name: 'test.jpg',
        mimetype: 'image/jpeg'
    }

    // creates presigned url for file upload
    const { data: result } = await filesApi.filesPost(
        { mimetype: fileData.mimetype, name:  fileData.name },
    )

    // https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html
    // upload file to the url
    const body = new FormData()
    for(const field in result.fields) {
        body.append(field, result.fields[field])
    }

    // download file data from url
    const fileDownload = await fetch(fileData.url)
	const blob = await fileDownload.blob()

    body.append('file', blob)

    // post file data to signed url
    const postResult = await fetch(result.url, {
        method: 'POST',
        body,
    })
    if(postResult.status >= 400) {
        throw new Error('Upload failed')
    }

    // get file url
    const attachmentUrl = new URL(result.url)
    attachmentUrl.pathname = join(attachmentUrl.pathname, result.fields.key)

    console.log('file url:', attachmentUrl.toString())
}

main()
