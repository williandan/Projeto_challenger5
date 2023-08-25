import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { mask, unMask } from 'remask'
import ClientsIcon from '../../assets/asideBar/clientsIcon.svg'
import CloseModal from '../../assets/closeModal.svg'
import useToast from '../../hooks/useToast'
import { schemaClient } from '../../schemas/schemas'
import api from '../../services/api'
import viaCep from '../../services/viaCep'
import {
  CustomBoxCloseModal,
  CustomBoxFormHeader,
  DefaultButton,
  FormContainer
} from '../../styles/styles'
import { getItem } from '../../utils/storage'
import DefaultTextField from '../defaultTextField'

export default function ClientForm({ open, handleClose, id, openClient, refreshPage, text }) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaClient),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      address: '',
      complement: '',
      zip_code: '',
      district: '',
      city: '',
      uf: ''
    }
  })

  const { toastfy } = useToast()

  async function onSubmit({
    name,
    email,
    cpf,
    phone,
    address,
    complement,
    zip_code,
    district,
    city,
    uf
  }) {
    try {
      const token = getItem('token')

      const data = {
        name,
        email,
        cpf: unMask(cpf),
        phone: unMask(phone),
        address: unMask(address) ? address : undefined,
        complement: unMask(complement) ? complement : undefined,
        zip_code: unMask(zip_code) ? unMask(zip_code) : undefined,
        district: unMask(district) ? district : undefined,
        city: unMask(city) ? city : undefined,
        uf: unMask(uf) ? uf : undefined
      }

      text === 'Editar'
        ? await api.put(`/client/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        : await api.post('/client', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

      handleClose(!open)
      refreshPage()

      toastfy({
        type: 'success',
        message:
          text === 'Editar' ? 'Cliente alterado com sucesso' : 'Cadastro concluído com sucesso'
      })
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

  useEffect(() => {
    if (text === 'Editar') {
      setValue('name', openClient.name)
      setValue('email', openClient.email)
      setValue('cpf', openClient.cpf)
      setValue('phone', openClient.phone)
      setValue('address', openClient.address ? openClient.address : '-')
      setValue('complement', openClient.complement ? openClient.complement : '-')
      setValue('zip_code', openClient.zip_code ? openClient.zip_code : '-')
      setValue('district', openClient.district ? openClient.district : '-')
      setValue('city', openClient.city ? openClient.city : '-')
      setValue('uf', openClient.uf ? openClient.uf : '-')
    }
  }, [])

  async function handleOnChange(e) {
    let nowMask

    if (e.target.id === 'cpf') {
      nowMask = ['999.999.999-99']
    } else if (e.target.id === 'phone') {
      nowMask = ['(99) 9 9999-9999']
    } else if (e.target.id === 'zip_code') {
      nowMask = ['99999-999']

      if (unMask(e.target.value).length === 8) {
        try {
          const response = await viaCep.get(`${unMask(e.target.value)}/json`)

          response.data.erro &&
            setError(
              'zip_code',
              {
                type: 'manual',
                message: 'Confira o Cep'
              },
              {
                shouldFocus: true
              }
            )

          response.data.complemento && setValue('complement', response.data.complemento)
          response.data.bairro && setValue('district', response.data.bairro)
          response.data.localidade && setValue('city', response.data.localidade)
          response.data.logradouro && setValue('address', response.data.logradouro)
          response.data.uf && setValue('uf', response.data.uf)
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      nowMask = ['SS']
    }

    setValue(e.target.id, mask(unMask(e.target.value), nowMask))
  }

  return (
    <FormContainer
      maxWidth="sm"
      component="form"
      sx={{ alignItems: 'flex-start' }}
      onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
    >
      <CustomBoxCloseModal>
        <img src={CloseModal} alt="close-modal" onClick={() => handleClose(!open)} />
      </CustomBoxCloseModal>

      <CustomBoxFormHeader>
        <img src={ClientsIcon} alt="clients-icon" />
        <Typography component="h3" variant="title2">
          {text} Cliente
        </Typography>
      </CustomBoxFormHeader>

      <Grid container spacing={2}>
        <DefaultTextField
          text="Nome*"
          inputName="name"
          placeHolderText="nome"
          register={register}
          errors={errors}
        />
        <DefaultTextField
          text="E-mail*"
          inputName="email"
          placeHolderText="e-mail"
          register={register}
          errors={errors}
        />
        <DefaultTextField
          text="CPF*"
          inputName="cpf"
          placeHolderText="CPF"
          register={register}
          errors={errors}
          mask={handleOnChange}
          middle={6}
        />
        <DefaultTextField
          text="Telefone*"
          inputName="phone"
          placeHolderText="Telefone"
          register={register}
          errors={errors}
          mask={handleOnChange}
          middle={6}
        />
        <DefaultTextField
          text="Endereço"
          inputName="address"
          placeHolderText="endereço"
          register={register}
          errors={errors}
        />
        <DefaultTextField
          text="Complemento"
          inputName="complement"
          placeHolderText="complemento"
          register={register}
          errors={errors}
        />
        <DefaultTextField
          text="CEP"
          inputName="zip_code"
          placeHolderText="CEP"
          register={register}
          errors={errors}
          mask={handleOnChange}
          middle={6}
        />
        <DefaultTextField
          text="Bairro"
          inputName="district"
          placeHolderText="bairro"
          register={register}
          errors={errors}
          middle={6}
        />
        <DefaultTextField
          text="Cidade"
          inputName="city"
          placeHolderText="cidade"
          register={register}
          errors={errors}
          middle={8}
          feminine='true'
        />
        <DefaultTextField
          text="UF"
          inputName="uf"
          placeHolderText="UF"
          register={register}
          errors={errors}
          middle={4}
          feminine='true'
        />
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
