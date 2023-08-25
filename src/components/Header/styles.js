import { Avatar, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import { css } from '@mui/styled-engine'

export const CustomBoxHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => (props.propwidth > 675 ? 'row' : 'column-reverse')};
  padding: ${(props) => (props.propwidth > 675 ? '54px' : '20px')}
    ${(props) => (props.propwidth > 675 ? '70px' : '0')} 20px 0;
  border-bottom: 1px solid #acd9c5;
  max-width: 96%;
  min-width: 96%;
  h1: {
    word-break: break-word;
  }
  gap: 16px;
`

export const CustomBoxHeaderText = styled(Box)`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 20px;
`

export const CustomBoxHeaderUser = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  max-width: 100%;
`

export const CustomAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
`

export const CustomBoxHeaderUserModal = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 51px;
  position: relative;
`

export const CustomBoxMenu = styled(Box)`
  width: ${(props) => (props.propwidth > 675 ? '92px' : '45px')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.propwidth > 675 ? '16px' : '0px')};
  position: absolute;
  top: 40px;
  left: ${(props) => (props.propwidth > 675 ? '0' : 'none')};
  border-radius: 10px;
  color: #747488;
  background-color: #ffffff;
  flex-direction: ${(props) => (props.propwidth > 675 ? 'row' : 'column')};
`

export const CustomBoxMenuEdit = styled(Box)`
  height: 51px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5px;
  cursor: pointer;
`

export const CustomBoxMenuRemov = styled(Box)`
  height: 51px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`

export const CustomTypographyCenter = styled(Typography)`
  text-align: center !important;
`
