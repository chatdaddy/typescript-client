import { OrderMessage, SimpleOrder, SimpleOrderItem } from './types'

const DETECTION_TXT = 'Ordering from WhatsApp Shop:'
const ORDER_DETAILS_START = 'My Order Details:'
const REMARKS_LABEL = 'Total:'
const MAX_UQ_PRODUCTS_IN_ORDER = 20

/**
 * Parses an order message and returns an object with
 * the order details. Format of the message is:
 *
 * {{DETECTION_TXT}}
 * - QUANTITYx ITEM_NAME (ITEM_ID)
 * Total: TOTAL_AMOUNT
 *
 * @param txt Eg. of an order message:
 * Ordering from WhatsApp Shop:
 * ---other content-----
 *
 * My Order Details:
 * - 2 x hamburger (ham_123)
 * - 1 x cheeseburger (cheese_123)
 * - 1 x fries (fries_123)
 * Total: HKD 500
 * Remarks: no pickles
 */
export function checkAndParseOrderMessage(txt: string): SimpleOrder {
    const lines = txt.trim().split('\n')
    if (lines[0] !== DETECTION_TXT) {
        return
    }

    const orderItems: SimpleOrderItem[] = []
    let remarks: string | undefined
    let isOrderDetailsSection = false

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].startsWith(ORDER_DETAILS_START)) {
            isOrderDetailsSection = true
            continue
        }

        if (!isOrderDetailsSection) {
            continue
        }

        if (lines[i].trim() === '') {
            // Stop parsing when an empty line is encountered after order details
            break
        }

        const match = lines[i].trim().match(/(\d+) x (.+) \((.+)\)/i)
        if (!match) {
            throw new Error(`Invalid order item: ${lines[i]}`)
        }

        if (orderItems.length >= MAX_UQ_PRODUCTS_IN_ORDER) {
            throw new Error(`Order contains more than ${MAX_UQ_PRODUCTS_IN_ORDER} unique products`)
        }

        orderItems.push({
            quantity: +match[1],
            name: match[2],
            id: match[3],
        })
    }

    // Extract remarks if present
    const totalLineIndex = lines.findIndex((line) => line.trim().startsWith(REMARKS_LABEL))
    if (totalLineIndex !== -1) {
        const remarksLine = lines[totalLineIndex + 1]
        if (remarksLine && remarksLine.trim() !== '') {
            remarks = remarksLine.trim()
        }
    }

    return { items: orderItems, remarks }
}

/**
 * Serializes an order message from an array of order items.
 *
 * @param order Order details including items and remarks.
 * @param beforeItemsContent Content to add before order items.
 * @param afterItemsContent Content to add after order items.
 */
export function serialiseOrderMessage(
    order: OrderMessage,
    beforeItemsContent?: string,
    afterItemsContent?: string
): string {
    const itemsContent = order.items
        .map((item) => `${item.quantity} x ${item.name} (${item.id}) ${item.currency} ${item.price}`)
        .join('\n')

    const total =
        order.items.length > 0
            ? `${order.items[0].currency} ${order.items.reduce((sum, item) => sum + item.price, 0)}`
            : ''

    const remarksContent = order.remarks ? `Remarks: ${order.remarks}` : ''

    const lines = [`${DETECTION_TXT}\n`]
    if (beforeItemsContent) {
        lines.push(beforeItemsContent)
    }
    lines.push(ORDER_DETAILS_START)
    lines.push(itemsContent)
    lines.push(`\nTotal: ${total}`)
    if (remarksContent) {
        lines.push(remarksContent)
    }
    if (afterItemsContent) {
        lines.push(afterItemsContent)
    }

    return lines.join('\n')
}
