import { SimpleOrder, SimpleOrderItem } from './types'

const DETECTION_TXT = 'Hi, I would like to place a ShopDaddy order'
const MAX_UQ_PRODUCTS_IN_ORDER = 20

/**
 * Parses an order message and returns an object with
 * the order details. Format of the message is:
 *
 * {{DETECTION_TXT}}
 * - QUANTITYx ITEM_NAME (ITEM_ID)
 * remarks: REMARKS
 *
 * @param txt Eg. of an order message:
 * Hi, I would like to place a ShopDaddy order
 * - 2x hamburger (ham_123)
 * - 1x cheeseburger (cheese_123)
 * - 1x fries (fries_123)
 * remarks: no pickles
 */
export function checkAndParseOrderMessage(txt: string): SimpleOrder {
	const lines = txt.trim().split('\n')
	if(lines[0] !== DETECTION_TXT) {
		return
	}

	if((lines.length - 1) > MAX_UQ_PRODUCTS_IN_ORDER) {
		throw new Error(`Too many unique products in order (max ${MAX_UQ_PRODUCTS_IN_ORDER})`)
	}

	const orderItems: SimpleOrderItem[] = []
	let remarks: string | undefined
	for(let i = 1; i < lines.length; i++) {
		if(i === lines.length - 1 && lines[i].startsWith('remarks:')) {
			// trim out the "remarks: " part
			remarks = lines[i].substring(8).trim()
			continue
		}

		const match = lines[i]
			.trim()
			.match(/- (\d+)x (.+) \((.+)\)/i)
		if(!match) {
			throw new Error(`Invalid order item: ${lines[i]}`)
		}

		orderItems.push({
			quantity: +match[1],
			name: match[2],
			id: match[3]
		})
	}

	return { items: orderItems, remarks }
}

/**
 * Serialises an order message from an array of order items.
 */
export function serialiseOrderMessage({ items, remarks }: SimpleOrder) {
	const lines = [
		DETECTION_TXT,
		...items.map(item => `- ${item.quantity}x ${item.name} (${item.id})`)
	]

	if(remarks) {
		lines.push(`remarks: ${remarks}`)
	}

	return lines.join('\n')
}