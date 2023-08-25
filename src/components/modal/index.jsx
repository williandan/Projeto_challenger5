import { Container, styled } from '@mui/material'
import { css } from '@mui/styled-engine'

const ModalBackground = styled(Container)`
  z-index: ${({ logged }) => logged ? '4' : '3'};
  ${({ theme }) => css`
    padding: 50px 0;

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: scroll;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${theme.palette.grey[1000]};
    backdrop-filter: blur(2px);
    transition: all 2s ;
  `}
`

export default function Modal({ open, children, logged }) {
  return <>{open && <ModalBackground logged={logged} maxWidth={false}>{children}</ModalBackground>
  }</>
}
