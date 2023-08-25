import { Typography } from "@mui/material"
import noResult from "../../assets/noResults.svg"
import { NoResultBox } from './styles'

export default function NoResult({ text }) {
  return (
    <NoResultBox>
      <img src={noResult} />
      {text && (
        <Typography variant="title4" color='#F08889'>{text}</Typography>
      )}
    </NoResultBox>
  )
}
