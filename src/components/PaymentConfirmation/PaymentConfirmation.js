import React, { useEffect, useContext } from 'react'
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

    // This will update Global state if there is an existing user with items added to cart stored in session local sotrage,
    if (!cart.id) {
      setCart(parsedStoredCart)
    }
    //We Should NEVER store user's credit card info in local storage
    //This is just for purpose of demonstration
    //In this case data is being treated so only partial credit card numbers are stored
    if (!creditCard.nome) {
      setCreditCard(parsedStoredCreditCard)
    }
  }, [cart.id, setCart, creditCard.nome, setCreditCard])

  return (
    <div className="main-success-div">
      <div className="success-user-info-box">
        <div className="success-msg">
          <img src={check} alt="succes check" />
          <span className="seccess-text">COMPRA EFETUADA COM SUCESSO</span>
        </div>
        {/* {ORANGE SUCCESS CHECK IMAGE} */}
        <div className="success-user-info-box">
          <div className="payment-title">PAGAMENTO</div>
          <div className="creditcard-data">
            {/* {USER INFO RECEIVED FROM PAYMENT SESSION COMPONENT, ONLY LAST 4 DIGITS CREDIT CARD} */}
            <div>**** **** **** {creditCard.numero_cartao}</div>
            <div>{creditCard.nome}</div>
            <div>{creditCard.data_validade}</div>
          </div>
        </div>
      </div>

      <div className="success-user-info-box">
        <div className="payment-title">PRODUTOS</div>
        <div className="purcahsed-products">
          {/* {LIST OF PURCHASED PRODUCTS WITH NO PRICE, CONDITION SET IN ProductCard COMPONENT} */}
          {cart.items && cart.items.map((item, index) => <ProductCard cart={item} key={index} />)}
        </div>
      </div>
      {/* {PURCAHSE PAYMENT INFO} */}
      <div className="price-box-container">
        <div className="price-box">{cart && <PriceBox cart={cart} />}</div>
      </div>
    </div>
  )
}

export default PaymentConfirmation
