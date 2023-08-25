import { Box } from '@mui/material'
import { css } from '@mui/styled-engine'
import { styled } from '@mui/system'

export const DivNavBar = styled(Box)`
  ${({ theme }) => css`
    max-width: 108px;
    height: 100vh;
    padding-top: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    position: sticky;
    top: 0;

    color: ${theme.palette.grey[900]};
    background-color: ${theme.palette.grey[200]};

    @media screen and (max-width: 800px) {
      flex-direction: row;
      height: 10%;
      max-width: 100%;
      padding: 0;
      gap: 10px;
      align-items: center;
      padding-bottom: 8px;
    }
  `}
`

export const DivIcon = styled(Box)`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (max-width: 800px) {
    height: 100%;
  }
`
