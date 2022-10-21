
import React from "react";
import  * as Prismic from "prismic-javascript";
import Header from "../components/Header";
import Products from "../components/Products";




const Index = (props) => {
    const {products} = props
    const carrinho = {}
    return (
        <>
        <div className="container mx-auto">
            <Header/>
        
        <div className="h-screen bg-gray-100 container mx-auto  "  >
            
           
           
            {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
            <main class="grid grid-flow-col grid-cols-3 gap-2">
                {products.map((product) => (
                    <Products product={product}/>
            ))}
            </main>

        </div>

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