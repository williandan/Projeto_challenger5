import { Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ClientsColorIcon from '../../assets/asideBar/clientsColorIcon.svg'
import ClientsIcon from '../../assets/asideBar/clientsIcon.svg'
import HomeColorIcon from '../../assets/asideBar/homeColorIcon.svg'
import HomeIcon from '../../assets/asideBar/homeIcon.svg'
import RecordsColorIcon from '../../assets/asideBar/recordsColorIcon.svg'
import RecordsIcon from '../../assets/asideBar/recordsIcon.svg'
import useWindowSize from '../../hooks/useWindowSize'
import { theme } from '../../theme/theme'
import { DivIcon, DivNavBar } from './styles'

export default function NavBar({ page }) {
  const navigate = useNavigate()
  const windowSize = useWindowSize()
  const isMobile = windowSize.width <= 800

  const navItems = [
    {
      name: 'Home',
      path: '/home',
      icon: page === 'Home' ? HomeColorIcon : HomeIcon
    },
    {
      name: 'Clientes',
      path: '/client',
      icon: page === 'Clientes' ? ClientsColorIcon : ClientsIcon
    },
    {
      name: 'Cobranças',
      path: '/records',
      icon: page === 'Cobranças' ? RecordsColorIcon : RecordsIcon
    }
  ]

  return (
    <DivNavBar>
      {navItems.map((navItem) => (
        <DivIcon
          key={navItem.name}
          sx={{ cursor: 'pointer' }}
          borderRight={page === navItem.name && !isMobile && `2px solid primary`}
          borderTop={page === navItem.name && isMobile && ` 2px solid primary`}
          onClick={() => {
            navigate(navItem.path)
          }}
        >
          <img src={navItem.icon} alt={`Icone${navItem.name}`} />
          <Typography variant="subtitle" color={page === navItem.name && 'primary'}>
            {navItem.name}
          </Typography>
        </DivIcon>
      ))}
    </DivNavBar>
  )
}
