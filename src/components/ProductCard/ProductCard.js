import React from 'react'
import './ProductCard.css'

function ProductCard(props) {
  // Component to render single product items which receives props from Cart component

  return (
    <div className="card-border">
      <div className="cart-product-img">
        <img src={props.cart.product.imageObjects[0].medium} alt="product" />
      </div>
      <div className="item-info-box">
        <div>{props.cart.product.name}</div>
        {/* only renders if "price" props  exists. In the confirmation component, price property is not used */}
        {props.price && (
          <div className="item-price">
            <strong>
              {props.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
              {/* Edits the price to the correct currency, in this case "BRL" */}
            </strong>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
