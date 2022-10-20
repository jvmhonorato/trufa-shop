
import React from "react";
import  * as Prismic from "prismic-javascript";


const Index = (props) => {
    const {products} = props
    //const products = [1,2,3,4,5,6,8,9]
    return (
        <div className="h-screen bg-gray-100 container mx-auto  "  >
            <h1 className="text-3xl font-bold   " >Trufa Shop</h1>
            <p>Óla!</p>
            <pre>{JSON.stringify(props, null, 2)}</pre>
            <main class="flex flex-row flex-wrap space-y-1 space-x-1 ">
                {products.map((product) => (
            <section className=" flex flex-col md:flex-row gap-11 py-10 px-5 bg-white rounded-md shadow-lg w-1/3 md:max-w-2xl">
                <div className="text-indigo-500 flex flex-col justify-between">
                <img src={product.data.image.url} alt="" />
                
                
                </div>
                <div className="text-indigo-500">
                <small className="uppercase">trufa</small>
                <h3 className="uppercase text-black text-2xl font-medium">{product.data.name}</h3>
                <h3 classname="text-2xl font-semibold mb-7">{product.data.price}</h3>
                <small className="text-black">Descrição do produto.</small>
                <div className="flex gap-0.5 mt-4">
                    <button id="addToCartButton" class="bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase px-8 py-3">Adicionar a carteira</button>
                
                </div>
                </div>
            </section>
            ))}
            </main>

        </div>
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