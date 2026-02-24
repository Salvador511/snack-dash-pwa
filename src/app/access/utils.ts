import * as Yup from 'yup'

export const getLoginValidationSchema = () =>
  Yup.object({
    identifier: Yup.string().required('Email or username is required'),
    password: Yup.string().required('Password is required'),
  })

export const getLoginInitialValues = () => ({
  identifier: '',
  password: '',
})

export const getRegisterInitialValues = () => ({
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

export const getRegisterValidationSchema = () =>
  Yup.object({
    name: Yup.string().required('Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required').email('Must be a valid email address'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })