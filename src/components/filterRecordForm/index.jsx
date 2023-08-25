import {
  Checkbox, Grid, Typography
} from '@mui/material'
import { useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {
  CustomFormControlLabel,
  CustomInputLabel,
  CustomRadioGroup,
  CustomTextField,
  DefaultButton,
  FormContainer
} from '../../styles/styles'
import { theme } from '../../theme/theme'

export default function FilterRecordForm({
  handleClose,
  handleParams,
  params
}) {
  const windowSize = useWindowSize()
  let { status, date } = Object.fromEntries([...params])
  if (!status || status === 'undefined') {
    status = {
      Vencida: false,
      Pendente: false,
      Paga: false
    }
  } else if (status === 'Pendente_Vencida') {
    status = {
      Vencida: true,
      Pendente: true,
      Paga: false
    }
  } else if (status === 'Paga_Vencida') {
    status = {
      Vencida: true,
      Pendente: false,
      Paga: true
    }
  } else if (status === 'Pendente_Paga') {
    status = {
      Vencida: false,
      Pendente: true,
      Paga: true
    }
  } else if (status === 'Vencida') {
    status = {
      Vencida: true,
      Pendente: false,
      Paga: false
    }
  } else if (status === 'Pendente') {
    status = {
      Vencida: false,
      Pendente: true,
      Paga: false
    }
  } else if (status === 'Paga') {
    status = {
      Vencida: false,
      Pendente: false,
      Paga: true
    }
  } else if (status === 'todos') {
    status = {
      Vencida: true,
      Pendente: true,
      Paga: true
    }
  } else {
    status = {
      Vencida: false,
      Pendente: false,
      Paga: false
    }
  }

  const [switches, setSwitches] = useState(status)
  const [dateValue, setDateValue] = useState(date ? date : '')


  const handleRadioChange = (event) => {
    if (event === 'clean') {
      setSwitches({
        Vencida: false,
        Pendente: false,
        Paga: false
      })
      return setDateValue('')
    }
    const { name } = event.target;
    setSwitches({ ...switches, [name]: !switches[name] });
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleParams('submit', [switches, dateValue])
    handleClose()
  }

  return (
    <FormContainer
      maxWidth="xs"
      component="form"
      sx={{
        minWidth: '330px',
        alignItems: 'flex-start',
        boxShadow: '0px 4px 42px rgba(0, 0, 0, 0.2)',
        position: 'absolute',
        top: '60px',
        right: `${windowSize.width > 800 ? '-30px' : '-300px'}`,
      }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomInputLabel htmlFor="amount">Status*</CustomInputLabel>
          <CustomRadioGroup>
            <CustomFormControlLabel
              value={switches.Vencida}
              control={
                <Checkbox
                  value={switches.Vencida}
                  onChange={handleRadioChange}
                  checked={switches.Vencida}
                  color="secondary"
                  name="Vencida"
                />
              }
              label={
                <Typography component="span" variant="body7">
                  Vencidas
                </Typography>
              }
            />

            <CustomFormControlLabel
              value={switches.Pendente}
              control={
                <Checkbox
                  value={switches.Pendente}
                  onChange={handleRadioChange}
                  checked={switches.Pendente}
                  color="secondary"
                  name="Pendente"
                />
              }
              label={
                <Typography component="span" variant="body7">
                  Pendentes
                </Typography>
              }
            />
            <CustomFormControlLabel
              value={switches.Paga}
              control={
                <Checkbox
                  value={switches.Paga}
                  onChange={handleRadioChange}
                  checked={switches.Paga}
                  color="secondary"
                  name="Paga"
                />
              }
              label={
                <Typography component="span" variant="body7">
                  Pagas
                </Typography>
              }
            />
          </CustomRadioGroup>
        </Grid>

        <Grid item xs={12}>
          <CustomInputLabel htmlFor="maturity">Vencimento*</CustomInputLabel>
          <CustomTextField
            id="maturity"
            variant="outlined"
            placeholder="Data de vencimento"
            color="grey"
            fullWidth
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            type='date'
            inputProps={{
              style: {
                fontSize: 16,
                fontWeight: 400,
                color: theme.palette.grey[700]
              }
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <DefaultButton type="submit" variant="contained" fullWidth>
            Aplicar
          </DefaultButton>
        </Grid>

        <Grid item xs={12}>
          <DefaultButton
            onClick={() => handleRadioChange('clean')}
            variant="contained"
            color="grey"
            cancel="true"
            fullWidth
          >
            Limpar
          </DefaultButton>
        </Grid>
      </Grid>
    </FormContainer>
  )
}
