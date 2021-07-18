import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="active" className="nav-links">
                SACOLA
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/pagamento" activeClassName="active" className="nav-links">
                PAGAMENTO
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/confirmacao" activeClassName="active" className="nav-links">
                CONFIRMAÇÃO
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
