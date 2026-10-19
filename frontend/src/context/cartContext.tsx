import  { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { product } from '../types/products';



// This context must stay in this file; exempt it from the component-only export rule.
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({})

const CartProvider = ({ children }: { children: ReactNode }) => {
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

        void loadCart();
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

    const removeItem = useCallback((productId: string | number) => {
        setItems((currentItems) => currentItems.filter(currentItem => currentItem.id !== productId))
    }, []);

    const changeQuantity = useCallback((productId: string | number, newQuantity: number) => {
        if(newQuantity <= 0){
            removeItem(productId)
            return
        }

        setItems((currentItems) => currentItems.map(currentItem => currentItem.id === productId
        ? {...currentItem, quantity: newQuantity} : currentItem 
      )
    )
    }, [removeItem])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const totalCount = useMemo(() => {
        return items.reduce((sum, item) => sum + item.quantity, 0)
    }, [items])

    const totalPrice = useMemo(() => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity),0)
    },[items])

    const value = useMemo(() => ({
        items,
        addItem,
        removeItem,
        changeQuantity,
        clearCart,
        totalCount,
        totalPrice, 
    }), [items,
        addItem,
        removeItem,
        changeQuantity,
        clearCart,
        totalCount,
        totalPrice])

/* currentItem is the most updated version of list of items x_item is a variable used use to loop throught the cart or list
   if the item added by the user is the same as that of an item in the list, add the quantitiy to two so
   (existing = currentItems.find((x_item) => x_item.id === item.id))
   if exisiting --> return (to the list) currentItems.map((x_item) => x_item.id ? {...x_item, quantity + 1}: x_item)
 */
     return (
        <CartContext value={value}>
            {children}
        </CartContext>
     )
}

export default CartProvider