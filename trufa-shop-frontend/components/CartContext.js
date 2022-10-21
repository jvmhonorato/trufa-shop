import { createContext, useState } from 'react'

const CartContext = createContext()


const CartProvider = ({children}) => {
    const [cart, setCart] = useState({})
    const addToCart = product => {
        setCart(old => ({
            ...old,
            [product.id]:product
        }))
    }
 return (
    <CartContext.Provider value={{cart, addToCart}}>{children} </CartContext.Provider>
 )
}
export {CartContext, CartProvider}