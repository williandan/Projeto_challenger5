import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import DefaultTextField from '../../components/defaultTextField'
import LoginAndUserSuccess from '../../components/login&userSuccess'
import { schemaRegister } from '../../schemas/schemas'
import api from '../../services/api'
import { CustomContainer, CustomFormContainer, DefaultButton } from '../../styles/styles'
import RegisterSteps from './components/RegisterSteps'
import { CustomBoxCenterRegister, CustomBoxStepper, FooterBox, ProgressBar } from './styles'

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError
  } = useForm({
    resolver: yupResolver(schemaRegister)
  })

  async function onSubmit({ name, email, password }) {
    try {
      await api.post('/register', {
        name,
        email,
        password
      })

      setCurrentStep(3)
      setInterval(() => navigate('/login'), 1500)
    } catch (error) {
      setCurrentStep(1)

      if (error.response.data?.error.email) {
        setError(
          'email',
          {
            type: 'manual',
            message: error.response.data?.error.email
          },
          {
            shouldFocus: true
          }
        )
      }
    }
  }

  function handleError(error) {
    if (currentStep === 1) {
      if (!error.email && !error.name) {
        setCurrentStep(2)
        clearErrors()
      }
    }
  }

  return (
    <CustomContainer maxWidth={false} disableGutters>
      <CustomBoxStepper>
        <RegisterSteps currentStep={currentStep} />
      </CustomBoxStepper>

      <CustomBoxCenterRegister>
        <CustomFormContainer
          maxWidth="xs"
          disableGutters
          component="form"
          onSubmit={handleSubmit(onSubmit, handleError)}
        >
          {currentStep !== 3 && (
            <Typography variant="title2">
              {currentStep === 1 ? 'Adicione seus dados' : 'Escolha uma senha'}
            </Typography>
          )}

          {currentStep === 1 && (
            <>
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
              </Grid>

              <DefaultButton type="submit" variant="contained" halfwidth>
                Continuar
              </DefaultButton>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Grid container spacing={2}>
                <DefaultTextField
                  text="Senha*"
                  inputName="password"
                  placeHolderText="senha"
                  register={register}
                  errors={errors}
                  passwordInput="true"
                  feminine='true'
                />

                <DefaultTextField
                  text="Repita a Senha*"
                  inputName="confirmPassword"
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
            </>
          )}

          {currentStep === 3 && <LoginAndUserSuccess text="Cadastro Realizado com sucesso!" />}

          {currentStep !== 3 && (
            <Typography variant="body2" color="grey.700" align='center'>
              Já possui uma conta? Faça seu{' '}
              <Link to="/login" color="primary">
                Login
              </Link>
            </Typography>
          )}
        </CustomFormContainer>

        <FooterBox>
          <ProgressBar bgc={currentStep === 1 ? 'green' : undefined} />
          <ProgressBar bgc={currentStep === 2 ? 'green' : undefined} />
          <ProgressBar bgc={currentStep === 3 ? 'green' : undefined} />
        </FooterBox>
      </CustomBoxCenterRegister>
    </CustomContainer>
  )
}
