import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api/product";
import type { product } from "../types/products";

const useProducts = () => {
    const [ products, setProducts ] = useState<product[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("");

    const loadProducts = useCallback(async() => {
        setLoading(true)
        setError("")

        try {
            const data = await getProducts()
            setProducts(data)
        }catch{
            setError("Error loading the products")
        }finally {
            setLoading(false)
        }

    }, []);

    useEffect(() => {
        void Promise.resolve().then(loadProducts);
    }, [loadProducts])

    return { products, loading, error, refetch: loadProducts };
}
export default useProducts