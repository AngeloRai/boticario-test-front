import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { CartContextComponent } from '../../context/cartContext'
import { CreditCardContextComponent } from '../../context/creditCardContext'
import Cart from '../Cart/Cart'
import NavbarComponent from '../Navbar/Navbar'
import PaymentSession from '../PaymentSession/PaymentSession'
import PaymentConfirmation from '../PaymentConfirmation/PaymentConfirmation'

function App() {
  return (
    <div>
      <BrowserRouter>
        <CartContextComponent>
          <CreditCardContextComponent>
            <NavbarComponent />

            <div className="main-content-container">
              <Switch>
                <Route exact path="/" component={Cart} />
                <Route exact path="/pagamento" component={PaymentSession} />
                <Route exact path="/confirmacao" component={PaymentConfirmation} />
              </Switch>
            </div>
          </CreditCardContextComponent>
        </CartContextComponent>
      </BrowserRouter>
    </div>
  )
}

export default App
