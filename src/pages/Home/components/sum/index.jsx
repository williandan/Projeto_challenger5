import { Box, Typography } from '@mui/material';
import { DivTotalCharges, DivTotalChargesText } from "./styles";

export default function Sum({ bgcorlor, icon, value, text }) {
  return (
    <DivTotalCharges sx={{ backgroundColor: bgcorlor }}>
      <Box>
        <img src={icon} alt={`IconeCobranças${text}`} />
      </Box>

      <DivTotalChargesText sx={{ backgroundColor: bgcorlor }}>
        <Typography variant="title3" component="h3" mb="10px">
          Cobranças {text}
        </Typography>
        <Typography variant="title2">{value}</Typography>
      </DivTotalChargesText>
    </DivTotalCharges>
  )
}
