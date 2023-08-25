import { Paper, Box } from '@mui/material'
import { css } from '@mui/styled-engine'
import { styled } from '@mui/system'

export const DivTotalCharges = styled(Paper)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    width: 360px;
    height: 111px;
    border-radius: 30px;
  `}
`

export const DivTotalChargesText = styled(Box)`
  ${({ theme }) => css`
    display: 'flex';
    flex-direction: 'column';
    text-align: 'center';
    color: ${theme.palette.grey[700]};
    min-width: '180px';
    text-align: center;
  `}
`
