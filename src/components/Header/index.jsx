import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ArrowDownIcon from '../../assets/home/header/arrowDownIcon.svg'
import EditModalIcon from '../../assets/home/header/editModalIcon.svg'
import OutIcon from '../../assets/home/header/outIcon.svg'
import useWindowSize from '../../hooks/useWindowSize'
import api from '../../services/api'
import { getItem, logOut } from '../../utils/storage'
import Modal from '../modal'
import UserForm from '../userForm'
import {
  CustomAvatar,
  CustomBoxHeader,
  CustomBoxHeaderText,
  CustomBoxHeaderUser,
  CustomBoxHeaderUserModal,
  CustomBoxMenu,
  CustomBoxMenuEdit,
  CustomBoxMenuRemov,
  CustomTypographyCenter
} from './styles'

export default function Header({ text, openClient }) {
  const navigate = useNavigate()
  const [menu, setMenu] = useState(false)
  const [openUserModal, setOpenUserModal] = useState(false)
  const location = useLocation()

  const [userData, setUserData] = useState('')
  const [avatar, setAvatar] = useState(['a'])

  const windowSize = useWindowSize()

  function navigation() {
    navigate(`/${location.pathname.split("/")[1]}`)
    window.location.reload();
  }


  async function getUser() {
    const token = getItem('token')

    try {
      const response = await api.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUserData(response.data)
      setAvatar(response.data.name.trim().split(' '))
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'unset'
    if (openUserModal) {
      document.body.style.overflow = 'hidden'
    }
  }, [openUserModal])

  const formatedAvatar =
    avatar.length > 1
      ? `${avatar[0][0] ? avatar[0][0].toUpperCase() : ''}${avatar[1][0] ? avatar[1][0].toUpperCase() : ''
      }`
      : `${avatar[0][0].toUpperCase()}`

  const formatedUserData =
    avatar.length > 1
      ? `${avatar[0][0] ? avatar[0][0].toUpperCase() : ''}${avatar[0].slice(1)} ${avatar[1][0] ? avatar[1][0].toUpperCase() : ''
      }${avatar[1].slice(1)}`
      : `${avatar[0][0] ? avatar[0][0].toUpperCase() : ''}${avatar[0].slice(1)}`

  return (
    <>
      <CustomBoxHeader propwidth={windowSize.width}>
        <CustomBoxHeaderText>
          {text && (
            <Typography
              onClick={() => navigation()}
              variant="title4"
              sx={{ fontWeight: '600' }}
              color={text !== 'Resumo de Cobranças' ? 'secondary' : 'grey.800'}
            >
              {text}
            </Typography>
          )}

          {openClient && (
            <>
              <Typography color="grey.600">{`>`}</Typography>
              <CustomTypographyCenter color="grey.600">Detalhes do cliente</CustomTypographyCenter>
            </>
          )}
        </CustomBoxHeaderText>

        <CustomBoxHeaderUser>
          <CustomAvatar>
            <Typography component="h4" variant="body4" color="secondary">
              {formatedAvatar}
            </Typography>
          </CustomAvatar>

          <Typography component="h4" variant="body1" color="secondary">
            {formatedUserData}
          </Typography>

          <CustomBoxHeaderUserModal>
            <img
              src={ArrowDownIcon}
              onClick={() => {
                setMenu(!menu)
              }}
            />
            {menu && (
              <CustomBoxMenu propwidth={windowSize.width}>
                <CustomBoxMenuEdit
                  onClick={() => {
                    setOpenUserModal(!openUserModal)
                  }}
                >
                  <img src={EditModalIcon} />
                  <Typography variant="body6">Editar</Typography>
                </CustomBoxMenuEdit>

                <CustomBoxMenuRemov
                  onClick={() => {
                    logOut()
                    navigate('/login')
                  }}
                >
                  <img src={OutIcon} />
                  <Typography variant="body6">Sair</Typography>
                </CustomBoxMenuRemov>
              </CustomBoxMenu>
            )}
          </CustomBoxHeaderUserModal>
        </CustomBoxHeaderUser>

        <Modal open={openUserModal}>
          <UserForm
            open={openUserModal}
            handleClose={setOpenUserModal}
            userData={userData}
            setUserData={setUserData}
            getUser={getUser}
            setAvatar={setAvatar}
          />
        </Modal>
      </CustomBoxHeader>
    </>
  )
}
