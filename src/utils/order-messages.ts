import { OrderMessage, OrderSerialiseContext, SimpleOrder, SimpleOrderItem } from './types'

const DETECTION_TXT = 'Ordering from WhatsApp Shop:'
const ORDER_DETAILS_START = 'My Order Details:'
const REMARKS_LABEL = 'Total:'
const MAX_UQ_PRODUCTS_IN_ORDER = 20
const PAYMENT_GATEWAY_ID_LABEL = '🆔 Payment Gateway ID:'
const SHIPPING_METHOD_LABEL = '🚛 Shipping Method:'
const DELIVERY_FEES_LABEL = '🚚 Delivery Fees:'
const SEPERATOR = '================================'

const PAYMENT_ID_REGEX = new RegExp(/(\bpi_\S+\b)/ig)

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getValueAfterLabel(string: string){
  return string.substring(string.indexOf(':')+2)
}

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
        if (remarksLine.trim()) {
            remarks = remarksLine
        }
    }

    // Extract payment gateway details
    const totalPaymentLines = lines.findIndex((line) => line.trim().startsWith(PAYMENT_GATEWAY_ID_LABEL))
    if(totalPaymentLines !== -1){
        const paymentGatewayLine = lines[totalPaymentLines]
        if(paymentGatewayLine.trim()){
            paymentGatewayId = paymentGatewayLine.trim().match(PAYMENT_ID_REGEX)?.[0]
        }
    }

    //Extract Shipping Details
    let shippingDetails : SimpleOrder['orderContext']['shippingDetails'] = {
        shippingMethod:'delivery',
    }
    const shippingLine = lines.findIndex((line) => line.trim().startsWith(SHIPPING_METHOD_LABEL))

    if(shippingLine !== -1){
        const shippingMethodLine = lines[shippingLine]
        const shippingAddressPickupLine = lines[shippingLine+1]
        const shippingProviderLine = lines[shippingLine+2
        ]
        if(shippingMethodLine.trim()){
          shippingDetails.shippingMethod =  getValueAfterLabel(shippingMethodLine).toLocaleLowerCase().trim() as SimpleOrder['orderContext']['shippingDetails']['shippingMethod']
          
          if(shippingDetails.shippingMethod === 'delivery'){
            shippingDetails.shippingAddress = getValueAfterLabel(shippingAddressPickupLine)
            shippingDetails.shippingOption = getValueAfterLabel(shippingProviderLine)
          }else{
            shippingDetails.pickupLocation = getValueAfterLabel(shippingAddressPickupLine)
          }
        }
    }

    let deliveryFees = 0 
    const deliveryFeesLine = lines.findIndex((line) => line.trim().startsWith(`${DELIVERY_FEES_LABEL}`))
    if(deliveryFeesLine !== -1){
      const deliveryText = lines[deliveryFeesLine]
      deliveryFees = parseFloat(deliveryText.replace(/[^0-9]/g, ""))
    }


    const orderContext: SimpleOrder['orderContext'] = {
        paymentGatewayId, 
        shippingDetails,
        shopName: lines[2].substring(7),
        deliveryFees, 
    }

    return { items: orderItems, remarks, orderContext}
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

    const currency = order.items.length > 0 ? order.items[0].currency : 'USD'

    const subTotal =
        order.items.length > 0
            ? `${order.items.reduce((sum, item) => sum + item.price, 0)}`
            : ''

    const total = subTotal + (order.deliveryFees || 0) 

    const remarksContent = order.remarks ? `Remarks: ${order.remarks}` : ''

    const lines = [`${DETECTION_TXT}\n`]



    // handles serialzing message before main order content
    if (context.shopName.trim() !== "") {

        lines.push(`🛍️ Hi ${context.shopName}`)
        lines.push(`🕒 Order Time: ${new Date().toLocaleString()}`)
        
        lines.push(`\n${SEPERATOR}\n`)
    }

    lines.push(ORDER_DETAILS_START)
    lines.push(itemsContent)
    lines.push(`\n💵 Subtotal: ${currency} ${subTotal}`)

    if(order.deliveryFees){
        lines.push(`🚚 Delivery Fees: ${currency} ${order.deliveryFees}`)
    }

    lines.push(`💵 Grand Total: ${currency} ${total}`)

    if (remarksContent) {
        lines.push(remarksContent)
    }

    lines.push(`\n${SEPERATOR}\n`)

     //Payment type selected when on the checkout section
    if(context?.paymentIntegration?.id){
        lines.push('💳 Payment Status: 🔴 Pending')
        lines.push(`🏦 Payment Gateway: ${context?.paymentIntegration?.name}`)
        lines.push(`${PAYMENT_GATEWAY_ID_LABEL}: ${context?.paymentIntegration?.id}`)
    }


    // handles serialzing message after main order content
    if (order?.customer) {
        
        //Customer Details
        lines.push(`\n👤 Recipient Name: ${order.customer.name}`)
        lines.push(`📱 Recipient Phone: ${order.customer.mobileNumber}`)
    
        // Customer Shipping Details
        lines.push(`\n${SHIPPING_METHOD_LABEL}: ${capitalizeFirstLetter(order.customer.shippingMethod)}`)

        if(order.customer.shippingMethod === 'delivery'){
            lines.push(`📍 Delivery Address: ${order.customer.shippingAddress}`)
            lines.push(`🚚 Delivery Provider: ${order.customer.shippingOption}`)
        }else{
            lines.push(`🏢 Pickup Location: ${order.customer.pickupLocation}`)
        }
    }

    lines.push(`\n${SEPERATOR}\n`)

    return lines.join('\n')
}