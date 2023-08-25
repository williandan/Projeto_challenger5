import * as yup from 'yup'

export const schemaRegister = yup.object().shape({
  name: yup.string().required('Este campo deve ser preenchido'),
  email: yup
    .string()
    .required('Este campo deve ser preenchido'),
  password: yup
    .string()
    .required('Este campo deve ser preenchido'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas não são iguais')
    .required('Este campo deve ser preenchido')
})

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required('Este campo deve ser preenchido'),
  password: yup
    .string()
    .required('Este campo deve ser preenchido')
})

export const schemaUpdateUser = yup.object().shape({
  name: yup.string().required('Este campo deve ser preenchido'),
  email: yup.string().required('Este campo deve ser preenchido'),
  cpf: yup.string().nullable(),
  phone: yup.string().nullable(),
  password: yup.string().required('Este campo deve ser preenchido'),
  newPassword: yup.string().nullable(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'As senhas não são iguais')
    .nullable()
})

export const schemaClient = yup.object().shape({
  name: yup.string().required('Este campo deve ser preenchido'),
  email: yup.string().required('Este campo deve ser preenchido'),
  cpf: yup.string().required('Este campo deve ser preenchido'),
  phone: yup.string().required('Este campo deve ser preenchido'),
  address: yup.string().nullable(),
  complement: yup.string().nullable(),
  zip_code: yup.string().nullable(),
  district: yup.string().nullable(),
  city: yup.string().nullable(),
  uf: yup.string().nullable()
})

export const schemaRecord = yup.object().shape({
  description: yup.string().required('Este campo deve ser preenchido'),
  due_date: yup.string().required('Este campo deve ser preenchido'),
  value: yup.string().required('Este campo deve ser preenchido')
})
