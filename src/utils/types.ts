export type SimpleOrder = {
	items: SimpleOrderItem[]
	remarks?: string
}

export type SimpleOrderItem = {
	quantity: number
	name: string
	id: string
}