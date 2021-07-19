import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'
import PriceBox from '../PriceBox/PriceBox'
import ProductCard from '../ProductCard/ProductCard'
import { CreditCardContext } from '../../context/creditCardContext'
import './PaymentConfirmation.css'
import check from '../../check.jpg'

function PaymentConfirmation() {
  const { creditCard, setCreditCard } = useContext(CreditCardContext)
  const { cart, setCart } = useContext(CartContext)

  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart')
    const storedCreditCard = sessionStorage.getItem('creditCard')
    //We should parse the supported localeStorage string format into json format before setting state
    const parsedStoredCart = JSON.parse(storedCart || '""')
    const parsedStoredCreditCard = JSON.parse(storedCreditCard || '""')
    console.log(parsedStoredCart)
    // This will update Global state if there is an existing user with items added to cart stored in session local sotrage,

    if (!cart.id) {
      setCart(parsedStoredCart)
      console.log('local storage for cart used')
    }
    //We Should NEVER store user's credit card info in local storage
    //This is just for purpose of demonstration
    //In this case data is being treate so only partial credit card numbers are stored
    if (!creditCard.nome) {
      setCreditCard(parsedStoredCreditCard)
      console.log('local storage for credit card used')
    }
  }, [cart.id, setCart])
  console.log(cart)
  console.log(creditCard)

  return (
    <div className="main-success-div">
      <div className="success-user-info-box">
        <div className="success-msg">
          <img src={check} />
          <span className="seccess-text">COMPRA EFETUADA COM SUCESSO</span>
        </div>

        <div className="success-user-info-box">
          <div className="payment-title">PAGAMENTO</div>
          <div className="creditcard-data">
            <div>**** **** **** {creditCard.numero_cartao}</div>
            <div>{creditCard.nome}</div>
            <div>{creditCard.data_validade}</div>
          </div>
        </div>
      </div>

      <div className="success-user-info-box">
        <div className="payment-title">PRODUTOS</div>
        <div className="purcahsed-products">
          {cart.items && cart.items.map((item, index) => <ProductCard cart={item} key={index} />)}
        </div>
      </div>

      <div className="price-box-container">
        <div className="price-box">{cart && <PriceBox cart={cart} />}</div>
      </div>
    </div>
  )
}

export default PaymentConfirmation
