import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import './index.css'

const theme = createTheme({
  palette:{
    primary:{
      main: "#a62639",
      light: "#db324d",
      dark: "#511c29"
    },
    secondary:{
      main: "#56494e",
      light: "#a29c9b"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        Project Setup
      </div>
    </ThemeProvider>
  );
}

export default App;
