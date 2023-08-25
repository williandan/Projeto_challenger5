import { Box, styled } from '@mui/material'
import { CustomBox } from '../../styles/styles'

export const CustomBoxClient = styled(CustomBox)`
  margin: 24px 0;
`

export const CustomBoxRight = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  max-width: 100%;
  height: 100%;
  flex-wrap: wrap;
`

export const CustomBoxDisplay = styled(Box)`
  display: flex;
  gap: 16px;
  align-items:center;
`

export const CustomBoxDisplayFilter = styled(Box)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: white;
  position: relative;
`
