'use client'
import HomeHero from '~/app/Home/HomeHero'
import HomeAbout from '~/app/Home/HomeAbout'
import { styled } from '@mui/material/styles'

const PageWrap = styled('div')(() => ({
  width: '100%',
  maxWidth: '100%',
  overflowX: 'hidden',
}))

const HomePage = () => {
  return (
    <PageWrap>
      <HomeHero />
      <HomeAbout />
    </PageWrap>
  )
}

const Wrapper = () => {
  return <HomePage />
}

export default Wrapper
