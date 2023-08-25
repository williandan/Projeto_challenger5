import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import defaulterClients from '../../assets/home/container/defaulterClient.svg'
import IconExpectedCharges from '../../assets/home/container/expectedChargesIcon.svg'
import IconOverdueCharges from '../../assets/home/container/overdueChargesIcon.svg'
import IconPaidCharges from '../../assets/home/container/paidChargesIcon.svg'
import dateClients from '../../assets/home/container/upToDateClients.svg'
import Header from '../../components/Header'
import LoggedOut from '../../components/loggedOut'
import Modal from '../../components/modal'
import NavBar from '../../components/navBar'
import api from '../../services/api'
import { DivHome, DivLeft, DivRight } from '../../styles/styles'
import { getItem } from '../../utils/storage'
import ClientsTable from './components/clientsTable'
import RecordsTable from './components/recordsTable'
import RecordsSum from './components/sum/index'
import { DivHeader, DivTables, DivTotalValues } from './styles'

export default function HomePage() {
  const [tableData, setTableData] = useState('')
  const [openLogged, setOpenLogged] = useState(false)

  async function getDataHome() {
    const token = getItem('token')

    try {
      const response = await api.get('/home', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setTableData(response.data)
    } catch (erro) {
      console.log(erro)
    }
  }

  useEffect(() => {
    const token = jwt_decode(getItem('token'))
    const currentDate = new Date().getTime() / 1000

    if (token.exp < currentDate) {
      setOpenLogged(true)
      document.body.style.overflow = 'hidden'
    }

    getDataHome()
  }, [])

  return (
    <DivHome>
      <DivLeft>
        <NavBar page="Home" />
      </DivLeft>

      <DivRight>
        <DivHeader>
          <Header text="Resumo de Cobranças" />
        </DivHeader>

        <DivTotalValues>
          <RecordsSum
            bgcorlor={(theme) => theme.palette.background.payed}
            icon={IconPaidCharges}
            value={tableData.paidRecordsSum}
            text="Pagas"
          />
          <RecordsSum
            bgcorlor={(theme) => theme.palette.background.overdue}
            icon={IconOverdueCharges}
            value={tableData.pastRecordsSum}
            text="Vencidas"
          />
          <RecordsSum
            bgcorlor={(theme) => theme.palette.background.planned}
            icon={IconExpectedCharges}
            value={tableData.pendingRecordsSum}
            text="Pendentes"
          />
        </DivTotalValues>

        <DivTables>
          <RecordsTable
            text="Vencidas"
            recordsCount={tableData.pastRecordsCount}
            records={tableData.pastRecords ? tableData.pastRecords : []}
          />
          <RecordsTable
            text="Pendentes"
            recordsCount={tableData.pendingRecordsCount}
            records={tableData.pendingRecords ? tableData.pendingRecords : []}
          />
          <RecordsTable
            text="Pagas"
            recordsCount={tableData.paidRecordsCount}
            records={tableData.paidRecords ? tableData.paidRecords : []}
          />
        </DivTables>

        <DivTables>
          <ClientsTable
            text="Inadimplentes"
            clientsCount={tableData.defaulterClientsCount}
            clients={tableData.defaulterClients ? tableData.defaulterClients : []}
            icon={defaulterClients}
          />
          <ClientsTable
            text="Em dia"
            clientsCount={tableData.paidClientsCount}
            clients={tableData.paidClients ? tableData.paidClients : []}
            icon={dateClients}
          />
        </DivTables>
      </DivRight>

      <Modal open={openLogged} logged="true">
        <LoggedOut />
      </Modal>
    </DivHome>
  )
}
