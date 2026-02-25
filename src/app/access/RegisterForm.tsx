'use client'
import { Button, Stack, Typography as T } from '@mui/material'
import { styled } from '@mui/material/styles'
import getClassPrefixer from '~/app/UI/classPrefixer'
import { Field, Form, Formik, useFormikContext } from 'formik'
import { getRegisterInitialValues, getRegisterValidationSchema } from '~/app/access/utils'
import TextField from '~/app/UI/Shared/FormikTextField'
import { useApiMutation } from '~/app/Libs/apiFetch'
import Loading from '~/app/UI/Shared/Loading'
import { useState } from 'react'
import type { SnackbarMessage } from '~/app/access/page'

const displayName = 'RegisterForm'
const classes = getClassPrefixer(displayName) as any

const Container = styled('div')(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  [`& .${classes.form}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40vw',
    boxSizing: 'border-box',
    padding: '2rem 4rem',
    gap: '1rem',
    border: `solid 3px ${theme.palette.primary.main}`,
    borderRadius: '1rem',
    background: theme.palette.text.main,
  },
  [`& .${classes.fields}`]: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1rem',
  },
  [`& .${classes.buttonContainer}`]: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  [`& .${classes.button}`]: {
    padding: '1ch',
    background: theme.palette.primary.main,
    color: theme.palette.text.main,
    '&:hover': {
      background: theme.palette.primary.strong,
    },
    '&.Mui-disabled': {
      background: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    },
  },
  [`& .${classes.registerLink}`]: {
    textTransform: 'none',
    padding: 0,
    minWidth: 'unset',
    verticalAlign: 'baseline',
  },
}))

type RegisterFormInnerProps = {
  setPageState: (_pageState: 'login' | 'register') => void
}

const RegisterForm = ({ setPageState }: RegisterFormInnerProps) => {
  const { isValid, dirty } = useFormikContext()
  return (
    <Container>
      <div className={classes.form}>
        <Stack direction="column" alignItems="center">
          <T variant="h4">Create an account</T>
        </Stack>
        <div className={classes.fields}>
          <Field
            variant="outlined"
            name="name"
            label="Name"
            placeholder="Name"
            component={TextField}
          />
          <Field
            variant="outlined"
            name="username"
            label="Username"
            placeholder="Username"
            component={TextField}
          />
          <Field
            variant="outlined"
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
            component={TextField}
          />
          <Field
            variant="outlined"
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            password
            component={TextField}
          />
          <Field
            variant="outlined"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            password
            component={TextField}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            type="submit"
            disabled={!dirty || !isValid}
          >
            Register
          </Button>
        </div>
        <T variant="body2" color="text.secondary">
          Do you have already an account?{' '}
          <Button
            variant="text"
            size="small"
            onClick={() => setPageState('login')}
            className={classes.registerLink}
          >
            Click here to login
          </Button>
        </T>
      </div>
    </Container>
  )
}

type RegisterFormProps = {
  setPageState: (_pageState: 'login' | 'register') => void
  setSnackbarMessage: (_message: SnackbarMessage | null) => void
}
const Wrapper = ({ setPageState, setSnackbarMessage }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const intialValues = getRegisterInitialValues()
  const validationSchema = getRegisterValidationSchema()
  const register = useApiMutation({
    url: '/api/user',
    method: 'POST',
    keys: ['users'],
  })
  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    register.mutate(values, {
      onSuccess: () => {
        setSnackbarMessage({
          severity: 'success',
          message: 'Registration successful! Please log in.',
        })
        setPageState('login')
      },
      onError: () => {
        setSnackbarMessage({
          severity: 'error',
          message: 'Registration failed. Please try again.',
        })
      },
      onSettled: () => {
        setIsLoading(false)
      }
    })
  }
  if (isLoading) return <Loading />
  return (
    <Formik initialValues={intialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <RegisterForm setPageState={setPageState} />
      </Form>
    </Formik>
  )
}

export default Wrapper