import Login from './components/Login/Login'
import News from './components/News/News'
import NoMatch from './components/NoMatch/NoMatch';
import User from './components/User';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

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
        <Router>
          <Routes>
            <Route path='/user' element={<User/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/news' element={<News/>}/>
            <Route path='*' element={<NoMatch/>}/>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
