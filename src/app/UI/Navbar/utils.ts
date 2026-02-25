'use client'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import type { ComponentType } from 'react'

export interface SidebarOption {
  title: 'Ranking' | 'Access' | 'My Account' | 'Logout'
  Icon: ComponentType<any> | null
  requiresAuth?: boolean
  adminOnly?: boolean
  unloggedOnly?: boolean
  url: string
}

export const isOptionVisible = (option: SidebarOption, userRole: string): boolean => {
  if (option.unloggedOnly && userRole !== 'UNLOGGED') return false

  if (option.requiresAuth && userRole === 'UNLOGGED') return false

  return true
}

export const SIDEBAR_OPTS: SidebarOption[] = [
  {
    title: 'Ranking',
    Icon: EmojiEventsIcon,
    url: '/',
  },
  {
    title: 'Access',
    Icon: LoginIcon,
    unloggedOnly: true,
    url: '/access',
  },
  {
    title: 'My Account',
    Icon: SettingsIcon,
    requiresAuth: true,
    url: '/my-account',
  },
  {
    title: 'Logout',
    Icon: LogoutIcon,
    requiresAuth: true,
    url: '/logout',
  },
]