import React, { useState, createContext, useEffect } from 'react'

const CartContext = createContext([])
//createContext is used to make cotext available in other components

function CartContextComponent(props) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart')
    //We should parse the supported sessionStorage string format into json format before setting state
    const parsedStoredCart = JSON.parse(storedCart || '""')

    // This will update Global state if there is an existing user with items added to cart stored in local sotrage,
    if (parsedStoredCart.length) {
      setCart([...parsedStoredCart])
    }
  }, [cart, setCart])

  // The Provider componet serves to provide Context (state global) to all child components
  // This Provider must wrap the components which are going to receive the context in the App component
  return <CartContext.Provider value={{ cart, setCart }}>{props.children}</CartContext.Provider>
}

export { CartContextComponent, CartContext }
