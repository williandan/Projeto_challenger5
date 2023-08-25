import { Paper, Box } from '@mui/material'
import { css } from '@mui/styled-engine'
import { styled } from '@mui/system'

export const DivCardTableCharges = styled(Paper)`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eef6f6;
    border-radius: 8px;
    width: 50.89px;
    height: 20px;
  `}
`

export const DivFooterTable = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 58px;
  `}
`

export const DivHeaderTable = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    align-items: center;
    width: 100%;
    height: 58px;
    color: #3f3f55;
  `}
`
