import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DenseTableHome from '../../../../components/denseTable/denseTableHome';
import { DivCardTableCharges, DivFooterTable, DivHeaderTable } from '../styles';
import { DivCharges } from './styles';
import { PaperStatus } from '../../../../styles/styles'

export default function RecordsTable({ text, recordsCount, records }) {
  const linkText = text.replace('s', '');
  return (
    <DivCharges>
      <DivHeaderTable>
        <Typography variant="title3" component="h3">
          Cobranças {text}
        </Typography>

        <DivCardTableCharges
          sx={{
            color: (theme) => theme.palette.background.overdueAmount,
            backgroundColor: (theme) => theme.palette.background.overdue
          }}
        >
          <PaperStatus sx={{
            color: `${linkText === 'Pendente'
              ? '#C5A605'
              : linkText === 'Paga'
                ? '#1FA7AF'
                : '#971D1D'
              }`,
            backgroundColor: `${linkText === 'Pendente'
              ? '#FCF6DC'
              : linkText === 'Paga'
                ? '#EEF6F6'
                : '#FFEFEF'
              }`
          }}
          >
            <Typography variant='title5' component='span'>
              {recordsCount}
            </Typography>
          </PaperStatus>
        </DivCardTableCharges>
      </DivHeaderTable>

      <DenseTableHome column1="Cliente" column2="ID da cob." column3="Valor" tableData={records} />

      <DivFooterTable>
        {(records.length === 0 ? (
          <Typography variant="body2">Nenhum Resultado Encontrado</Typography>
        ) : (
          <Link to={`/records?status=${linkText}`}>
            <Typography variant="body2" component="span">
              Ver todos
            </Typography>
          </Link>
        ))}
      </DivFooterTable>
    </DivCharges>
  )
}
