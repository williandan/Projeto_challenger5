import { Box, Button, styled, Typography } from '@mui/material'

export const CustomBoxClientHeader = styled(Box)`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  margin-top: 24px;

  @media screen and (max-width: 675px) {
      justify-content: center;
    }
`
export const CustomBoxClientData = styled(Box)`
  width: 90%;
  margin-bottom: 24px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`

export const CustomBoxClientDataTitleENotImportant = styled(Box)`
  width: 90%;
  display: flex;
  justify-content: ${(props) => (props.propwidth < 675 ? 'center' : 'space-between')};
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding-top: 30px;
  padding-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
`

export const CustomButtomEditClient = styled(Button)`
  width: 100%;
  max-width: 246px;
  font-family: 'Nunito';
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  text-transform: none;
`

export const CustomBoxClientDataImportant = styled(Box)`
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: ${(props) => (props.propwidth > 1000 ? '55%' : '90%')};
  flex-direction: ${(props) => (props.propwidth > 600 ? 'row' : 'column')};
  gap: 24px;
`

export const CustomBoxWidth = styled(Box)`
  width: 90%;
`

export const CustomBoxData = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const CustomTypography = styled(Typography)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
