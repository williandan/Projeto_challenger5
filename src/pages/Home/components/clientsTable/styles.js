import { Box } from '@mui/material'
import { css } from '@mui/styled-engine'
import { styled } from '@mui/system'

export const DivClientsDefaulters = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    width: 556px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(172, 217, 197, 0.25);
  `}
`

export const DivMargin = styled(Box)`
  margin: 0px 10px;
`

export const DivMarginDisplay = styled(DivMargin)`
  display: flex;
  gap: 10px;
`
