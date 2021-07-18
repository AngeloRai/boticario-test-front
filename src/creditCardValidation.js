import * as Yup from 'yup'

const creditCardValidation = Yup.object().shape({
  nome: Yup.string().required('Por favor informe nome.'),
  data_nascimento: Yup.date().required('Por favor informe data de nascimento.'),
  data_admissao: Yup.date().required('Por favor informe data de admissão'),
  setor: Yup.string()
    .required('Campo exigido')
    .max(100, 'Setor deve conter no maximo 100 caracteres'),
  cargo: Yup.string()
    .required('Campo exigido')
    .max(100, 'Cargo deve conter no maximo 100 caracteres'),
  nivel: Yup.string()
    .required('Campo exigido')
    .max(100, 'Cargo deve conter no maximo 100 caracteres')
})

export default creditCardValidation
