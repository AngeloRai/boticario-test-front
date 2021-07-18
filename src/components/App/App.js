import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { CartContextComponent } from '../../context/cartContext'
import { CreditCardContextComponent } from '../../context/creditCardContext'
import Cart from '../Cart/Cart'
import NavbarComponent from '../Navbar/Navbar'
import Payment from '../Payment/Payment'
import CreditCardForm from '../CreditCardForm/CreditCardForm'

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
                <Route exact path="/pagamento" component={Payment} />
                <Route exact path="/cartao" component={CreditCardForm} />
              </Switch>
            </div>
          </CreditCardContextComponent>
        </CartContextComponent>
      </BrowserRouter>
    </div>
  )
}

export default App
