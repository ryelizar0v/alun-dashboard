import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#006daa',
    },
    secondary: {
      main: '#f3a658',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: "DM Sans",
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "1.5rem",
        textTransform: "none"
      }
    },
    MuiDrawer: {
      paperAnchorDockedRight: {
        borderLeft: "none"
      }
    }
  }
})

export default theme