import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DenseTableHome from "../../../../components/denseTable/denseTableHome";
import { DivClientsDefaulters, DivMargin, DivMarginDisplay } from './styles';
import { DivCardTableCharges, DivFooterTable, DivHeaderTable } from '../styles'
import { PaperStatus } from "../../../../styles/styles";

export default function ClientsTable({ text, clientsCount, clients, icon }) {
  let linkText = text.replace('s', '')
  linkText = linkText.replace(' ', '+')
  return (
    <DivClientsDefaulters>
      <DivHeaderTable>
        <DivMarginDisplay>
          <img src={icon} alt="iconeClienteEmDia" />
          <Typography variant="title3">Clientes {text}</Typography>
        </DivMarginDisplay>

        <DivMargin>
          <DivCardTableCharges
            sx={{
              color: (theme) => theme.palette.background.overdueAmount,
              backgroundColor: (theme) => theme.palette.background.overdue
            }}
          >
            <PaperStatus
              sx={{
                color: `${linkText === 'Inadimplente'
                  ? '#971D1D'
                  : '#1FA7AF'
                  }`,
                backgroundColor: `${linkText === 'Inadimplente'
                  ? '#FFEFEF'
                  : '#EEF6F6'
                  }`
              }}
            >
              <Typography variant="title5">{clientsCount}</Typography>
            </PaperStatus>
          </DivCardTableCharges>
        </DivMargin>
      </DivHeaderTable>

      <DenseTableHome column1="Cliente" column2="ID do clie." column3="CPF" tableData={clients} />

      <DivFooterTable>
        {(clients.length === 0 ? (
          <Typography variant="body2">Nenhum Resultado Encontrado</Typography>
        ) : (
          <Link to={`/client?status=${linkText}`}>
            <Typography variant="body2">Ver todos</Typography>
          </Link>
        ))}
      </DivFooterTable>
    </DivClientsDefaulters>
  )
}
