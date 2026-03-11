'use client'
import { GlobalStyles } from '@mui/material'
import { styled } from '@mui/material/styles'
import Loading from '~/app/UI/Shared/Loading'
import { backgroundCookie } from '~/app/UI/Images'

const SplashWrap = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  width: '100%',
}))

export default function RootLoading() {
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
              backgroundImage: `url(${backgroundCookie})`,
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
      <SplashWrap>
        <Loading size={72} />
      </SplashWrap>
    </>
  )
}
