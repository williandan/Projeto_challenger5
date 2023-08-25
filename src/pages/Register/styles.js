import { Box, Container, styled } from '@mui/material'
import { css } from '@mui/styled-engine'

export const CustomBoxStepper = styled(Box)`
  ${({ theme }) => css`
    width: 40%;
    max-width: 500px;
    min-height: 100vh;
    padding: 174px 10px 0;

    display: flex;
    justify-content: center;

    background-color: ${theme.palette.grey[200]};

    @media screen and (max-width: 800px) {
      display: none;
    }
  `}
`

export const CustomBoxCenterRegister = styled(Box)`
  width: 100%;
  min-height: 100vh;
  background-color: #f8f8f9;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const FooterBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  position: absolute;
  bottom: 64px;
`

export const ProgressBar = styled(Box)`
  width: 82px;
  height: 6px;
  border-radius: 20px;
  background-color: ${(props) => (props.bgc === 'green' ? '#0E8750' : '#DEDEE9')};
`
