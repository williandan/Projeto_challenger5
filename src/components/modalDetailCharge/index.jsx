import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import iconCloseModal from '../../assets/closeModal.svg'
import iconRecord from '../../assets/records/recordsIcon.svg'
import api from '../../services/api'
import { FormContainer, PaperStatus } from '../../styles/styles'
import { formatedDate, formatedValue } from '../../utils/fromat'
import { getItem } from '../../utils/storage'


export default function ModalDetailCharge({ open, handleClose, id }) {
  const [charge, setCharge] = useState({})

  async function getDataCharge() {
    const token = getItem('token')
    try {
      const response = await api.get(`/records/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCharge(response.data)
    }
    catch (erro) {
      console.log(erro)
    }
  }

  useEffect(() => {
    getDataCharge()
  }, [])

  return (
    <FormContainer maxWidth="sm">
      <Box sx={{
        position: 'absolute',
        top: '20px',
        right: '20px',
      }} onClick={() => handleClose(!open)}>
        <img src={iconCloseModal} alt="icone de fechar modal" />
      </Box>
      <Box sx={{
        width: '100%',
        height: '100%',
      }}>
        <Box sx={{
          display: 'flex',
          gap: '16px',
          width: 'calc(100% - 55px)'
        }}>
          <img src={iconRecord} alt="icone de cobrança" />
          <Typography variant="title4" >
            Detalhe da Cobrança
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Typography variant="body5" >Nome</Typography>
          <Typography variant="body7" >{charge.name}</Typography>
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
        }}>
          <Typography variant="body5" >Descrição</Typography>
          <Typography variant="body7" >{charge.description}</Typography>
        </Box>
        <Box sx={{
          display: "flex",
          gap: "100px"
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100px"
          }} >
            <Typography variant="body5" >Vencimento</Typography>
            <Typography variant="body7" >{formatedDate(charge.due_date)}</Typography>
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
          }}>
            <Typography variant="body5" >Valor</Typography>
            <Typography variant="body7" >{formatedValue(charge.value)}</Typography>
          </Box>
        </Box >
        <Box sx={{
          display: "flex",
          gap: "100px"
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100px"
          }}>
            <Typography variant="body5" noWrap={true}>ID cobranças</Typography>
            <Typography variant="body7" >{charge.recordId}</Typography>
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
          }}>
            <Typography variant="body5" >Status</Typography>
            <PaperStatus sx={{
              color: `${charge.status === 'Pendente'
                ? '#C5A605'
                : charge.status === 'Paga'
                  ? '#1FA7AF'
                  : '#971D1D'
                }`,
              backgroundColor: `${charge.status === 'Pendente'
                ? '#FCF6DC'
                : charge.status === 'Paga'
                  ? '#EEF6F6'
                  : '#FFEFEF'
                }`
            }}><Typography variant='body3' component='span' >{charge.status}</Typography> </PaperStatus>
          </Box>
        </Box>
      </Box >
    </FormContainer >
  )
}
