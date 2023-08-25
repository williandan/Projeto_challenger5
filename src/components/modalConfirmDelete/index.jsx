import { Box, Paper, styled, Typography } from '@mui/material'
import iconCloseModal from '../../assets/closeModal.svg'
import iconWarning from '../../assets/records/warning.svg'
import useToast from '../../hooks/useToast'
import api from '../../services/api'
import { FormContainer } from '../../styles/styles'
import { getItem } from '../../utils/storage'

const PaperYesNo = styled(Paper)(({ theme }) => ({
  width: '100px',
  textAlign: 'center',
  color: theme.palette.warning.dark,
  backgroundColor: theme.palette.secondary.light
}))

export default function WarningModal({ open, handleClose, id, refreshPage }) {

  const { toastfy } = useToast()

  async function deleteRecord() {
    const token = getItem('token')
    try {
      await api.delete(`/records/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toastfy({
        type: 'success',
        message: 'Cobrança excluída com sucesso',
      })
      refreshPage()
    }
    catch (erro) {
      console.log(erro)
    }
  }

  return (
    <FormContainer maxWidth="sm" sx={{
      position: 'relative'
    }}>
      <Box sx={{
        position: 'absolute',
        top: '20px',
        right: '20px',
      }} onClick={() => handleClose(!open)}>
        <img src={iconCloseModal} alt="icone de fechar modal" />
      </Box>
      <Box>
        <img src={iconWarning} alt="warning" />
      </Box>
      <Box>
        <Typography
          sx={{
            color: '#CC7800'
          }}
        >
          Tem certeza que deseja excluir esta cobrança?
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <PaperYesNo
          sx={{
            color: '#AE1100',
            backgroundColor: '#F2D6D0'
          }}
          onClick={() => handleClose(!open)}
        >
          <Typography variant='body3' component='span' >Não</Typography>
        </PaperYesNo>
        <PaperYesNo
          sx={{
            color: '#034A2A',
            backgroundColor: '#ACD9C5'
          }}
          onClick={() => {
            deleteRecord()
            handleClose(!open)
          }}
        >
          <Typography variant='body3' component='span' >Sim</Typography>
        </PaperYesNo>
      </Box>
    </FormContainer>
  )
}
