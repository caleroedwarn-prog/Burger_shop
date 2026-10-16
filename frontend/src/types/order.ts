export type OrderItem = {
    productId: number,
    quantity: number
}

export type OrderRequest = {
    customerName: string,
    phone: number,
    address: string,
    items : OrderItem[]
}

export type Order = {
    id: number,
    items: OrderItem[],
    total:  number,
    status: string,
    createdAt: Date
}