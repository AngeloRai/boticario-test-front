import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import api from '../../api'
import { CartContext } from '../../context/cartContext'
import ProductCard from '../ProductCard/ProductCard'
import PriceBox from '../PriceBox/PriceBox'
import './Cart.css'

function Cart() {
  const { cart, setCart } = useContext(CartContext) //Creates global context for all other components

  useEffect(() => {
    const fetchProducts = async () => {
      //HTTP request to fetch cart products
      const cartItems = await api.get('/v2/5b15c4923100004a006f3c07')

      setCart(cartItems.data) //Sets cart with prducts fetched from api call to be used in other components
      //Sets local storage in case of page refresh
      sessionStorage.setItem('cart', JSON.stringify(cartItems.data))
    }
    fetchProducts()
  }, [setCart])

  return (
    <div className="main-cart-div">
      <div className="product-box">
        <div className="cart-product-title">PRODUTOS</div>
        {/* {LIST OF PRODUCTS TO BE PURCHASED, PRICE IS INCLUDED AS CONDITION SET IN ProductCard COMPONENT} */}
        <div className="cart-product-list">
          {cart.items &&
            cart.items.map((item, index) => (
              <ProductCard cart={item} price={item.product.priceSpecification.price} key={index} />
            ))}
        </div>
      </div>

      <div className="price-box-container">
        <div className="cart-price-box">
          {/* {PRICE TOTAL SUMMARY} */}
          <PriceBox cart={cart} />
        </div>
        <div className="cart-button">
          <NavLink to="/pagamento" className="cart-button-text">
            SEGUIR PARA O PAGAMENTO
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Cart
