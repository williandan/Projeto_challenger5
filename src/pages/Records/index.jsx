import { Box, Typography } from '@mui/material'
import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ArrowIcon from '../../assets/arrowFormIcon.svg'
import RecordsIcon from '../../assets/asideBar/recordsIcon.svg'
import FilterIcon from '../../assets/clients/filterIcon.svg'
import DenseTableMain from '../../components/denseTable/denseTableMain'
import FilterRecordForm from '../../components/filterRecordForm'
import Header from '../../components/Header'
import InputBusca from '../../components/inputSearch'
import LoggedOut from '../../components/loggedOut'
import Modal from '../../components/modal'
import NavBar from '../../components/navBar'
import useWindowSize from '../../hooks/useWindowSize'
import api from '../../services/api'
import {
  BoxHeader,
  CustomBox,
  CustomBoxLeft,
  CustomBoxTable,
  DivHome,
  DivLeft,
  DivRight,
  MainContent
} from '../../styles/styles'
import { getItem } from '../../utils/storage'
import { BoxRecordsContendHeaderLeft, BoxRecordsContendHeaderLeftFilter } from './styles'

export default function HomePage() {
  const windowSize = useWindowSize()
  const [openFilterRecord, setOpenFilterRecord] = useState(false)
  const [openLogged, setOpenLogged] = useState(false)
  const [tableData, setTableData] = useState([])

  const [params, setParams] = useSearchParams()
  const [dates, setDates] = useState(Object.fromEntries([...params]))

  function handleParams(prop, value) {
    const values = Object.fromEntries([...params])
    if (prop === 'submit') {
      const [{ Vencida, Pendente, Paga }, dateValue] = value
      let status
      if (Vencida && Pendente && Paga) {
        status = 'todos'
      } else if (Vencida && Pendente) {
        status = 'Pendente_Vencida'
      } else if (Vencida && Paga) {
        status = 'Paga_Vencida'
      } else if (Pendente && Paga) {
        status = 'Pendente_Paga'
      } else if (Vencida) {
        status = 'Vencida'
      } else if (Pendente) {
        status = 'Pendente'
      } else if (Paga) {
        status = 'Paga'
      }
      setParams({ ...values, status: status, date: dateValue })
      return setDates({ ...values, status: status === 'todos' ? '' : status, date: dateValue })
    }
    if (prop[0] === 'order') {
      if (values.order === undefined) {
        setParams({ ...values, order: `${prop[1]}_asc` })
        return setDates({ ...values, order: `${prop[1]}_asc` })
      }
      const nowOrder = values.order.split('_')
      if (nowOrder[1] === 'desc' || nowOrder[0] !== prop[1]) {
        setParams({ ...values, order: `${prop[1]}_asc` })
        return setDates({ ...values, order: `${prop[1]}_asc` })
      } else if (nowOrder[1] === 'asc') {
        setParams({ ...values, order: `${prop[1]}_desc` })
        return setDates({ ...values, order: `${prop[1]}_desc` })
      }
    }
    setParams({ ...values, [prop]: value })
    setDates({ ...values, [prop]: value })
  }

  async function getRecords() {
    const { date, name, status, order } = dates
    try {
      const token = getItem('token')
      const response = await api.get(
        `/records?date=${date ? date : ''}&status=${status && status !== 'todos' && status !== 'undefined' ? status : ''
        }&order=${order ? order : ''}&name=${name ? name : ''}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setTableData(response.data)
    } catch (error) {
      if (error.response.data.error.status === 'Nenhuma Cobrança encontrada') {
        setTableData([])
      }
    }
  }

  useEffect(() => {
    getRecords()
  }, [dates])

  useEffect(() => {
    const token = jwt_decode(getItem('token'))
    const currentDate = new Date().getTime() / 1000
    if (token.exp < currentDate) {
      setOpenLogged(true)
      document.body.style.overflow = 'hidden'
    }
  }, [dates, openFilterRecord])

  return (
    <DivHome>
      <DivLeft>
        <NavBar page="Cobranças" />
      </DivLeft>
      <DivRight>
        <BoxHeader>
          <Header text="Cobranças" />
        </BoxHeader>
        <MainContent>
          <CustomBox propwidth={windowSize.width}>
            <CustomBoxLeft propwidth={windowSize.width}>
              <img src={RecordsIcon} />
              <Typography variant="title6">Cobranças</Typography>
            </CustomBoxLeft>
            <BoxRecordsContendHeaderLeft>
              <BoxRecordsContendHeaderLeftFilter>
                <img
                  src={FilterIcon}
                  onClick={() => {
                    setOpenFilterRecord(!openFilterRecord)
                  }}
                />
                {openFilterRecord && (
                  <>
                    <img
                      style={{
                        position: 'absolute',
                        top: '50px',
                        zIndex: '2'
                      }}
                      src={ArrowIcon}
                    />
                    <FilterRecordForm
                      params={params}
                      handleParams={handleParams}
                      open={openFilterRecord}
                      handleClose={setOpenFilterRecord}
                    />
                  </>
                )}
              </BoxRecordsContendHeaderLeftFilter>
              <Box>
                <InputBusca handleParams={handleParams} text={dates.name} />
              </Box>
            </BoxRecordsContendHeaderLeft>
          </CustomBox>
          <CustomBoxTable magbot="true">
            <DenseTableMain
              column1="Cliente"
              column2="Id Cob"
              column3="Valor"
              column4="Data de Vencimento"
              column5="Status"
              column6="Descrição"
              tableCob
              refreshPage={getRecords}
              tableData={tableData}
              handleParams={handleParams}
            />
          </CustomBoxTable>
        </MainContent>
      </DivRight>
      <Modal open={openLogged} logged="true">
        <LoggedOut />
      </Modal>
    </DivHome>
  )
}
