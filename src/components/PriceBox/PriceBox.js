import React from 'react'
import './PriceBox.css'
function PriceBox(props) {
  return (
    // price card with total price summary used in all three components
    <div className="price-container">
      {props.cart.total && (
        <div className="price-text">
          <div className="price-text-inner-box">
            <div className="cart-text-products">PRODUTOS</div>
            <div>
              {/* CONFIGURES PRICE VALUES TO BRL CURRENCY */}
              {props.cart.subTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
          </div>
          <div className="price-text-inner-box">
            <div className="cart-text-shipping">FRETES</div>
            <div>
              {props.cart.shippingTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
          </div>
          <div className="price-text-inner-box">
            <div className="cart-text-discount">DESCONTOS</div>
            <div className="cart-text-discount">
              {props.cart.discount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
          </div>
          <div className="price-text-inner-box">
            <div className="cart-text-total">TOTAL</div>
            <div className="cart-text-total">
              {props.cart.total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PriceBox
