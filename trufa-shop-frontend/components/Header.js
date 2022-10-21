
import React, { useState, useContext } from "react";
import { CartContext } from './CartContext'


const Header = () => {
    const cart = useContext(CartContext)

    return(
        <header>
            <pre>{JSON.stringify(cart, null, 2)}</pre>
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
        </header>
    )
}
export default Header