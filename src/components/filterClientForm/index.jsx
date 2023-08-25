import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material/'
import {
  Checkbox, Grid, Typography
} from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useWindowSize from '../../hooks/useWindowSize'
import {
  CustomFormControlLabel,
  CustomInputLabel,
  CustomRadioGroup,
  DefaultButton,
  FormContainer
} from '../../styles/styles'

export default function FilterClientForm({
  handleClose,
  handleParams,
}) {
  const windowSize = useWindowSize()
  const [params, setParams] = useSearchParams()
  const { status } = Object.fromEntries([...params])
  const [selectedValue, setSelectedValue] = useState(status && status !== 'undefined' ? status : '')

  const handleRadioChange = (event) => {
    if (event === 'clean' || event.target.value === selectedValue) {
      return setSelectedValue('')
    }
    setSelectedValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleParams('submit', [selectedValue])
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
              value='Inadimplente'
              control={
                <Checkbox
                  color="secondary"
                  onChange={handleRadioChange}
                  checked={selectedValue === 'Inadimplente'}
                  icon={<CheckBoxOutlineBlank />}
                  checkedIcon={<CheckBox />}
                />
              }
              label={
                <Typography component="span" variant="body7">
                  Inadimplentes
                </Typography>
              }
            />
            <CustomFormControlLabel
              value='Em dia'
              control={
                <Checkbox
                  onChange={handleRadioChange}
                  color="secondary"
                  checked={selectedValue === 'Em dia'}
                  icon={<CheckBoxOutlineBlank />}
                  checkedIcon={<CheckBox />}
                />
              }
              label={
                <Typography component="span" variant="body7">
                  Em Dia
                </Typography>
              }
            />
          </CustomRadioGroup>
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
