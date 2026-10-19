import { useCallback, useEffect, useState } from "react";
import { getProduct } from "../api/product";
import type { product } from "../types/products";

const useProduct = (id: number) => {
    const [ product, setProduct ] = useState<product[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("");

    const loadProduct = useCallback(async() => {
        setLoading(true)
        setError("")

        try {
            const data = await getProduct(id);
            setProduct(data)
        } catch {
            setError("Unable to load products")
        } finally {
            setLoading(false)
        }
    }, [id]);

    useEffect(() => {
        const task = Promise.resolve().then(loadProduct);
        return () => {
            void task;
        };
    }, [loadProduct]);

    return { product, loading, error, refetch: loadProduct };
}
export default useProduct