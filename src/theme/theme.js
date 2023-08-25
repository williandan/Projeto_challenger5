import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#DA0175',
      light: '#F5A8D0',
      dark: '#75003B'
    },
    secondary: {
      main: '#0E8750',
      light: '#ACD9C5',
      dark: '#034A2A'
    },
    warning: {
      main: '#EF8F00',
      light: '#F5D9B0',
      dark: '#CC7800'
    },
    info: {
      main: '#5482F6',
      light: '#C3D4FE',
      dark: '#243F80'
    },
    grey: {
      100: '#F8F8F9',
      200: '#F0F0F5',
      300: '#DEDEE9',
      400: '#C8C8D7',
      500: '#9B9BB2',
      600: '#747488',
      700: '#3F3F55',
      800: '#343447',
      900: '#344054',
      1000: 'rgba(145, 154, 150, 0.3)',
      1100: '#667085',
      1200: '#D0D5DD'
    },
    background: {
      payed: '#EEF6F6',
      overdue: '#FFEFEF',
      planned: '#FCF6DC',
      payedAmount: '#1FA7AF',
      overdueAmount: '#971D1D',
      plannedAmount: '#C5A605'
    }
  },
  typography: {
    title1: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: '1.95rem'
    },
    title2: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: '1.95rem'
    },
    title3: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: '1.5rem'
    },
    title4: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '1.625rem',
      lineHeight: '2.125rem'
    },
    title5: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: '1.3125rem'
    },
    title6: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '1.625rem',
      lineHeight: '2.125rem'
    },
    title7: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: '1.5rem'
    },
    subtitle: {
      fontFamily: 'Nunito',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '1.375rem'
    },
    body1: {
      fontFamily: 'Nunito',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: '1.5rem'
    },
    body2: {
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: '1.5rem'
    },
    body3: {
      fontFamily: 'Nunito',
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: '1.25rem'
    },
    body4: {
      fontFamily: 'Nunito',
      fontWeight: 600,
      fontSize: '1.375rem',
      lineHeight: '1.875rem'
    },
    body5: {
      fontFamily: 'Nunito',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: '3.125rem'
    },
    body6: {
      fontFamily: 'Nunito',
      fontWeight: 600,
      fontSize: '0.5rem',
      lineHeight: '0.6875rem'
    },
    body7: {
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.5rem'
    },
    body8: {
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: '2.5rem'
    },
    button: {
      textTransform: 'none'
    }
  }
})
