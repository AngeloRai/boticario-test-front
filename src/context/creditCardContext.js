import React, { useState, createContext, useEffect } from 'react'

const CreditCardContext = createContext([])
//createContext is used to make cotext available in other components

function CreditCardContextComponent(props) {
  const [creditCard, setCreditCard] = useState([])

  useEffect(() => {
    const storedCreditCard = sessionStorage.getItem('creditCard')
    //We should parse the supported sessioStorage string format into json format before setting state
    const parsedStoredCreditCard = JSON.parse(storedCreditCard || '""')

    // This will update Global state if there is an existing creditCard data stored in local sotrage,
    if (parsedStoredCreditCard.length) {
      setCreditCard([...parsedStoredCreditCard])
    }
  }, [creditCard, setCreditCard])

  // The Provider componet serves to provide Context (state global) to all child components
  // This Provider must wrap the components which are going to receive the context in the App component
  return (
    <CreditCardContext.Provider value={{ creditCard, setCreditCard }}>
      {props.children}
    </CreditCardContext.Provider>
  )
}

export { CreditCardContextComponent, CreditCardContext }
