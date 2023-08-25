import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddRecordIcon from '../../assets/clients/addRecordIcon.svg'
import orderIcon from '../../assets/clients/orderClientsIcon.svg'
import editIcon from '../../assets/records/editIcon.svg'
import removeIcon from '../../assets/records/removeIcon.svg'
import useToast from '../../hooks/useToast'
import { CustomTableContainer, PaperStatus } from '../../styles/styles'
import { formatedDate, formatedValue } from '../../utils/fromat'
import Modal from '../modal'
import WarningModal from '../modalConfirmDelete'
import ModalDetailCharge from '../modalDetailCharge'
import NoResult from '../noResults'
import RecordRegisterAndUpdateForm from '../recordRegisterAndUpdateForm'
import { CustomTypography, TableCellCostumizeMain, TableCellCostumizePointerMain } from './styles'

export default function DenseTableMain({
  column1,
  column2,
  column3,
  column4,
  column5,
  column6,
  tableCob,
  tableData,
  handleParams,
  refreshPage
}) {
  const navigate = useNavigate()
  const [openAddRecord, setOpenAddRecord] = useState(false)
  const [openUpdateRecord, setOpenUpdateRecord] = useState(false)
  const [openRemoveModal, setOpenRemoveModal] = useState(false)
  const [openDetailChargeModal, setOpenDetailChargeModal] = useState(false)
  document.body.style.overflow = openAddRecord || openUpdateRecord || openRemoveModal || openDetailChargeModal ? 'hidden' : 'unset'
  const [id, setId] = useState(null)
  const [nameClient, setNameClient] = useState(null)
  const colSpan = column2 === "Id Cob" ? 8 : column1 === "Id Cob" ? 7 : 6
  const { toastfy } = useToast()

  function handleOpenModalRecord(id) {
    setId(id)
    setOpenDetailChargeModal(true)
  }

  function handleOpenModalRemoveRecord(id) {
    setId(id)
    setOpenRemoveModal(true)
  }

  function handleOpenModalAddRecord(id, name) {
    setId(id)
    setNameClient(name)
    setOpenAddRecord(true)
  }

  function handleOpenModalUpdateRecord(id) {
    setId(id)
    setOpenUpdateRecord(true)
  }


  return (
    <>
      <CustomTableContainer
        component={Paper}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '30px'
        }}
      >
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCellCostumizePointerMain
                align="center"
                onClick={() => handleParams(['order', 'client'], undefined)}
              >
                <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={orderIcon} /> <Typography variant='body5' component='span'>{column1}</Typography>
                </Box>
              </TableCellCostumizePointerMain>
              <TableCellCostumizePointerMain
                align="center"
                onClick={() => (tableCob && handleParams(['order', 'record'], undefined))}
              >
                <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
                  {column2 === "Id Cob" && <img src={orderIcon} />} <Typography variant='body5' component='span'>{column2}</Typography>
                </Box>
              </TableCellCostumizePointerMain>
              <TableCellCostumizeMain
                align="center"
              >
                <Typography variant='body5' component='span'>{column3}</Typography>
              </TableCellCostumizeMain>
              <TableCellCostumizeMain
                sx={{ maxWidth: tableCob ?? '150px' }}
                align="center"
              >
                <Typography variant='body5' component='span'>{column4}</Typography>
              </TableCellCostumizeMain>
              <TableCellCostumizeMain
                align="center"
              >
                <Typography variant='body5' component='span'>{column5}</Typography>
              </TableCellCostumizeMain>
              <TableCellCostumizeMain
                align="center"
              >
                <Typography variant='body5' component='span'>{column6}</Typography>
              </TableCellCostumizeMain>
              {tableCob && <TableCellCostumizeMain align="center"></TableCellCostumizeMain>}
              {tableCob && <TableCellCostumizeMain align="center"></TableCellCostumizeMain>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData && (
              tableData.length === 0 ?
                (
                  <TableRow>
                    <TableCell colSpan={colSpan}>
                      <NoResult text='Nenhum resultado foi encontrado!' />
                    </TableCell>
                  </TableRow>
                )
                : (
                  <>
                    {tableData.map((row) => (
                      <TableRow
                        key={row.cpf ? row.cpf : row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        {row.name && (
                          <TableCellCostumizeMain
                            align="center"
                            component="th"
                            scope="row"
                          >
                            <CustomTypography
                              onClick={() => (row.cpf ? navigate(`/client/${row.id}`) : handleOpenModalRecord(row.id))}
                              variant='body8'
                              component='span'
                              color='grey.600'
                              sx={{ cursor: 'pointer' }}>
                              {row.name}
                            </CustomTypography>
                          </TableCellCostumizeMain>
                        )}
                        <TableCellCostumizeMain
                          align="center"
                        >
                          <Typography variant='body8' component='span' color='grey.600'> {column2 === 'CPF' ? row.cpf : row.id}</Typography>
                        </TableCellCostumizeMain>
                        <TableCellCostumizeMain
                          align="center"
                        >
                          <CustomTypography variant='body8' component='span' color='grey.600'> {column3 === 'E-mail' ? row.email : formatedValue(row.value)}</CustomTypography>
                        </TableCellCostumizeMain>
                        <TableCellCostumizeMain
                          align="center"
                        >
                          <Typography variant='body8' component='span' color='grey.600'>{column4 === 'Telefone' ? row.phone : formatedDate(row.due_date)}</Typography>
                        </TableCellCostumizeMain>
                        <TableCellCostumizeMain align="center">
                          <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
                            {tableCob ? (
                              <PaperStatus
                                sx={{
                                  color: `${row.status === 'Pendente'
                                    ? '#C5A605'
                                    : row.status === 'Paga'
                                      ? '#1FA7AF'
                                      : '#971D1D'
                                    }`,
                                  backgroundColor: `${row.status === 'Pendente'
                                    ? '#FCF6DC'
                                    : row.status === 'Paga'
                                      ? '#EEF6F6'
                                      : '#FFEFEF'
                                    }`
                                }}
                              >
                                <Typography variant='body3' component='span'>{row.status}</Typography>
                              </PaperStatus>
                            ) : (
                              <PaperStatus
                                sx={{
                                  color: `${row.status === 'Inadimplente' ? '#971D1D' : '#1FA7AF;'
                                    }`,
                                  backgroundColor: `${row.status === 'Inadimplente' ? '#FFEFEF' : '#EEF6F6'
                                    }`
                                }}
                              >
                                <Typography variant='body3' component='span' >{row.status}</Typography>
                              </PaperStatus>
                            )}
                          </Box>
                        </TableCellCostumizeMain>
                        <TableCellCostumizeMain align="center">
                          {tableCob ? (
                            <CustomTypography variant='body8' color='grey.600'>{row.description}</CustomTypography>
                          ) : (
                            <img
                              src={AddRecordIcon}
                              onClick={() => {
                                handleOpenModalAddRecord(row.id, row.name)
                              }}
                            />
                          )}
                        </TableCellCostumizeMain>
                        {tableCob && (
                          <TableCellCostumizeMain align="center">
                            <img
                              src={editIcon}
                              onClick={() => {
                                handleOpenModalUpdateRecord(row.id)
                              }}
                            />
                          </TableCellCostumizeMain>
                        )}
                        {tableCob && (
                          <TableCellCostumizeMain align="center">
                            <img
                              src={removeIcon}
                              onClick={() => {
                                row.status === "Pendente" ? handleOpenModalRemoveRecord(row.id) : toastfy({ type: "error", message: `Cobrança ${row.status} não pode ser excluída!` })
                              }}
                            />
                          </TableCellCostumizeMain>
                        )}
                      </TableRow>
                    ))
                    }
                  </>
                ))}
          </TableBody>
        </Table>
      </CustomTableContainer>

      <Modal open={openAddRecord}>
        <RecordRegisterAndUpdateForm
          text='Cadastro'
          refreshPage={refreshPage}
          open={openAddRecord}
          handleClose={setOpenAddRecord}
          id={id}
          name={nameClient} />
      </Modal>

      <Modal open={openUpdateRecord}>
        <RecordRegisterAndUpdateForm
          text='Edição'
          refreshPage={refreshPage}
          name={nameClient}
          open={openUpdateRecord}
          handleClose={setOpenUpdateRecord}
          id={id} />
      </Modal>

      <Modal open={openRemoveModal}>
        <WarningModal
          refreshPage={refreshPage}
          open={openRemoveModal}
          handleClose={setOpenRemoveModal}
          id={id} />
      </Modal>

      <Modal open={openDetailChargeModal}>
        <ModalDetailCharge
          open={openDetailChargeModal}
          handleClose={setOpenDetailChargeModal}
          id={id} />
      </Modal>
    </>
  )
}
