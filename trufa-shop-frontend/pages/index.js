
import  * as Prismic from "prismic-javascript";
import Header from "../components/Header";
import Products from "../components/Products";
import React, {  useContext } from "react";
import { CartContext } from '../components/CartContext'
import Head from 'next/head'





const Index = (props) => {
    const {products} = props
    const cart = useContext(CartContext)
    return (
        <>
        <Head>
            <title>TrufaShop</title>
        </Head>
        <div className="container mx-auto">
            <Header/>
        
        <div className="h-screen bg-gray-100 container mx-auto  "  >
            
           
           
            
            <main class="grid grid-flow-col grid-cols-3 gap-2">
                
                {products.map((product) => (
                    <Products product={product}/>
            ))}
            </main>

        </div>

        </div>
        <pre>{JSON.stringify(cart.cart, null, 2)}</pre>
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