'use client'
import { Button, IconButton, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import classNames from 'clsx'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import getClassPrefixer from '~/app/UI/classPrefixer'
import { isOptionVisible, SIDEBAR_OPTS } from './utils'
import { useToken } from '~/app/store/useToken'
import { logo } from '~/app/UI/Images'

const displayName = 'Navbar'
const classes = getClassPrefixer(displayName) as any

const NavbarContainer = styled('div')(({ theme }: any) => ({
  [`&.${classes.home}`]: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  [`& .${classes.navbar}`]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '130px',
    padding: '4rem',
    background: 'transparent',
    '@media (max-width: 768px)': {
      padding: '1rem',
    },
  },
  [`& .${classes.mobileToggle}`]: {
    display: 'block',
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  [`& .${classes.desktopNav}`]: {
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '1rem',
    },
  },
  [`& .${classes.barsIcon}`]: {
    color: theme.palette.primary.main,
  },
  [`& .${classes.menu}`]: {
    background: theme.palette.background.main,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    padding: '2rem',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'fixed',
    zIndex: 2,
    top: 0,
    right: '-100%',
    transition: '850ms',
    boxShadow: '-4px -1px 11px 0px rgba(0,0,0,0.5)',
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  [`& .${classes.menuActive}`]: {
    right: 0,
    transition: '350ms',
  },
  [`& .${classes.menuItems}`]: {
    padding: '1rem',
    width: '100%',
  },
  [`& .${classes.button}`]: {
    padding: '1ch',
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-start',
    textDecoration: 'none',
    color: theme.palette.text.main,
    width: '100%',
  },
  [`& .${classes.desktopButton}`]: {
    padding: '0.5ch 1.5ch',
    textTransform: 'none',
    color: theme.palette.text.main,
    fontSize: '1rem',
    fontFamily: 'Fredoka Variable',
    fontWeight: 600,
  },
}))


const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { token, logout } = useToken()

  const userRole = token ? 'LOGGED' : 'UNLOGGED'

  const handleOptionClick = (url: string) => {
    setSidebarOpen(false)
    if (url === '/logout') {
      logout()
      router.push('/')
    }
  }

  const isActive = (url: string) => {
    return pathname === url
  }

  return (
    <NavbarContainer
      className={classNames(classes.navbar, {
        [classes.home]: pathname === '/',
      })}
    >
      <div className={classes.navbar}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Image
            src={logo}
            alt="Snack Dash Logo"
            width={100}
            height={100}
            layout="intrinsic"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className={classes.desktopNav}>
          {SIDEBAR_OPTS.map((option, index) => {
            if (!isOptionVisible(option, userRole)) {
              return null
            }
            const { title, url } = option
            return (
              <Button
                key={`${title}-${index}`}
                className={classes.desktopButton}
                variant={'text'}
                component={url === '/logout' ? 'button' : Link}
                href={url === '/logout' ? undefined : url}
                onClick={() => handleOptionClick(url)}
              >
                {title}
              </Button>
            )
          })}
        </div>

        {/* Mobile Toggle */}
        <IconButton className={classes.mobileToggle} onClick={() => setSidebarOpen(true)}>
          <MenuIcon className={classes.barsIcon} />
        </IconButton>
      </div>

      {/* Mobile Menu */}
      <nav
        className={classNames({
          [classes.menu]: true,
          [classes.menuActive]: sidebarOpen,
        })}
      >
        <div className={classes.menuItems}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton onClick={() => setSidebarOpen(false)}>
              <CloseIcon className={classes.navIcon} />
            </IconButton>
          </Stack>
          <Stack spacing={2}>
            {SIDEBAR_OPTS.map((option, index) => {
              if (!isOptionVisible(option, userRole)) {
                return null
              }
              const { Icon, title, url } = option
              return (
                <Button
                  key={`${title}-${index}`}
                  className={classes.button}
                  variant={isActive(url) ? 'contained' : 'text'}
                  startIcon={Icon ? <Icon /> : null}
                  component={url === '/logout' ? 'button' : Link}
                  href={url === '/logout' ? undefined : url}
                  onClick={() => handleOptionClick(url)}
                  fullWidth
                >
                  {title}
                </Button>
              )
            })}
          </Stack>
        </div>
      </nav>
    </NavbarContainer>
  )
}

export default Navbar