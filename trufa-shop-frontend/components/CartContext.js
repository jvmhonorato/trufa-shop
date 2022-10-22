import { createContext, useState } from 'react'

const CartContext = createContext()


const CartProvider = ({children}) => {
    const [cart, setCart] = useState({})
    const addToCart = (product) => {
        setCart((old) => {
            let quantity = 0
            if(old[product.id]){
                quantity = old[product.id].quantity
            }
            return {
                ...old,
            [product.id]: {
                quantity: quantity+1,
                product,
            },
          }
        })
    }
    //send values of state "cart" and the function "addToCart" to others components
 return (
    <CartContext.Provider value={{cart, addToCart}}>{children} </CartContext.Provider>
 )
}
export {CartContext, CartProvider}