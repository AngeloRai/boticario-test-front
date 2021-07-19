import * as Yup from 'yup'

const creditCardValidation = Yup.object().shape({
  numero_cartao: Yup.string()
    .length(16, 'Enter valid credit card')
    .matches(/[0-9]+/gi, 'Enter numbers only')
    .required('Required field'),
  nome: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .max(40)
    .required('Please inform name'),
  data_validade: Yup.string()
    .length(7, 'Enter valid expiration date (mm/yyyy)')
    .required('Required field'),
  cvv: Yup.string()
    .length(3, 'Enter valid CVV (000)')
    .matches(/[0-9]+/gi, 'Enter numbers only')
    .required('Required field')
})

export default creditCardValidation
