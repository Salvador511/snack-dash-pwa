'use client'
import { Typography as T } from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import getClassPrefixer from '~/app/UI/classPrefixer'

const displayName = 'HomeAbout'
const classes = getClassPrefixer(displayName) as any

const Container = styled('div')(({ theme }: any) => ({
  width: '100vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  minHeight: '90vh',
  background: theme.palette.background.main,
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    minHeight: 'auto',
  },
  [`& .${classes.item}`]: {
    display: 'flex',
    position: 'relative',
  },
  [`& .${classes.content}`]: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '50%',
    padding: '5rem 6rem',
    gap: '1rem',
    '@media (max-width: 900px)': {
      width: '100%',
      padding: '2rem',
    },
  },
  [`& .${classes.imageContainer}`]: {
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '50%',
    overflow: 'hidden',
    minHeight: '90vh',
    '@media (max-width: 900px)': {
      width: '100%',
      minHeight: '60vw',
    },
  },
  [`& .${classes.image}`]: {
    objectFit: 'cover',
    objectPosition: 'center',
  },
  [`& .${classes.kicker}`]: {
    textTransform: 'uppercase',
    letterSpacing: '0.35em',
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  [`& .${classes.title}`]: {
    fontWeight: 800,
    lineHeight: 1.1,
  },
  [`& .${classes.subtitle}`]: {
    fontStyle: 'italic',
    color: theme.palette.text.muted,
  },
  [`& .${classes.divider}`]: {
    border: 'none',
    borderTop: `2px solid ${theme.palette.primary.main}`,
    width: '120px',
    margin: '0.5rem 0 1rem',
  },
  [`& .${classes.description}`]: {
    color: theme.palette.text.main,
    lineHeight: 1.7,
  },
  [`& .${classes.descriptionCard}`]: {
    color: theme.palette.background.main,
    lineHeight: 1.7,
  },
  [`& .${classes.highlight}`]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
  [`& .${classes.card}`]: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    padding: '1rem 1.25rem',
    background: theme.palette.background.paper,
  },
  [`& .${classes.cardTitle}`]: {
    fontWeight: 700,
    marginBottom: '0.25rem',
    color: theme.palette.primary.main,
  },
}))

const HomeAbout = () => {
  return (
    <Container>
      <div className={`${classes.item} ${classes.imageContainer}`}>
        <Image
          src="/characters-about.svg"
          alt="Snack Dash Logo"
          className={classes.image}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>
      <div className={`${classes.item} ${classes.content}`}>
        <T variant="subtitle2" className={classes.kicker}>
          About Snack Dash
        </T>
        <T variant="h3" className={classes.title} color="text">
          Mini games that feel like snacks
        </T>
        <T variant="body2" className={classes.subtitle}>
          Quick, tasty, and always ready for one more round.
        </T>
        <hr className={classes.divider} />
        <T variant="body1" className={classes.description}>
          Snack Dash turns fast mini games into bite sized fun. Jump into short challenges,
          rack up wins, and come back anytime without losing momentum. Everything runs
          smoothly on any device so you can play in seconds and stay as long as you want.
        </T>
        <T variant="body1" className={classes.description}>
          We keep the rules simple, the pacing tight, and the rewards satisfying. Whether
          you are on a quick break or chasing the leaderboard, Snack Dash keeps the fun
          flowing with fresh, snackable gameplay.
        </T>
        <div className={classes.highlight}>
          <div className={classes.card}>
            <T variant="body1" className={classes.cardTitle}>
              Fast rounds
            </T>
            <T variant="body2" className={classes.descriptionCard}>
              Short sessions built for quick wins.
            </T>
          </div>
          <div className={classes.card}>
            <T variant="body1" className={classes.cardTitle}>
              Any device
            </T>
            <T variant="body2" className={classes.descriptionCard}>
              Smooth play on mobile, tablet, and desktop.
            </T>
          </div>
          <div className={classes.card}>
            <T variant="body1" className={classes.cardTitle}>
              Snackable fun
            </T>
            <T variant="body2" className={classes.descriptionCard}>
              Small challenges with big replay value.
            </T>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HomeAbout