import type { EventName, EventWebhookData } from "../OpenAPI"

export type SimpleOrder = {
    items: SimpleOrderItem[]
    remarks?: string
    orderContext:{
        paymentGatewayName?:string
        paymentGatewayId?:string
        shippingDetails? : {
            shippingAddress?: string
            shippingMethod: 'delivery' | 'pickup' | 'none'
            pickupLocation?: string
            shippingOption?: string
        }
        shopName?: string
        deliveryFees?: number
        additionalFees?: { name: string; amount: string }[]
    }
}

export type SimpleOrderItem = {
    quantity: number
    name: string
    id: string
}

export type OrderMessage = {
    items: OrderItem[]
    remarks?: string
    customer?: Customer
    deliveryFees?: number
    additionalFees?: { name: string; amount: string }[]
}

export type OrderItem = {
    quantity: number
    name: string
    id: string
    price: number
    currency: string
}

export type PaymentGateway = {
    id: string
    name: string
}

export type OrderSerialiseContext = {
    shopName: string
    paymentIntegration?: OrderPaymentIntegration
}

export type Customer = {
    name: string
    mobileNumber: string
    shippingAddress?: string
    shippingMethod: 'delivery' | 'pickup' | 'none'
    pickupLocation?: string
    shippingOption?: string
}

export type OrderPaymentIntegration = {
    id: string
    name: string
}

/**
 * Type of data expected for a particular event
 * @example 'message-insert' => MessageInsertData
 */
export type EventData<E extends EventName> = Extract<EventWebhookData, { event: E }>['data'][number]

export type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

