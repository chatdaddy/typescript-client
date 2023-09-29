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
    customer?:customer
    paymentIntegration?:paymentIntegration
}

export type customer = {
    name:string
    mobileNumber:string
    shippingAddress:string
}

export type paymentIntegration = {
    id: string,
    name:string
}
