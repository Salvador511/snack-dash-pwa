'use client'
import { Alert, GlobalStyles, Snackbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import getClassPrefixer from '~/app/UI/classPrefixer'
import Image from 'next/image'
import { useToken } from '~/app/store/useToken'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '~/app/access/LoginForm'
import RegisterForm from '~/app/access/RegisterForm'

const displayName = 'AccessPage'
const classes = getClassPrefixer(displayName) as any

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0rem 2rem 2rem 2rem',
  height: 'calc(100dvh - 130px)',
  overflow: 'hidden',
  '@keyframes accessSwapInLeft': {
    from: {
      opacity: 0,
      transform: 'translateX(-24px) scale(0.98)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0) scale(1)',
    },
  },
  '@keyframes accessSwapInRight': {
    from: {
      opacity: 0,
      transform: 'translateX(24px) scale(0.98)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0) scale(1)',
    },
  },
  '@media (max-width: 768px)': {
    padding: '1rem',
  },
  [`& .${classes.grid}`]: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  [`& .${classes.imageContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    '& img': {
      objectFit: 'contain',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },
  [`& .${classes.formContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  [`& .${classes.formSwap}`]: {
    width: '100%',
    animationDuration: '650ms',
    animationTimingFunction: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
    animationFillMode: 'both',
    '@media (prefers-reduced-motion: reduce)': {
      animationDuration: '1ms',
    },
  },
  [`& .${classes.formSwapLogin}`]: {
    animationName: 'accessSwapInLeft',
  },
  [`& .${classes.formSwapRegister}`]: {
    animationName: 'accessSwapInRight',
  },
}))

type AccessPageProps = {
  pageState: 'login' | 'register'
  setPageState: (_pageState: 'login' | 'register') => void
  snackbarMessage: SnackbarMessage | null
  setSnackbarMessage: (_message: SnackbarMessage | null) => void
}

const AccessPage = ({ pageState, setPageState, snackbarMessage, setSnackbarMessage }: AccessPageProps) => {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/background-cookie.svg)',
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat',
              opacity: 0.04,
              zIndex: -2,
              pointerEvents: 'none',
            },
            '&::after': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.25)',
              zIndex: -1,
              pointerEvents: 'none',
            },
          },
        }}
      />
      <Container>
        <div className={classes.grid}>
          <div className={classes.imageContainer} >
            <Image
              src="/characters.svg"
              alt="characters"
              width={600}
              height={600}
              layout="intrinsic"
            />
          </div>
          <div className={classes.formContainer} >
            <div
              key={pageState}
              className={`${classes.formSwap} ${pageState === 'login' ? classes.formSwapLogin : classes.formSwapRegister}`}
            >
              {pageState === 'login' && (
                <LoginForm setPageState={setPageState} setSnackbarMessage={setSnackbarMessage} />
              )}
              {pageState === 'register' && (
                <RegisterForm setPageState={setPageState} setSnackbarMessage={setSnackbarMessage} />
              )}
            </div>
          </div>
        </div>
        <Snackbar
          open={Boolean(snackbarMessage)}
          autoHideDuration={5000}
          onClose={() => setSnackbarMessage(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity={snackbarMessage?.severity}>{snackbarMessage?.message}</Alert>
        </Snackbar>
      </Container>
    </>
  )
}

type pageState = 'login' | 'register'
type SnackbarSeverity = 'success' | 'info' | 'warning' | 'error'
export interface SnackbarMessage {
  severity: SnackbarSeverity
  message: string
}


const Wrapper = () => {
  const [pageState, setPageState] = useState<pageState>('login')
  const [snackbarMessage, setSnackbarMessage] = useState<SnackbarMessage | null>(null)
  const { token } = useToken()
  const router = useRouter()

  useEffect(() => {
    if (token) router.replace('/')
  }, [token, router])

  return (
    <AccessPage
      pageState={pageState}
      setPageState={setPageState}
      snackbarMessage={snackbarMessage}
      setSnackbarMessage={setSnackbarMessage}
    />
  )
}

export default Wrapper