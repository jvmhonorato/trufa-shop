import React from "react";
import CartIcon from "./icons/CartIcon";
const Products = (props) => {
    const {product} = props
    



    return(
        <>
         <section className=" flex flex-col md:flex-row gap-11 py-10 px-5 bg-white rounded-md shadow-lg">
                <div className="text-indigo-500 flex flex-col justify-between">
                <img src={product.data.image.url} alt="" />
                
                
                </div>
                <div className="text-indigo-500">
                <small className="uppercase">trufa</small>
                <h3 className="uppercase text-black text-2xl font-medium">{product.data.name}</h3>
                <h3 classname="text-2xl font-semibold mb-7">{product.data.price}</h3>
                <small className="text-black">Descrição do produto.</small>
                <div className="flex gap-0.5 mt-4">
                    <button id="addToCartButton" className="bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase px-8 py-3"> <CartIcon/></button>
                
                </div>
                </div>
            </section>
        </>
    ) 
}
export default Products