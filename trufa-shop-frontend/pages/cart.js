
import  * as Prismic from "prismic-javascript";
import Header from "../components/Header";
import Products from "../components/Products";
import React, {  useContext } from "react";
import { CartContext } from '../components/CartContext'
import {useFormik} from 'formik'





const Index = (props) => {
    const {products} = props
    const cart = useContext(CartContext)

    //formik hook 
    const form = useFormik({
        initialValues: {
            cpf:'',
            nome: 'Victor Honorato',
            telefone:''
        },
        onSubmit: async(values) => {
            console.log(values)
        }
    })

    //total sales of all products
    const total = Object.keys(cart.cart).reduce((prev, curr) => {
    
        return prev + cart.cart[curr].quantity * cart.cart[curr].product.data.price
    }, 0)
    

    //remove product
    const remove = id => () => {
        cart.removeFromCart(id)
    }
    //IMPORT 
    const cartAdd = useContext(CartContext)

    //increase unit   
    const add = product => () => {
        cartAdd.addToCart(product)
    }

    //drecreace unit
    const drop = product => () => {
        cartAdd.removeToCart(product)
    }

    return (
        <>
         
        <div className="container mx-auto">
            <Header/>
            <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4" x-data="app">
    <div class="flex flex-col justify-center h-full">
        
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <div class="font-semibold text-gray-800 ">Carrinho <pre className="text-2xl">R${''}{Number(total).toFixed(2).replace('.',',' )}</pre></div>
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
                        const {product, quantity} = cart.cart[key]

                    return(
                        <tr key={key}>
                            <td class="p-2">
                            {/* <pre>{JSON.stringify(cart.cart[key], null, 2)}</pre> */}
                             
                            </td>
                            <td class="p-2">
                                <div class="font-medium text-gray-800">
                                    {product.data.name}
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="text-left">{quantity}</div>
                            </td>
                            <td class="p-2">R$
                                <div class="text-left font-medium text-green-500">
                                {Number(cart.cart[key].product.data.price * quantity).toFixed(2).replace('.',',')}
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="flex justify-center">
                                  
                                    <button onClick={add(product)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>

                                    </button>
                                    <button onClick={drop(product)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                        </svg>

                                    </button>
                                    <button onClick={remove(key)}>
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
            

            
            <div class="flex justify-center font-semi-bold space-x-2 text-lg border-t border-gray-100 px-5 py-4">
            <div className="justify-center md-flex">
                     <form onSubmit={form.handleSubmit}>
                        <div className="flex items-center w-full h-13 pl-3 flex space-x-4 ">
                        <label className="text-base" > Nome:</label>
                            <input
                            type='text'
                            name='nome'
                            id='nome'
                            placeholder=" Nome"
                            value={form.values.nome}
                            onChange={form.handleChange}
                            />
                        </div><br/>
                        <div className="flex items-center w-full h-13 pl-3 flex space-x-8">
                        <label className="text-base"> CPF:</label>
                            <input
                            type='text'
                            name='cpf'
                            id='cpf'
                            placeholder="CPF"
                            value={form.values.cpf}
                            onChange={form.handleChange}
                            />
                        </div><br/>
                        <div className="flex items-center w-full h-13 pl-3 flex space-x-4">
                        <label className="text-base">Telefone:</label>
                            <input
                            type='text'
                            name='telefone'
                            id='telefone'
                            placeholder="Whatapp"
                            value={form.values.telefone}
                            onChange={form.handleChange}
                            />
                        </div>
                        <div class="text-blue-600 flex justify-center"><button type="submit">submit</button></div>
                     </form>
                </div>
                
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