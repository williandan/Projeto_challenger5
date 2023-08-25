import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import clientIcon from '../../assets/asideBar/clientsIcon.svg'
import ArrowIcon from '../../assets/arrowFormIcon.svg'
import addIcon from '../../assets/clients/addIcon.svg'
import FilterIcon from '../../assets/clients/filterIcon.svg'
import ClientForm from '../../components/ClientForm'
import DenseTableMain from '../../components/denseTable/denseTableMain'
import FilterClientForm from '../../components/filterClientForm'
import Header from '../../components/Header'
import InputPesquisa from '../../components/inputSearch'
import Modal from '../../components/modal'
import NavBar from '../../components/navBar'
import jwt_decode from 'jwt-decode'
import LoggedOut from '../../components/loggedOut'
import useWindowSize from '../../hooks/useWindowSize'
import api from '../../services/api'
import {
  BoxHeader,
  DivHome,
  DivLeft,
  DivRight,
  CustomBoxTable,
  CustomBoxLeft,
  MainContent,
  CustomButton
} from '../../styles/styles'
import { getItem } from '../../utils/storage'
import { CustomBoxClient, CustomBoxDisplay, CustomBoxDisplayFilter, CustomBoxRight } from './styles'

export default function ClientsPage() {
  const windowSize = useWindowSize()
  const [openClientModal, setOpenClientModal] = useState(false)
  const [openFilterClient, setOpenFilterClient] = useState(false)
  const [openLogged, setOpenLogged] = useState(false)
  const [tableData, setTableData] = useState([])
  const [params, setParams] = useSearchParams()
  const [dates, setDates] = useState(Object.fromEntries([...params]))

  function handleParams(prop, value) {
    const values = Object.fromEntries([...params])

    if (prop === 'submit') {
      setParams({ ...values, status: value[0] })
      return setDates({ ...values, status: value[0] })
    }

    if (prop[0] === 'order') {
      if (values.order === 'desc') {
        setParams({ ...values, [prop[0]]: `asc` })
        return setDates({ ...values, [prop[0]]: `asc` })
      } else if (values.order === 'asc') {
        setParams({ ...values, [prop[0]]: `desc` })
        return setDates({ ...values, [prop[0]]: `desc` })
      } else {
        setParams({ ...values, [prop[0]]: `asc` })
        return setDates({ ...values, [prop[0]]: `asc` })
      }
    }

    setParams({ ...values, [prop]: value })
    setDates({ ...values, [prop]: value })
  }

  async function clientDatas() {
    try {
      const { name, order, status } = dates
      const token = getItem('token')

      const response = await api.get(
        `/client?name=${name ? name : ''}&order=${order ? order : ''}&status=${status ? status : ''
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setTableData(response.data)
    } catch (error) {
      if (error.response.data.error.status === 'Nenhum Cliente encontrado') {
        setTableData([])
      }
    }
  }

  useEffect(() => {
    clientDatas()
  }, [dates])

  useEffect(() => {
    document.body.style.overflow = 'unset'

    if (openClientModal || openLogged) {
      document.body.style.overflow = 'hidden'
    }

    const token = jwt_decode(getItem('token'))
    const currentDate = new Date().getTime() / 1000

    if (token.exp < currentDate) {
      setOpenLogged(true)
      document.body.style.overflow = 'hidden'
    }
  }, [openClientModal, openFilterClient, dates])

  return (
    <DivHome>
      <DivLeft>
        <NavBar page="Clientes" />
      </DivLeft>

      <DivRight>
        <BoxHeader>
          <Header text="Clientes" />
        </BoxHeader>

        <MainContent>
          <CustomBoxClient propwidth={windowSize.width}>
            <CustomBoxLeft propwidth={windowSize.width}>
              <img src={clientIcon} />
              <Typography variant="title6">Clientes</Typography>
            </CustomBoxLeft>

            <CustomBoxRight>
              <CustomButton
                mxwi="true"
                variant="contained"
                onClick={() => {
                  setOpenClientModal(!openClientModal)
                }}
              >
                <img src={addIcon} />
                Adicionar cliente
              </CustomButton>

              <CustomBoxDisplay>
                <CustomBoxDisplayFilter>
                  <img
                    onClick={() => {
                      setOpenFilterClient(!openFilterClient)
                    }}
                    src={FilterIcon}
                    alt="filter-icon"
                  />

                  {openFilterClient && (
                    <>
                      <img
                        style={{
                          position: 'absolute',
                          top: '50px',
                          zIndex: '2'
                        }}
                        src={ArrowIcon}
                      />

                      <FilterClientForm
                        params={params}
                        handleParams={handleParams}
                        open={openFilterClient}
                        handleClose={setOpenFilterClient}
                      />
                    </>
                  )}
                </CustomBoxDisplayFilter>

                <InputPesquisa text={dates.name} handleParams={handleParams} />
              </CustomBoxDisplay>
            </CustomBoxRight>
          </CustomBoxClient>

          <CustomBoxTable marbot="true">
            <DenseTableMain
              tableClients
              column1="Cliente"
              column2="CPF"
              column3="E-mail"
              column4="Telefone"
              column5="Status"
              column6="Criar Cobrança"
              tableData={tableData}
              refreshPage={clientDatas}
              handleParams={handleParams}
            />
          </CustomBoxTable>
        </MainContent>
      </DivRight>

      <Modal open={openClientModal}>
        <ClientForm
          text="Cadastrar"
          open={openClientModal}
          handleClose={setOpenClientModal}
          refreshPage={clientDatas}
        />
      </Modal>

      <Modal open={openLogged} logged="true">
        <LoggedOut />
      </Modal>
    </DivHome>
  )
}
