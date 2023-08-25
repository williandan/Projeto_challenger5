import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { formatedValue } from '../../utils/fromat'
import NoResult from '../noResults'
import { TableCellCostumizeHome, CustomTypography } from './styles'

export default function DenseTableHome({
  column1,
  column2,
  column3,
  tableData
}) {

  return (
    <>
      <TableContainer sx={{ minHeight: '372px', maxWidth: '100%' }} component={Paper}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCellCostumizeHome>
                <CustomTypography variant='body5' component='span'>{column1}</CustomTypography>
              </TableCellCostumizeHome>
              <TableCellCostumizeHome align="left">
                <CustomTypography variant='body5' component='span'>{column2}</CustomTypography>
              </TableCellCostumizeHome>
              <TableCellCostumizeHome align="left">
                <CustomTypography variant='body5' component='span'>{column3}</CustomTypography>
              </TableCellCostumizeHome>
            </TableRow>
          </TableHead>
          {
            tableData && (
              tableData.length === 0 ?
                (<TableBody>
                  <TableRow key={-1}>
                    <TableCellCostumizeHome colSpan={3}>
                      <NoResult />
                    </TableCellCostumizeHome>
                  </TableRow>
                </TableBody>)
                :
                (tableData &&
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCellCostumizeHome component="th" scope="row" >
                          <CustomTypography
                            variant='body8'
                            component='span'
                            color='grey.600'
                          >
                            {row.name}
                          </CustomTypography>
                        </TableCellCostumizeHome>
                        <TableCellCostumizeHome align="left" >
                          <CustomTypography
                            variant='body8'
                            component='span'
                            color='grey.600'
                          >
                            {row.recordId ? row.recordId : row.id}
                          </CustomTypography>
                        </TableCellCostumizeHome>
                        <TableCellCostumizeHome align="left" >
                          <CustomTypography
                            variant='body8'
                            component='span'
                            color='grey.600'
                          >
                            {row.value ? formatedValue(row.value) : row.cpf}
                          </CustomTypography>
                        </TableCellCostumizeHome>
                      </TableRow>
                    ))}
                  </TableBody>))
          }
        </Table>
      </TableContainer>
    </>
  )
}
