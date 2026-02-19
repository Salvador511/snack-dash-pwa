import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import '@fontsource-variable/fredoka'
import '@fontsource/ubuntu'
import colors from './colors'

const theme = createTheme({
  typography: {
    fontFamily: 'Ubuntu',
    h1: {
      fontFamily: 'Fredoka Variable',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Fredoka Variable',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Fredoka Variable',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Fredoka Variable',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Fredoka Variable',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'Fredoka Variable',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.825rem',
    },
  },
  palette: {
    ...colors as any,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          paddingBlock: '2rem',
          paddingInline: '1rem',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '16px',
        },
        body: {
          backgroundColor: colors.background.main,
        }
      },
    },
  },
})

export default responsiveFontSizes(theme)