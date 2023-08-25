import { Box } from '@mui/material'
import { css } from '@mui/styled-engine'
import { styled } from '@mui/system'

export const DivCharges = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    width: 360px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(172, 217, 197, 0.25);
  `}
`
