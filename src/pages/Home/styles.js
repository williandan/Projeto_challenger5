import { Box } from '@mui/material'
import { css } from '@mui/styled-engine'
import { styled } from '@mui/system'

export const DivTotalValues = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 32px;
    margin: 19px 0px 24px 0px;
  `}
`

export const DivTables = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: #f8f8f9;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 30px;
  `}
`

export const DivHeader = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
