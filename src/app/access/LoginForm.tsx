'use client'
import { Button, Stack, Typography as T } from '@mui/material'
import { styled } from '@mui/material/styles'
import getClassPrefixer from '~/app/UI/classPrefixer'
import { Field, Form, Formik, useFormikContext } from 'formik'
import { getLoginInitialValues, getLoginValidationSchema } from '~/app/access/utils'
import TextField from '~/app/UI/Shared/FormikTextField'
import { useApiMutation } from '~/app/Libs/apiFetch'
import Loading from '~/app/UI/Shared/Loading'
import { useState } from 'react'
import { useToken } from '~/app/store/useToken'
import { useRouter } from 'next/navigation'
import type { SnackbarMessage } from '~/app/access/page'


const displayName = 'LoginForm'
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
    padding: '4rem',
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

type LoginFormInnerProps = {
  setPageState: (_pageState: 'login' | 'register') => void
}

const LoginForm = ({ setPageState }: LoginFormInnerProps) => {
  const { isValid, dirty } = useFormikContext()
  return (
    <Container>
      <div className={classes.form}>
        <Stack direction="column" alignItems="center" gap="0.25rem">
          <T variant="h4">Welcome to Snack Dash!</T>
          <T variant="body2" color="text.secondary">Sign in to continue</T>
        </Stack>
        <div className={classes.fields}>
          <Field
            variant="outlined"
            name="identifier"
            label="Email or Username"
            placeholder="Email or Username"
            type="text"
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
        </div>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            type="submit"
            disabled={!dirty || !isValid}
          >
            Sign In
          </Button>
        </div>
        <T variant="body2" color="text.secondary">
          Don&apos;t have an account?{' '}
          <Button
            variant="text"
            size="small"
            onClick={() => setPageState('register')}
            className={classes.registerLink}
          >
            Click here to register
          </Button>
        </T>
      </div>
    </Container>
  )
}

type LoginFormProps = {
  setPageState: (_pageState: 'login' | 'register') => void
  setSnackbarMessage: (_message: SnackbarMessage | null) => void
}
const Wrapper = ({ setPageState, setSnackbarMessage }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setToken } = useToken()
  const intialValues = getLoginInitialValues()
  const validationSchema = getLoginValidationSchema()
  const login = useApiMutation({
    url: '/api/user/login',
    method: 'POST',
    key: 'login',
  })
  const handleSubmit = async (payload: any) => {
    setIsLoading(true)
    login.mutate(payload,
      {
        onSuccess: (data: any) => {
          setToken(data)
          router.replace('/')
        },
        onError: () => {
          setSnackbarMessage({
            severity: 'error',
            message: 'Login failed. Please try again.',
          })
        },
        onSettled: () => {
          setIsLoading(false)
        }
      }
    )
  }

  if (isLoading) return <Loading />

  return (
    <Formik initialValues={intialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <LoginForm setPageState={setPageState} />
      </Form>
    </Formik>
  )
}

export default Wrapper