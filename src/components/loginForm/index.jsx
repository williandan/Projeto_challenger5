import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { schemaLogin } from '../../schemas/schemas'
import api from '../../services/api'
import { DefaultButton, CustomFormContainer } from '../../styles/styles'
import { setItem } from '../../utils/storage'
import DefaultTextField from '../defaultTextField'

export default function LoginForm({ text, loginormodal }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaLogin)
  })
  const navigate = useNavigate()
  const location = useLocation()

  async function onSubmit({ email, password }) {
    try {
      const response = await api.post('/login', {
        email,
        password
      })

      const { token } = response.data
      setItem('token', token)

      navigate('/home')
      window.location.reload()
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
  return (
    <CustomFormContainer
      loginormodal={loginormodal}
      disableGutters
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {text && <Typography variant="body5">Seu Login expirou!</Typography>}

      <Typography variant="title2">Faça seu login{text && ' Novamente'}!</Typography>

      <Grid container spacing={2}>
        <DefaultTextField
          text="E-mail*"
          inputName="email"
          placeHolderText="E-mail"
          register={register}
          errors={errors}
        />

        <DefaultTextField
          text="Senha*"
          inputName="password"
          placeHolderText="senha"
          register={register}
          errors={errors}
          passwordInput="true"
          feminine='true'
        />
      </Grid>

      <DefaultButton type="submit" variant="contained" halfwidth>
        Entrar
      </DefaultButton>

      {!text && (
        <Typography variant="body2" color="grey.700" align='center'>
          Ainda não possui uma conta? <Link to="/">Cadastre-se</Link>
        </Typography>
      )}
    </CustomFormContainer>
  )
}
