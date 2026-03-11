
'use client'
import { Button, GlobalStyles, Typography as T } from '@mui/material'
import { styled } from '@mui/material/styles'
import getClassPrefixer from '~/app/UI/classPrefixer'
import Image from 'next/image'
import { backgroundCookie, charactersImages } from '~/app/UI/Images'

const displayName = 'OfflinePage'
const classes = getClassPrefixer(displayName) as any

const Container = styled('div')(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 130px)',
  [`& .${classes.mainContainer}`]: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  [`& .${classes.textContainer}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    gap: '1rem',
    padding: '0rem 4rem 4rem 4rem',
    '@media (max-width: 768px)': {
      alignItems: 'flex-start'
    },
  },
  [`& .${classes.imageContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0rem 4rem 4rem 4rem',
    '& img': {
      objectFit: 'contain',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  [`& .${classes.buttonContainer}`]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  [`& .${classes.button}`]: {
    padding: '1ch',
    background: theme.palette.primary.main,
    color: theme.palette.background,
  },
}))

export default function OfflinePage() {
  const handleReload = () => {
    // eslint-disable-next-line no-restricted-globals
    window.location.reload()
  }

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
      <Container>
        <div className={classes.mainContainer}>
          <div className={classes.textContainer}>
            <T variant="h3" color="primary.main">
              Offline
            </T>
            <T variant="subtitle1" color="text.main">
              You are offline and this screen was not cached. Reconnect and try again.
            </T>
            <T variant="body2" color="text.main">
              Tip: open the app at least once online.
            </T>
            <div className={classes.buttonContainer}>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleReload}
              >
                Retry
              </Button>
            </div>
          </div>
          <div className={classes.imageContainer}>
            <Image
              src={charactersImages}
              alt="characters"
              width={600}
              height={600}
              layout="intrinsic"
            />
          </div>
        </div>
      </Container>
    </>
  )
}
