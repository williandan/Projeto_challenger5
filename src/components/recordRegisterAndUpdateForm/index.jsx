import { yupResolver } from '@hookform/resolvers/yup'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
  Grid, Radio, Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { mask, unMask } from 'remask'
import CloseModal from '../../assets/closeModal.svg'
import RecordsIcon from '../../assets/records/recordsIcon.svg'
import useToast from '../../hooks/useToast'
import { schemaRecord } from '../../schemas/schemas'
import api from '../../services/api'
import {
  CustomBoxCloseModal,
  CustomBoxFormHeader,
  CustomFormControlLabel,
  CustomInputLabel,
  CustomRadioGroup, DefaultButton,
  FormContainer
} from '../../styles/styles'
import { formatedValueInputBRL } from '../../utils/fromat'
import { getItem } from '../../utils/storage'
import DefaultTextField from '../defaultTextField'

export default function RecordRegisterForm({
  open,
  handleClose,
  id,
  name,
  refreshPage,
  text
}) {
  const [selectedValue, setSelectedValue] = useState('true')

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schemaRecord),
    defaultValues: {
      name,
      description: '',
      due_date: '',
      value: '',
      status: '',
    }
  })

  const { toastfy } = useToast()

  async function onSubmit({ description, due_date, value, paid_out }) {
    try {
      const token = getItem('token')

      if (text === 'Cadastro') {
        const data = {
          id_clients: id,
          description,
          due_date,
          value: unMask(value),
          paid_out,
        }

        await api.post('/records', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } else if (text === 'Edição') {
        const data = {
          description,
          due_date,
          value: unMask(value),
          paid_out,
        }

        await api.put(`/records/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }

      handleClose(!open)
      toastfy({
        type: 'success',
        message: text === 'Cadastro' ? 'Cobrança cadastrada com sucesso' : 'Cobrança editada com sucesso!'
      })
      refreshPage()
    } catch (error) {
      if (error.response.data?.error) {
        const errorData = Object.getOwnPropertyNames(error.response.data?.error)
        errorData.map((elementDate) => {
          setError(
            elementDate,
            {
              type: 'manual',
              message: error.response.data?.error[elementDate]
            },
            {
              shouldFocus: true
            }
          )
        })
      }
    }
  }

  async function getDataCharge() {
    const token = getItem('token')
    try {
      const response = await api.get(`/records/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setValue('name', response.data.name)
      setValue('description', response.data.description)
      setValue('due_date', response.data.due_date)
      handleChange({ target: { value: response.data.value } })
      setValue('paid_out', response.data.status === "Paga" ? "true" : "false")
      setSelectedValue(response.data.status === "Paga" ? "true" : "false")
    }
    catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    setValue('name', name)
    if (text === 'Edição') {
      getDataCharge()
    }
  }, [])

  function handleChange(e) {
    let correctValue = formatedValueInputBRL(unMask(e.target.value));
    let arrayValue = correctValue.replace(/\d/g, '9')

    setValue('value', mask((correctValue === '0,00' ? '' : correctValue), [`${arrayValue}`]))
  }

  return (
    <FormContainer maxWidth="sm" component="form" sx={{ alignItems: 'flex-start' }} onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}>
      <CustomBoxCloseModal>
        <img src={CloseModal} alt="close-modal" onClick={() => handleClose(!open)} />
      </CustomBoxCloseModal>

      <CustomBoxFormHeader>
        <img src={RecordsIcon} alt="records-icon" />
        <Typography component="h3" variant="title2">
          {text} de Cobrança
        </Typography>
      </CustomBoxFormHeader>

      <Grid container spacing={2}>
        <DefaultTextField
          text='Nome*'
          inputName='name'
          placeHolderText='nome'
          register={register}
          errors={errors}
          disabled={true}
        />
        <DefaultTextField
          text='Descrição*'
          inputName='description'
          placeHolderText='descrição'
          register={register}
          errors={errors}
          multiline={true}
          feminine='true'
        />
        <DefaultTextField
          text='Vencimento*'
          inputName='due_date'
          placeHolderText='vencimento'
          register={register}
          errors={errors}
          type="date"
          middle={6}
        />
        <DefaultTextField
          text='Valor*'
          inputName='value'
          placeHolderText='valor'
          register={register}
          errors={errors}
          middle={6}
          start='R$'
          mask={handleChange}
        />
        <Grid item xs={12} mb={8}>
          <CustomInputLabel htmlFor="amount">Status*</CustomInputLabel>
          <CustomRadioGroup value={selectedValue} onChange={handleRadioChange}>
            <CustomFormControlLabel
              value='true'
              control={<Radio color="secondary" checkedIcon={<CheckCircleIcon />} />}
              {...register('paid_out')}
              label={
                <Typography component="span" variant="body7">
                  Cobrança Paga
                </Typography>
              }
            />
            <CustomFormControlLabel
              value='false'
              {...register('paid_out')}
              control={<Radio color="secondary" checkedIcon={<CheckCircleIcon />} />}
              label={
                <Typography component="span" variant="body7">
                  Cobrança Pendente
                </Typography>
              }
            />
          </CustomRadioGroup>
        </Grid>

        <Grid item xs={12} sm={6}>
          <DefaultButton
            onClick={() => handleClose()}
            variant="contained"
            color="grey"
            cancel="true"
          >
            Cancelar
          </DefaultButton>
        </Grid>

        <Grid item xs={12} sm={6}>
          <DefaultButton type="submit" variant="contained">
            Aplicar
          </DefaultButton>
        </Grid>
      </Grid>
    </FormContainer>
  )
}
