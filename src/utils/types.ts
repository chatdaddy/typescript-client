export type SimpleOrder = {
    items: SimpleOrderItem[]
    remarks?: string
    paymentGatewayId?:string
}

export type SimpleOrderItem = {
    quantity: number
    name: string
    id: string
}

export type OrderMessage = {
    items: OrderItem[]
    remarks?: string
    customer?:Customer
}

export type OrderItem = {
    quantity: number
    name: string
    id: string
    price: number
    currency: string
}

export type PaymentGateway = {
    id:string
    name:string
}

export type OrderSerialiseContext = {
    shopName:string,
    paymentIntegration?:PaymentIntegration
}

export type Customer = {
    name:string
    mobileNumber:string
    shippingAddress:string
}

export type PaymentIntegration = {
    id: string,
    name:string
}
