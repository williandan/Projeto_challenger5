import { ThemeProvider } from '@mui/material'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import ClientsPage from './pages/Clients'
import ClientPage from './pages/UnicClient'
import HomePage from './pages/Home'
import LogInPage from './pages/LogIn'
import RegisterPage from './pages/Register'
import RecordsPage from './pages/Records'
import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './theme/theme'
import { getItem } from './utils/storage'
import { ToastContainer } from 'react-toastify'

function ProtectedRoutes({ redirectTo }) {
  const isAuth = getItem('token')

  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function MainRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route element={<ProtectedRoutes redirectTo="/login" />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/client" element={<ClientsPage />} />
          <Route path="/client/:id" element={<ClientPage />} />
          <Route path="/records" element={<RecordsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
      <ToastContainer style={{ width: '354px' }} />
    </ThemeProvider>
  )
}
