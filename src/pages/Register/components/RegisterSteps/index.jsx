import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FaDotCircle } from 'react-icons/fa'
import { RiRecordCircleLine } from 'react-icons/ri'

const steps = [
  {
    text: 'Por favor, escreva seu nome e e-mail',
    title: 'Cadastre-se',
    number: 1
  },
  {
    text: 'Escolha uma senha segura',
    title: 'Escolha uma senha',
    number: 2
  },
  {
    text: 'E-mail e senha cadastrados com sucesso',
    title: 'Cadastro realizado com sucesso',
    number: 3
  }
]

const Svg = () => (
  <svg
    style={{ marginLeft: '13px' }}
    width="3"
    height="41"
    viewBox="0 0 3 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="1.5" y1="0.5" x2="1.5" y2="40.5" stroke="secondary" strokeWidth="3" />
  </svg>
)

export default function RegisterSteps({ currentStep }) {
  return (
    <Stepper connector={<Svg />} activeStep={currentStep} orientation="vertical">
      {steps.map((label) => (
        <Step key={label.number}>
          <StepLabel
            sx={{
              color: 'secondary.main',
              svg: {
                width: `${label.number > currentStep ? '32px' : '28px'}`,
                height: `${label.number > currentStep ? '32px' : '28px'}`
              }
            }}
            StepIconComponent={
              currentStep === 3
                ? AiFillCheckCircle
                : label.number === currentStep
                ? FaDotCircle
                : label.number > currentStep
                ? RiRecordCircleLine
                : AiFillCheckCircle
            }
          >
            {
              <>
                <Typography color="secondary" variant="title3">
                  {label.title}
                </Typography>
                <Typography color="grey.700" variant="body1">
                  {label.text}
                </Typography>
              </>
            }
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
