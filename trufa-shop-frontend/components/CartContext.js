import { createContext, useEffect, useState } from 'react'

const CartContext = createContext()


const CartProvider = ({children}) => {
    const [cart, setCart] = useState({})
    useEffect(() => {
     const cartLocal = window.localStorage.getItem('cart')
     if(cartLocal){
        setCart(JSON.parse(cartLocal))
     }
    },[])


    const addToCart = (product) => {
        setCart((old) => {
            let quantity = 0
            if(old[product.id]){
                quantity = old[product.id].quantity
            }
            const newCart = {
                ...old,
            [product.id]: {
                quantity: quantity+1,
                product,
            },
          }
          window.localStorage.setItem('cart', JSON.stringify(newCart))
          return newCart
        })
    }
    //send values of state "cart" and the function "addToCart" to others components
 return (
    <CartContext.Provider value={{cart, addToCart}}>{children} </CartContext.Provider>
 )
}
export {CartContext, CartProvider}