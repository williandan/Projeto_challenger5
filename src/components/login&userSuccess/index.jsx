import { Typography } from "@mui/material"
import CheckImage from '../../assets/register/registerCheck.svg'
import { ModalPaper } from './styles'

export default function loginAndUserSuccess({ text }) {
  return (
    <ModalPaper>
      <img src={CheckImage} alt="check-icon" />
      <Typography variant="title2">{text}</Typography>
    </ModalPaper>
  )
}
