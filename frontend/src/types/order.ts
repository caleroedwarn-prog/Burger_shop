export type OrderItem = {
    product_id: number,
    quantity: number
}

export type OrderRequest = {
    customerName: string,
    phone: string,
    address: string,
    items : OrderItem[]
}

export type Order = {
    id: number,
    customerName: string,
    phone: string,
    address: string,
    total:  number,
    status: string,
    createdAt: string
}