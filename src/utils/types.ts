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
