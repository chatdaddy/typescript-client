import axios from 'axios'
import { createDecipheriv } from 'crypto'
import { createWriteStream } from 'fs'
import { Readable, Transform } from 'stream'
import { MessageAttachment } from './../src'

/**
 * Downloads a message attachment, decrypts if required, and saves it to the given file
 * @param attachment the message attachment
 * @param filename file to save decrypted data to
 */
export const downloadMessageAttachment = async(attachment: MessageAttachment, filename: string) => {
	// download the media
	const data = await axios.get(attachment.url, { responseType: 'stream' })
	let stream: Readable
	// if the media is encrypted, the decryption keys would be provided
	if(attachment.decryption?.keys) {
		const dKeys = attachment.decryption.keys
		const keys = {
			iv: Buffer.from(dKeys.iv, 'base64'),
			cipherKey: Buffer.from(dKeys.enc, 'base64'),
		}
		stream = getDecryptedStream(data.data, keys)
	} else {
		stream = data.data
	}

	const file = createWriteStream(filename)
	for await(const chunk of stream) {
		file.write(chunk)
	}
	file.close()

	console.log(`attachment saved to "${filename}"`)
}
/** decryptes an AES256 encrypted stream, given a cipher & IV */
function getDecryptedStream(stream: Readable, { cipherKey, iv }) {
	const aes = createDecipheriv('aes-256-cbc', cipherKey, iv)

	let remainingBytes = Buffer.from([])
	const output = new Transform({
		transform(chunk, _, callback) {
			let data = Buffer.concat([remainingBytes, chunk])

			const decryptLength = toSmallestChunkSize(data.length)
			remainingBytes = data.slice(decryptLength)
			data = data.slice(0, decryptLength)

			try {
				this.push(aes.update(data))
				callback()
			} catch(error) {
				callback(error)
			}
		},
		final(callback) {
			try {
				this.push(aes.final())
				callback()
			} catch(error) {
				callback(error)
			}
		},
	})

	return stream.pipe(output, { end: true })
}

const AES_CHUNK_SIZE = 16
const toSmallestChunkSize = (num: number) => {
	return Math.floor(num / AES_CHUNK_SIZE) * AES_CHUNK_SIZE
}