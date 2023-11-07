export type SimpleOrder = {
    items: SimpleOrderItem[]
    remarks?: string
    orderContext:{
        paymentGatewayId?:string
        shippingDetails? : {
            shippingAddress?: string
	        shippingMethod : 'delivery' | 'pickup'
	        pickupLocation?: string
	        shippingOption?: string
        }
        shopName?:string
        deliveryFees?:number
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
    customer?:Customer
    deliveryFees?:number
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
    paymentIntegration?:OrderPaymentIntegration
}

export type Customer = {
    name:string
    mobileNumber:string
    shippingAddress?: string
	shippingMethod: 'delivery' | 'pickup' | undefined
	pickupLocation?: string
	shippingOption?: string
}


export type OrderPaymentIntegration = {
    id: string,
    name:string
}
