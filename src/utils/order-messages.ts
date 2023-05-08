import { SimpleOrderItem } from './types'

const DETECTION_TXT = 'Hi, I would like to place a ShopDaddy order'
const MAX_UQ_PRODUCTS_IN_ORDER = 20

/**
 * Parses an order message and returns an object with
 * the order details. Format of the message is:
 *
 * {{DETECTION_TXT}}
 * - QUANTITYx ITEM_NAME (ITEM_ID)
 *
 * @param txt Eg. of an order message:
 * Hi, I would like to place a ShopDaddy order
 * - 2x hamburger (ham_123)
 * - 1x cheeseburger (cheese_123)
 * - 1x fries (fries_123)
 */
export function checkAndParseOrderMessage(txt: string) {
	const lines = txt.trim().split('\n')
	if(lines[0] !== DETECTION_TXT) {
		return
	}

	if((lines.length - 1) > MAX_UQ_PRODUCTS_IN_ORDER) {
		throw new Error(`Too many unique products in order (max ${MAX_UQ_PRODUCTS_IN_ORDER})`)
	}

	const orderItems: SimpleOrderItem[] = []
	for(const line of lines.slice(1)) {
		const match = line
			.trim()
			.match(/- (\d+)x (.+) \((.+)\)/i)
		if(!match) {
			throw new Error(`Invalid order item: ${line}`)
		}

		orderItems.push({
			quantity: +match[1],
			name: match[2],
			id: match[3]
		})
	}

	return orderItems
}

/**
 * Serialises an order message from an array of order items.
 */
export function serialiseOrderMessage(items: SimpleOrderItem[]) {
	const lines = [
		DETECTION_TXT,
		...items.map(item => `- ${item.quantity}x ${item.name} (${item.id})`)
	]

	return lines.join('\n')
}