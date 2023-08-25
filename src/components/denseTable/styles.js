import { TableCell, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const TableCellCostumizeHome = styled(TableCell)`
  white-space: nowrap;
  max-width: 120px
`

export const TableCellCostumizeMain = styled(TableCell)`
  white-space: nowrap;
  max-width: 150px;
`

export const TableCellCostumizePointerMain = styled(TableCellCostumizeMain)`
  cursor: pointer;
`

export const CustomTypography = styled(Typography)`
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`
