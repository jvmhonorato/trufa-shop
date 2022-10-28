
import  * as Prismic from "prismic-javascript";
import Header from "../components/Header";
import axios from 'axios'
import React, {  useContext, useState } from "react";
import { CartContext } from '../components/CartContext'
import {useFormik} from 'formik'





const Index = (props) => {
    const {products} = props
    const [orderStatus, setOrderStatus]= useState('pre-order')//ordering, order-received
    const [qrcode, setQrcode] = useState('')
    const cart = useContext(CartContext)

    //formik hook 
    const form = useFormik({
        initialValues: {
            cpf:'',
            nome: '',
            telefone:''
        },
        //send data to BACKEND
        onSubmit: async(values) => {
            //grab the all values with spread operator
            const order = {...values}
            //loop through data list and return item values
            const items =  Object.keys(cart.cart).map((curr) => {
                const item = {
                    quantity: cart.cart[curr].quantity ,
                    price: cart.cart[curr].product.data.price,
                    name: cart.cart[curr].product.data.name
                }
            return item
            })
            order.items = items
            setOrderStatus('ordering')
            const result = await axios.post(
                'http://localhost:3001/create-order',
                order
            )
            console.log(result.data)
           setQrcode(result.data.qrcode.imagemQrcode)
            setOrderStatus('order-received')
            
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
            <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4" x-data="app">
    <div className="flex flex-col justify-center h-full">
        
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <div className="font-semibold text-gray-800 ">Carrinho <pre className="text-2xl">R${''}{Number(total).toFixed(2).replace('.',',' )}</pre></div>
            </header>

            <div className="overflow-x-auto p-3">
                <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            <th></th>
                            <th className="p-2">
                                <div className="font-semibold text-left">Trufa</div>
                            </th>
                            <th className="p-2">
                                <div className="font-semibold text-left">Quantidade</div>
                            </th>
                            <th className="p-2">
                                <div className="font-semibold text-left">Total</div>
                            </th>
                            <th className="p-2">
                                <div className="font-semibold text-center">Ação</div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-sm divide-y divide-gray-100">
                    {Object.keys(cart.cart).map(key => {
                        const {product, quantity} = cart.cart[key]

                    return(
                        <tr key={key}>
                            <td className="p-2">
                            {/* <pre>{JSON.stringify(cart.cart[key], null, 2)}</pre> */}
                             
                            </td>
                            <td className="p-2">
                                <div className="font-medium text-gray-800">
                                    {product.data.name}
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="text-left">{quantity}</div>
                            </td>
                            <td className="p-2">R$
                                <div className="text-left font-medium text-green-500">
                                {Number(cart.cart[key].product.data.price * quantity).toFixed(2).replace('.',',')}
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="flex justify-center">
                                  
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
                                        <svg className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
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
            

            
            <div className="flex justify-center font-semi-bold space-x-2 text-lg border-t border-gray-100 px-5 py-4">
            <div className="justify-center md-flex">
                {orderStatus === 'pre-order'  &&  
                     <form onSubmit={form.handleSubmit}>
                        <div className="flex items-center w-full h-13 pl-3 flex space-x-8 ">
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
                        <div className="flex items-center w-full h-13 pl-3 flex space-x-12">
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
                        <div className="text-blue-600 flex justify-center"><button type="submit">submit</button></div>
                     </form>
                     }
                     {orderStatus === 'ordering' && <p>Pedindo sendo atualizado, aguarde...</p>}
                     {orderStatus === 'order-received' && <img src={qrcode}/>}
                     
                </div>
                
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