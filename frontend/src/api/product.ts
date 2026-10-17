import type { product } from "../types/products";
import { request } from "./client";

export const getProducts = async() : Promise<product[]> => {
    const products= await request<product[]>("/product", "GET", null);
    return products
}

export const getProduct = async(id : number) : Promise<product[]> => {
    const product = await request<product[]>("/product" + id, "POST", null);
    return product
}