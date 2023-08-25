import { Typography } from '@mui/material'
import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import clientIcon from '../../assets/asideBar/clientsIcon.svg'
import addIcon from '../../assets/clients/addIcon.svg'
import editIcon from '../../assets/clients/editIcon.svg'
import ClientForm from '../../components/ClientForm'
import DenseTableMain from '../../components/denseTable/denseTableMain'
import Header from '../../components/Header'
import LoggedOut from '../../components/loggedOut'
import Modal from '../../components/modal'
import NavBar from '../../components/navBar'
import RecordRegisterAndUpdateForm from '../../components/recordRegisterAndUpdateForm'
import useWindowSize from '../../hooks/useWindowSize'
import api from '../../services/api'
import {
  BoxHeader,
  DivHome,
  DivLeft,
  DivRight,
  CustomBoxTable,
  MainContent
} from '../../styles/styles'
import { getItem } from '../../utils/storage'
import {
  CustomBoxClientData,
  CustomBoxClientDataImportant,
  CustomBoxClientDataTitleENotImportant,
  CustomBoxClientHeader,
  CustomBoxData,
  CustomBoxWidth,
  CustomButtomEditClient,
  CustomTypography
} from './styles'

export default function ClientsPage() {
  const windowSize = useWindowSize()
  const [openUpdateClientModal, setOpenUpdateClientModal] = useState(false)
  const [openClientModal, setOpenClientModal] = useState(false)
  const [openLogged, setOpenLogged] = useState(false)

  const [client, setClient] = useState({})
  const { id } = useParams()

  const [params, setParams] = useSearchParams()
  const [dates, setDates] = useState(Object.fromEntries([...params]).order)

  function handleParams() {
    if (dates === 'asc') {
      setDates('desc')
      setParams({ order: 'desc' })
    } else {
      setDates('asc')
      setParams({ order: 'asc' })
    }
  }

  async function clientDatas() {
    try {
      const token = getItem('token')

      const response = await api.get(`/client/${id}?order=${dates ? dates : ''}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setClient(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    clientDatas()
  }, [dates])

  useEffect(() => {
    document.body.style.overflow = 'unset'

    if (openUpdateClientModal || openClientModal) {
      document.body.style.overflow = 'hidden'
    }

    const token = jwt_decode(getItem('token'))
    const currentDate = new Date().getTime() / 1000
    if (token.exp < currentDate) {
      setOpenLogged(true)
      document.body.style.overflow = 'hidden'
    }
  }, [dates, openUpdateClientModal, openClientModal])

  return (
    <DivHome>
      <DivLeft>
        <NavBar pag="clientes" />
      </DivLeft>
      <DivRight>
        <BoxHeader>
          <Header text="Clientes" openClient={true} />
        </BoxHeader>
        <MainContent>
          <CustomBoxClientHeader>
            <img src={clientIcon} />
            <Typography variant="title6">{client.name}</Typography>
          </CustomBoxClientHeader>
          <CustomBoxClientData>
            <CustomBoxClientDataTitleENotImportant color={'#0E8750'} propwidth={windowSize.width}>
              <Typography variant="title3">Dados do Cliente</Typography>
              <CustomButtomEditClient
                variant="contained"
                color="grey"
                onClick={() => {
                  setOpenUpdateClientModal(!openUpdateClientModal)
                }}
              >
                <img src={editIcon} />
                Editar Cliente
              </CustomButtomEditClient>
            </CustomBoxClientDataTitleENotImportant>

            <CustomBoxWidth>
              <CustomBoxClientDataImportant propwidth={windowSize.width}>
                <CustomBoxData sx={{ maxWidth: '170%' }}>
                  <Typography variant="title7">E-mail</Typography>
                  <CustomTypography variant="body7">{client.email}</CustomTypography>
                </CustomBoxData>
                <CustomBoxData>
                  <Typography variant="title7">Telefone</Typography>
                  <Typography variant="body7">{client.phone}</Typography>
                </CustomBoxData>
                <CustomBoxData>
                  <Typography variant="title7">CPF</Typography>
                  <Typography variant="body7">{client.cpf}</Typography>
                </CustomBoxData>
              </CustomBoxClientDataImportant>
            </CustomBoxWidth>
            <CustomBoxClientDataTitleENotImportant propwidth={windowSize.width}>
              <CustomBoxData>
                <Typography variant="title7">Endereço</Typography>
                <Typography variant="body7">{client.address ? client.address : '-'}</Typography>
              </CustomBoxData>
              <CustomBoxData>
                <Typography variant="title7">Bairro</Typography>
                <Typography variant="body7">{client.district ? client.district : '-'}</Typography>
              </CustomBoxData>
              <CustomBoxData>
                <Typography variant="title7">Complemento</Typography>
                <Typography variant="body7">
                  {client.complement ? client.complement : '-'}
                </Typography>
              </CustomBoxData>
              <CustomBoxData>
                <Typography variant="title7">CEP</Typography>
                <Typography variant="body7">{client.zip_code ? client.zip_code : '-'}</Typography>
              </CustomBoxData>
              <CustomBoxData>
                <Typography variant="title7">Cidade</Typography>
                <Typography variant="body7">{client.city ? client.city : '-'}</Typography>
              </CustomBoxData>
              <CustomBoxData>
                <Typography variant="title7">UF</Typography>
                <Typography variant="body7">{client.uf ? client.uf : '-'}</Typography>
              </CustomBoxData>
            </CustomBoxClientDataTitleENotImportant>
          </CustomBoxClientData>

          <CustomBoxTable flebox="true">
            <CustomBoxClientDataTitleENotImportant propwidth={windowSize.width}>
              <Typography variant="title3">Cobranças do Cliente</Typography>
              <CustomButtomEditClient
                variant="contained"
                onClick={() => {
                  setOpenClientModal(!openClientModal)
                }}
              >
                <img src={addIcon} />
                <Typography variant="p" component="p">
                  Nova cobrança
                </Typography>
              </CustomButtomEditClient>
            </CustomBoxClientDataTitleENotImportant>
            <DenseTableMain
              column1="Id Cob"
              column2="Valor"
              column3="Data de Vencimento"
              column4="Status"
              column5="Descrição"
              tableCob
              tableData={client.Records}
              refreshPage={clientDatas}
              handleParams={handleParams}
            />
          </CustomBoxTable>
        </MainContent>
      </DivRight>

      <Modal open={openUpdateClientModal}>
        <ClientForm
          text="Editar"
          open={openUpdateClientModal}
          handleClose={setOpenUpdateClientModal}
          refreshPage={clientDatas}
          openClient={client}
          id={id}
        />
      </Modal>

      <Modal open={openClientModal}>
        <RecordRegisterAndUpdateForm
          text="Cadastro"
          open={openClientModal}
          handleClose={setOpenClientModal}
          refreshPage={clientDatas}
          name={client.name}
          id={id}
        />
      </Modal>

      <Modal open={openLogged} logged="true">
        <LoggedOut />
      </Modal>
    </DivHome>
  )
}
