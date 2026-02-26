import HomeHero from '~/app/Home/HomeHero'
import HomeAbout from '~/app/Home/HomeAbout'

const HomePage = () => {
  return (
    <>
      <HomeHero />
      <HomeAbout />
    </>
  )
}

const Wrapper = () => {
  return <HomePage />
}

export default Wrapper
