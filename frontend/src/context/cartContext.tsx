import  { createContext, useState, useEffect, useCallback } from 'react';
import type { product } from '../types/products';



const CartContext = createContext({})

const CartProvider = () => {
    type CartItem = product & { quantity: number };
    const [ items, setItems] = useState<CartItem[]>([]);
    const [ loaded, setLoaded] = useState(false);

   // I'm loading the items when app starts

    useEffect(() => {

        const loadCart = async () => {

            try{
                const savedCart = await localStorage.getItem("cart")
                if(savedCart){
                    const saved = JSON.parse(savedCart)
                    setItems(saved)
                }
            } catch {
                //
            } finally{
                setLoaded(true)
            }
        }
    }, [])

    // then i save the items when adding after load

    useEffect(() => {

        if(loaded === false){
            return
        }

        const text = JSON.stringify(items)
        localStorage.setItem("cart", text)
    }, [items, loaded])

    const addItem = useCallback((item: product) => {
        setItems((currentItems) => {
            const existing = currentItems.find((currentItem) => currentItem.id === item.id);

            if (existing){
                return currentItems.map((currentItem) => currentItem.id === item.id
                ? {...currentItem, quantity: currentItem.quantity + 1} : currentItem
                );
            }
            return [...currentItems, { ...item, quantity: 1}]
        });
    }, []);



}

export default CartProvider