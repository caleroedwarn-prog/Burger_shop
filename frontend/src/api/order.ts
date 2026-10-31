import type { Order, OrderRequest } from "../types/order";
import { request } from "./client";

export const createOrder = async(order: OrderRequest): Promise<Order> => {
    const savedOrders = await request<Order>("/order", "POST", order)
    return savedOrders
}