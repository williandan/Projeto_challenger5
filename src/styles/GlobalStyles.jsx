import { Global } from '@emotion/react'
import { css } from '@mui/styled-engine'

const Css = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  img {
    cursor: pointer;
  }

  a {
    color: #da0175;
  }
`

export const GlobalStyles = () => <Global styles={Css} />
