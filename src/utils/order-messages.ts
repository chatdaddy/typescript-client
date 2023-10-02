import { OrderMessage, OrderSerialiseContext, PaymentGateway, SimpleOrder, SimpleOrderItem, Customer } from './types'

const DETECTION_TXT = 'Ordering from WhatsApp Shop:'
const ORDER_DETAILS_START = 'My Order Details:'
const REMARKS_LABEL = 'Total:'
const MAX_UQ_PRODUCTS_IN_ORDER = 20
const PAYMENT_GATEWAY_ID_LABEL = 'Payment Gateway ID:'
const SEPERATOR = '==========================='

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
 * 
 * Payment Gateway Name: Stripe
 * Payment Gateway ID: pi_23812312
 */
export function checkAndParseOrderMessage(txt: string): SimpleOrder {
    const lines = txt.trim().split('\n')
    if (lines[0] !== DETECTION_TXT) {
        return
    }

    const orderItems: SimpleOrderItem[] = []
    let remarks: string | undefined
    let paymentGatewayId: string | undefined
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

    // Extract payment gateway details
    const totalPaymentLines = lines.findIndex((line) => line.trim().startsWith(PAYMENT_GATEWAY_ID_LABEL))
    if(totalPaymentLines !== -1){
        const paymentGatewayLine = lines[totalPaymentLines+1]
        if(paymentGatewayLine && paymentGatewayLine.trim() !== ''){
            paymentGatewayId = paymentGatewayLine.trim()
        }
    }

    return { items: orderItems, remarks, paymentGatewayId }
}

function serialisePreOrderMessage(shopName:string):string {

    const beforeLines = []  
    beforeLines.push(`✅Hi! ${shopName}`)
    beforeLines.push(`Order Time: ${new Date().toLocaleString()}`)
    
    return beforeLines.join('\n')
}

function serialisePostOrderMessage(userDetails:Customer | undefined): string | undefined {

    if(!userDetails){
        return
    }

    const afterLines = []

    afterLines.push(`👩🏻 Recipient Name: ${userDetails.name}`)
    afterLines.push(`📞 Recipient Phone: ${userDetails.mobileNumber}`)
    afterLines.push(`🏠 Delivery Address: ${userDetails.shippingAddress}`)

    return afterLines.join('\n')
}

/**
 * Serializes an order message from an array of order items.
 *
 * @param order Order details including items and remarks.
 * @param context Contains details to format before and after messages.
 */
export function serialiseOrderMessage(
    order: OrderMessage,
    context:OrderSerialiseContext,
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

    if (context.shopName.trim() !== "") {
        const beforeContent = serialisePreOrderMessage(context.shopName)
        lines.push(beforeContent)
        lines.push(`\n${SEPERATOR}\n`)
    }

    lines.push(ORDER_DETAILS_START)
    lines.push(itemsContent)
    lines.push(`\nTotal: ${total}`)

    if (remarksContent) {
        lines.push(remarksContent)
    }

     //Payment type selected when on the checkout section
    if(context?.paymentIntegration?.id){
        lines.push(`\n${SEPERATOR}\n`)
        lines.push('\nPayment Status : 🔴Pending')
        lines.push(`\nPayment Gateway:${context?.paymentIntegration?.name}`)
        lines.push(`${PAYMENT_GATEWAY_ID_LABEL} ${context?.paymentIntegration?.id}`)
    }

    if (order?.customer) {
        const afterContent = serialisePostOrderMessage(order.customer)
        lines.push(afterContent)
        lines.push(`\n${SEPERATOR}\n`)
    }

    return lines.join('\n')
}
