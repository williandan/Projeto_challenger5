import { Typography } from '@mui/material'
import React from 'react'
import LoginForm from '../../components/loginForm'
import { CustomBoxBackgroundImg, CustomBoxCenterLogin } from './styles'
import { CustomContainer } from '../../styles/styles'

export default function LogInPage() {
  return (
    <CustomContainer maxWidth={false} disableGutters>
      <CustomBoxBackgroundImg>
        <Typography variant="title1" color="secondary.dark">
          Gerencie todos os pagamentos da sua empresa em um só lugar
        </Typography>
      </CustomBoxBackgroundImg>

      <CustomBoxCenterLogin>
        <LoginForm />
      </CustomBoxCenterLogin>
    </CustomContainer>
  )
}
