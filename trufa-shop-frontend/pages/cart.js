
import  * as Prismic from "prismic-javascript";
import Header from "../components/Header";
import Products from "../components/Products";
import React, {  useContext } from "react";
import { CartContext } from '../components/CartContext'





const Index = (props) => {
    const {products} = props
    const cart = useContext(CartContext)
    return (
        <>
        <div className="container mx-auto">
            <Header/>
            <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4" x-data="app">
    <div class="flex flex-col justify-center h-full">
        
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <div class="font-semibold text-gray-800">Carrinho</div>
            </header>

            <div class="overflow-x-auto p-3">
                <table class="table-auto w-full">
                    <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            <th></th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Trufa</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Quantidade</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Total</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-center">Ação</div>
                            </th>
                        </tr>
                    </thead>

                    <tbody class="text-sm divide-y divide-gray-100">
                    {Object.keys(cart.cart).map(key => {
                        const {pruduct, quantity} = cart.cart[key]

                    return(
                        <tr key={key}>
                            <td class="p-2">
                            {/* <pre>{JSON.stringify(cart.cart[key], null, 2)}</pre> */}
                                <input type="checkbox" class="w-5 h-5" value="id-1"
                                     />
                            </td>
                            <td class="p-2">
                                <div class="font-medium text-gray-800">
                                    {cart.cart[key].product.data.name}
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="text-left">{cart.cart[key].quantity}</div>
                            </td>
                            <td class="p-2">
                                <div class="text-left font-medium text-green-500">
                                {cart.cart[key].product.data.price}
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="flex justify-center">
                                    <button>
                                        <svg class="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr> 
                        
                       )
                     })}
                    </tbody>
                </table>
            </div>

            
            <div class="flex justify-end font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4">
                <div>Total</div>
                <div class="text-blue-600">RM <span x-text="total.toFixed(2)"></span></div>
            </div>

            <div class="flex justify-end">
                
                <input type="hidden" class="border border-black bg-gray-50" x-model="selected" />
            </div>
        </div>
    </div>
</section>
        

        </div>
        
        </>
        
    )
}
export async function getServerSideProps({res}) {
    const client = Prismic.client('https://trufashop.cdn.prismic.io/api/v2')
    const products = await client.query(Prismic.Predicates.at('document.type', 'product'))
return {
    props:{
        date: Date.now(),
        products: products.results,
    },
 }
}
export default Index