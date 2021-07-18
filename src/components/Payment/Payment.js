import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import PriceBox from '../PriceBox/PriceBox'
import './Payment.css'

function Payment() {
  const { cart, setCart } = useContext(CartContext)

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    //We should parse the supported localstorage string format into json format before setting state
    const parsedStoredCart = JSON.parse(storedCart || '""')
    console.log(parsedStoredCart)
    // This will update Global state if there is an existing user with items added to cart stored in local sotrage,

    if (!cart.id) {
      setCart(parsedStoredCart)
      console.log('local storage used')
    }
  }, [])
  console.log(cart)

  return (
    <div className="main-payment-div">
      <div className="payment-box">
        <div className="payment-title">CARTÃO DE CRÉDITO</div>
        <div className="creditcard-data-form">dff</div>
      </div>

      <div className="price-box-container">
        <div className="payment-price-box">{cart && <PriceBox cart={cart} />}</div>
        <div className="cart-button">
          <NavLink to="confirmacao" className="cart-button-text">
            FINALIZAR O PEDIDO
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Payment
