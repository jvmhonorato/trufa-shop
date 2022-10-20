import React from "react";
import  * as Prismic from "prismic-javascript";


const Index = (props) => {
    return (
        <div>
            <h1>Trufa Shoppp</h1>
            <p>Óla!</p>
            <pre>{JSON.stringify(props, null, 2)}</pre>
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