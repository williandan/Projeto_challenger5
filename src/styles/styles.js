import {
  Box,
  Button,
  Container,
  FormControlLabel,
  InputLabel,
  Paper,
  RadioGroup,
  styled,
  TableContainer,
  TextField
} from '@mui/material'
import { css } from '@mui/styled-engine'

export const FormContainer = styled(Container)`
  ${({ theme }) => css`
    margin: auto 20px;
    padding: 40px 56px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: relative;

    background-color: ${theme.palette.common.white};
    border-radius: 30px;

    @media screen and (max-width: 500px) {
      padding: 20px 10px;
    }
  `}
`

export const CustomBoxCloseModal = styled(Box)`
  position: absolute;
  top: 24px;
  right: 25px;
`

export const DivHome = styled(Box)`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    min-height: 100vh;
    background: #f8f8f9;
    box-sizing: border-box;
    position: relative;
  `}
`

export const DivLeft = styled(Box)`
  display: flex;
  width: 10%;
  min-height: 100%;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: flex-end;

    position: fixed;
    bottom: 0;
    min-height: 0;
    max-height: 10%;
    width: 100%;
    padding: 0;
    z-index: 3;
  }
`

export const DivRight = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
    margin-bottom: 100px;
  }
`

export const BoxHeader = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const CustomBox = styled(Box)`
  display: flex;
  justify-content: ${(props) => (props.propwidth < 675 ? 'center' : 'space-between')};
  justify-items: center;
  align-items: center;
  width: 90%;
  height: 100px;
`

export const CustomBoxLeft = styled(Box)`
  display: ${(props) => (props.propwidth < 675 ? 'none' : 'flex')};
  align-items: center;
  height: 100%;
  gap: 10px;
`

export const MainContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
`

export const CustomBoxTable = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 100%;
  background: #ffffff;
  border-radius: 30px;
  margin-bottom: ${({ marbot }) => (marbot ? '45px' : '24px')};
  flex-direction: ${({ flebox }) => (flebox ? 'column' : 'row')};
`

export const CustomInputLabel = styled(InputLabel)`
  ${({ theme }) => css`
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: ${theme.palette.grey[900]};
  `}
`

export const CustomTextField = styled(TextField)`
  ${({ theme }) => css`
    & input::placeholder {
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.5rem;
      color: ${theme.palette.grey[1100]};
    }
  `}
`

export const DefaultButton = styled(Button)`
  font-family: 'Nunito';
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.5rem;
  border-radius: 10px;
  width: ${({ halfwidth }) => (halfwidth ? '50%' : '100%')};
  color: ${({ cancel }) => (cancel ? '#0E8750' : '#F8F8F9')};
`

export const CustomButton = styled(Button)`
  width: ${({ mxwi }) => (mxwi ? '200px' : '50%')};
  border-radius: 10px;
  text-transform: none;
  font-family: 'Nunito';
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 400;
`

export const CustomBoxFormHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  max-width: calc(100% - 55px);
`

export const CustomFormControlLabel = styled(FormControlLabel)`
  ${({ theme }) => css`
    margin: 0;
    height: 48px;
    border-radius: 10px;
    background-color: ${theme.palette.grey[200]};
  `}
`

export const CustomRadioGroup = styled(RadioGroup)`
  gap: 8px;
`

export const CustomTableContainer = styled(TableContainer)`
  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 20px;
    border: 3px solid white;
  }
  &::-webkit-scrollbar {
    width: 1px;
  }
`

export const CustomContainer = styled(Container)`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const CustomFormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 0 ${({ loginormodal }) => (loginormodal ? '0px' : '30px')};
  max-width: 500px !important;
`

export const PaperStatus = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
`
