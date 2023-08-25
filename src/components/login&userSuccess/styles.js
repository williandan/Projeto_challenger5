import { Paper, styled } from "@mui/material"
import { css } from '@mui/styled-engine'

export const ModalPaper = styled(Paper)`
  ${({ theme }) => css`
    width: 600px;
    height: 512px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;

    background: ${theme.palette.grey[200]};
    border-radius: 30px;
  `}
`
