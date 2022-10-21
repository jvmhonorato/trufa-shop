
import React from "react";
import  * as Prismic from "prismic-javascript";
const CartIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>


)

const Index = (props) => {
    const {products} = props
    //const products = [1,2,3,4,5,6,8,9]
    return (
        <>
        <div className="container mx-auto">
        <nav className="
relative
w-full
flex flex-wrap
items-center
justify-between
py-4
bg-gray-100
text-gray-500
hover:text-gray-700
focus:text-gray-700
shadow-lg
navbar navbar-expand-lg navbar-light
">
<div className="flex">
    <div className="  ml-6 w-16">
    <img src="/logo.png" alt='trufa shop'height="42" width="42" />
    </div>

    
<ul className="navbar-nav flex absolute inset-y-6  right-6  ">
  <li className="nav-item px-2">
    <a className="nav-link active" aria-current="page" href="#">Home</a>
  </li>
  <li className="nav-item pr-2">
    <a className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#">Contato</a>
  </li>
  <li classNem="nav-item pr-2">
  <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Carrinho</button>
  </li>
 
</ul>

</div>
  </nav>
        <div className="h-screen bg-gray-100 container mx-auto  "  >
            
           
           
            {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
            <main class="grid grid-flow-col grid-cols-3 gap-2">
                {products.map((product) => (
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