import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import InputFeedback from '../inputFeedback'
import creditCardValidation from '../creditCardValidation'
import PriceBox from '../PriceBox/PriceBox'
import { CreditCardContext } from '../../context/creditCardContext'
import { CartContext } from '../../context/cartContext'
import './PaymentSession.css'

function PaymentSession() {
  const { cart, setCart } = useContext(CartContext)
  const { creditCard, setCreditCard } = useContext(CreditCardContext)
  const history = useHistory()

  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart')
    //We should parse the supported sessionStorage string format into json format before setting state
    const parsedStoredCart = JSON.parse(storedCart || '""')
    console.log(parsedStoredCart)
    // This will update Global state if there is an existing user with items added to cart stored in local sotrage,

    if (!cart.id) {
      setCart(parsedStoredCart)
      console.log('local storage used')
    }
  }, [cart.id, setCart])
  console.log(cart)

  return (
    <Formik
      initialValues={{
        numero_cartao: '',
        nome: '',
        data_validade: '',
        cvv: ''
      }}
      validationSchema={creditCardValidation}
      onSubmit={(values, { setSubmitting }) => {
        console.log('submit is working')
        console.log(String(values.numero_cartao))

        setSubmitting(true)
        const partialNumbers = String(values.numero_cartao).slice(12, 17)
        setCreditCard({ ...values, cvv: '', numero_cartao: partialNumbers })
        sessionStorage.setItem(
          'creditCard',
          JSON.stringify({ ...values, cvv: '', numero_cartao: partialNumbers })
        )

        setSubmitting(false)
        history.push('/confirmacao')
        console.log(partialNumbers)
        console.log(creditCard)
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
