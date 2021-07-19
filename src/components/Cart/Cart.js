import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import api from '../../api'
import { CartContext } from '../../context/cartContext'
import ProductCard from '../ProductCard/ProductCard'
import PriceBox from '../PriceBox/PriceBox'
import './Cart.css'
import { CreditCardContext } from '../../context/creditCardContext'
function Cart() {
  const { creditCard, setCreditCard } = useContext(CreditCardContext)
  const { cart, setCart } = useContext(CartContext)
  console.log(creditCard)
  useEffect(() => {
    const fetchProducts = async () => {
      const cartItems = await api.get('/v2/5b15c4923100004a006f3c07')

      setCart(cartItems.data)
      sessionStorage.setItem('cart', JSON.stringify(cartItems.data))
    }
    fetchProducts()
  }, [setCart])

  console.log(cart.subTotal)
  return (
    <div className="main-cart-div">
      <div className="product-box">
        <div className="cart-product-title">PRODUTOS</div>
        <div className="cart-product-list">
          {cart.items &&
            cart.items.map((item, index) => (
              <ProductCard cart={item} price={item.product.priceSpecification.price} key={index} />
            ))}
        </div>
      </div>

      <div className="price-box-container">
        <div className="cart-price-box">
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
