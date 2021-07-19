import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useHistory } from 'react-router-dom'
import InputFeedback from '../inputFeedback'
import creditCardValidation from '../creditCardValidation'
import PriceBox from '../PriceBox/PriceBox'
import { CreditCardContext } from '../../context/creditCardContext'
import { CartContext } from '../../context/cartContext'
import './PaymentSession.css'

function PaymentSession() {
  const { cart, setCart } = useContext(CartContext)
  const { setCreditCard } = useContext(CreditCardContext)
  const history = useHistory()

  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart')
    //We should parse the supported sessionStorage string format into json format before setting state
    const parsedStoredCart = JSON.parse(storedCart || '""')

    // If there is no data available from cart context, this will update Global state if there is
    //an existing user with items added to cart stored in local sotrage,
    if (!cart.id) {
      setCart(parsedStoredCart)
    }
  }, [cart.id, setCart])

  return (
    //Formik validation form manages the field validations and sets state for credit card info
    //internal Formik state set as "values" including data input from the form
    // the "values" includes all state and is sent to other components
    <Formik
      initialValues={{
        numero_cartao: '',
        nome: '',
        data_validade: '',
        cvv: ''
      }}
      validationSchema={creditCardValidation}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true)
        //treats the credit card number to send only last 4 digits to global context creditCard
        const partialNumbers = String(values.numero_cartao).slice(12, 17)
        //sets creditCard context with "values" received from form and treated credit card number
        setCreditCard({ ...values, cvv: '', numero_cartao: partialNumbers })
        //Although not recommendable, this sends treated credit card info to local session
        sessionStorage.setItem(
          'creditCard',
          JSON.stringify({ ...values, cvv: '', numero_cartao: partialNumbers })
        )

        setSubmitting(false)
        //directs to Payment Confirmation component on submit
        history.push('/confirmacao')
      }}
    >
      {({ isSubmitting, errors, touched, setFieldValue }) => (
        <Form className="main-payment-div">
          <div className="card-info-box ">
            <div className="payment-title">CARTÃO DE CRÉDITO</div>
            <div className="creditcard-data-form">
              <div className="form-group small-font number-name">
                <label htmlFor="numeroCartao">Número do cartão:</label>
                <Field
                  placeholder="---- ---- ---- ----"
                  type="number"
                  className={`fields placeholder form-control ${
                    errors.numero_cartao && touched.numero_cartao ? 'is-invalid' : 'is-valid'
                  }`}
                  id="numeroCartao"
                  name="numero_cartao"
                />
                <ErrorMessage
                  name="numero_cartao"
                  render={(msg) => (
                    <InputFeedback invalid={errors.numero_cartao && touched.numero_cartao}>
                      {msg}
                    </InputFeedback>
                  )}
                />
              </div>

              <div className="form-group small-font number-name">
                <label htmlFor="registroNome">Nome do Titular:</label>
                <Field
                  placeholder="Como no cartão"
                  type="text"
                  className={`fields form-control ${
                    errors.nome && touched.nome ? 'is-invalid' : 'is-valid'
                  }`}
                  id="registroNome"
                  name="nome"
                />
                <ErrorMessage
                  name="nome"
                  render={(msg) => (
                    <InputFeedback invalid={errors.nome && touched.nome}>{msg}</InputFeedback>
                  )}
                />
              </div>

              <div className="date-cvv">
                <div className="form-group small-font validate">
                  <label htmlFor="validadeCartao">Validade (mês/ano):</label>
                  <Field
                    placeholder="--/----"
                    type="text"
                    className={`fields form-control ${
                      errors.data_validade && touched.data_validade ? 'is-invalid' : 'is-valid'
                    }`}
                    id="validadeCartao"
                    name="data_validade"
                  />
                  <ErrorMessage
                    name="data_validade"
                    render={(msg) => (
                      <InputFeedback invalid={errors.data_validade && touched.data_validade}>
                        {msg}
                      </InputFeedback>
                    )}
                  />
                </div>
                <div className="form-group small-font cvv">
                  <label htmlFor="validadeCartao">CVV</label>
                  <Field
                    placeholder="---"
                    type="text"
                    className={`fields form-control ${
                      errors.cvv && touched.cvv ? 'is-invalid' : 'is-valid'
                    }`}
                    id="validadeCartao"
                    name="cvv"
                  />
                  <ErrorMessage
                    name="cvv"
                    render={(msg) => (
                      <InputFeedback invalid={errors.cvv && touched.cvv}>{msg}</InputFeedback>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="price-box-container">
            {/* {TOTAL PRICE SUMMARY} */}
            <div className="payment-price-box">{cart && <PriceBox cart={cart} />}</div>

            <button type="submit" className="payment-button-text" disabled={isSubmitting}>
              <div className="payment-button">
                {isSubmitting ? (
                  <>
                    <span className="" role="status" aria-hidden="true"></span>
                    <span>Processando</span>
                  </>
                ) : (
                  <span>FINALIZAR O PEDIDO</span>
                )}
              </div>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default PaymentSession
