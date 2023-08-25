import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { mask, unMask } from 'remask'
import CloseModal from '../../assets/closeModal.svg'
import { schemaUpdateUser } from '../../schemas/schemas'
import api from '../../services/api'
import { CustomBoxCloseModal, DefaultButton, FormContainer } from '../../styles/styles'
import { getItem } from '../../utils/storage'
import DefaultTextField from '../defaultTextField'
import LoginAndUserSuccess from '../login&userSuccess'

export default function UserForm({ open, handleClose, userData, setUserData, getUser, setAvatar }) {
  const [modalSuccess, setModalSuccess] = useState(false)
  const location = useLocation()

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaUpdateUser),
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  async function onSubmit({ name, email, password, newPassword, cpf, phone }) {
    try {
      const token = getItem('token')

      const data = {
        name: name.trim(),
        email,
        cpf: unMask(cpf) || undefined,
        phone: unMask(phone) || undefined,
        password: password,
        newPassword: newPassword || undefined
      }

      await api.put('/profile', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setAvatar(data.name.trim().split(' '))
      setUserData(data)
      setModalSuccess(true)

      setTimeout(() => {
        handleClose()
      }, 2000)

      getUser()
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
    setValue('name', userData.name)
    setValue('email', userData.email)
    setValue('cpf', userData.cpf)
    setValue('phone', userData.phone)
  }, [])

  function handleOnChange(e) {
    const nowMask = e.target.id === 'phone' ? ['(99) 9 9999-9999'] : ['999.999.999-99']
    setValue(e.target.id, mask(unMask(e.target.value), nowMask))
  }

  return (
    <>
      {modalSuccess ? (
        <LoginAndUserSuccess text="Cadastro Atualizado com sucesso!" />
      ) : (
        <FormContainer
          maxWidth="xs"
          component="form"
          onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
        >
          <CustomBoxCloseModal>
            <img
              src={CloseModal}
              alt="close-modal"
              onClick={() => {
                handleClose(!open)
              }}
            />
          </CustomBoxCloseModal>

          <Box sx={{ width: '100%' }}>
            <Typography sx={{ maxWidth: 'calc(100% - 55px)', width: '100%' }} component="h3" variant="title2">
              Edite seu cadastro
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <DefaultTextField
              text='Nome*'
              inputName='name'
              placeHolderText='nome'
              register={register}
              errors={errors}
            />
            <DefaultTextField
              text='E-mail*'
              inputName='email'
              placeHolderText='e-mail'
              register={register}
              errors={errors}
            />
            <DefaultTextField
              text='CPF'
              inputName='cpf'
              placeHolderText='CPF'
              register={register}
              errors={errors}
              mask={handleOnChange}
              middle={6}
            />
            <DefaultTextField
              text='Telefone'
              inputName='phone'
              placeHolderText='Telefone'
              register={register}
              errors={errors}
              mask={handleOnChange}
              middle={6}
            />
            <DefaultTextField
              text='Confirme sua senha*'
              inputName='password'
              placeHolderText='senha'
              register={register}
              errors={errors}
              passwordInput='true'
              feminine='true'
            />
            <DefaultTextField
              text='Nova Senha (opcional para trocar a senha)'
              inputName='newPassword'
              placeHolderText='senha'
              register={register}
              errors={errors}
              passwordInput='true'
              feminine='true'
            />
            <DefaultTextField
              text='Confirmar Nova Senha'
              inputName='confirmPassword'
              placeHolderText='senha'
              register={register}
              errors={errors}
              passwordInput='true'
              feminine='true'
            />
          </Grid>
          <DefaultButton type="submit" variant="contained" halfwidth="true">
            Continuar
          </DefaultButton>
        </FormContainer>
      )}
    </>
  )
}
