import { Box, styled } from '@mui/material'
import Image from '../../assets/login/login.png'

export const CustomBoxBackgroundImg = styled(Box)`
  width: 40%;
  max-width: 500px;
  min-height: 100vh;
  padding: 100px 47px 0;

  display: flex;
  justify-content: center;
  text-align: center;

  background-image: url(${Image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media screen and (max-width: 800px) {
    display: none;
  }
`

export const CustomBoxCenterLogin = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
`
