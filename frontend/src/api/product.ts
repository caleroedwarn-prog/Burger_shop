import type { product } from "../types/products";
import { request } from "./client";

export const getProducts = async() : Promise<product[]> => {
    const products= await request<product[]>("/products", "GET", null);
    return products
}

export const getProduct = async(id : number) : Promise<product> => {
    const oneProduct = await request<product>("/products/" + id, "GET", null);
    return oneProduct
}