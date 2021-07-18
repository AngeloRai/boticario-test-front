import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import InputFeedback from '../../inputFeedback'
import creditCardValidation from '../../creditCardValidation'

function CreditCardForm() {
  return (
    <div>
      <Formik
        initialValues={{
          numero_cartao: '',
          nome: '',
          data_validade: '',
          cvv: ''
        }}
        validationSchema={creditCardValidation}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          try {
            setSubmitting(false)
          } catch (err) {
            console.error(err)
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, errors, touched, setFieldValue }) => (
          <Form>
            <div className="form-group my-2">
              <label htmlFor="numeroCartao">Número do cartão:</label>
              <Field
                type="number"
                className={`form-control ${
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

            <div className="form-group my-2">
              <label htmlFor="registroNome">Nome do Titular:</label>
              <Field
                type="text"
                className={`form-control ${
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

            <div className="form-group my-2 w-50">
              <label htmlFor="validadeCartao">Validade (mês/ano):</label>
              <Field
                type="text"
                className={`form-control ${
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
            <div className="form-group my-2 w-50">
              <label htmlFor="validadeCartao">CVV</label>
              <Field
                type="text"
                className={`form-control ${errors.cvv && touched.cvv ? 'is-invalid' : 'is-valid'}`}
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
            <div className="">
              <button type="submit" className="" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="" role="status" aria-hidden="true"></span>
                    <span>Processando</span>
                  </>
                ) : (
                  <span>Finalizar</span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreditCardForm
