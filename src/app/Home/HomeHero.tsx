'use client'
import { Typography as T } from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import getClassPrefixer from '~/app/UI/classPrefixer'

const displayName = 'HomeHero'
const classes = getClassPrefixer(displayName) as any

const Container = styled('div')(({ theme }: any) => ({
  width: '100vw',
  height: '100svh',
  [`& .${classes.hero}`]: {
    position: 'relative',
    width: '100vw',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '4rem',
  },
  [`& .${classes.heroImage}`]: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
  [`& .${classes.overlay}`]: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
  },
  [`& .${classes.heroContent}`]: {
    position: 'relative',
    zIndex: 2,
    width: '50vw',
    textAlign: 'left',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    '@media (max-width: 768px)': {
      width: '100vw',
    },
  },
  [`& .${classes.title}`]: {
    lineHeight: 1.2,
  },
  [`& .${classes.subtitle}`]: {
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  [`& .${classes.description}`]: {
    fontWeight: 400,
    color: theme.palette.text.main,
    lineHeight: 1.2,
  },
}))

const HomeHero = () => {
  return (
    <Container>
      <section className={classes.hero} id="home">
        <Image
          src="/hero-snack-dash.svg"
          alt=""
          className={classes.heroImage}
          fill
          priority
          sizes="100vw"
        />
        <div className={classes.overlay} aria-hidden="true" />
        <div className={classes.heroContent}>
          <T variant="h2" color="text" className={classes.title}>
            Snack Dash
          </T>
          <T variant="subtitle1" className={classes.subtitle}>
            Snacks de juego rapidos
          </T>
          <T variant="h5" className={classes.description}>
            Minijuegos instantaneos, divertidos y accesibles en cualquier dispositivo.
          </T>
        </div>
      </section>
    </Container>
  )
}

export default HomeHero
