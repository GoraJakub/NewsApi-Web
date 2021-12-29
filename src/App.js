import Login from './components/Login/Login'
import News from './components/News/News'
import NoMatch from './components/NoMatch/NoMatch';
import User from './components/User/User';
import Main from './components/Main/Main'
import { createTheme, ThemeProvider} from '@mui/material/styles';
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { UserProvider } from './context/userContext';

const theme = createTheme({
  palette:{
    primary:{
      main: "#a62639",
      light: "#db324d",
      dark: "#511c29"
    },
    secondary:{
      main: "#56494e",
      light: "#a29c9b",
      dark: "#333",
    }
  }
})

function App() {
 

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<Main/>}/>
            <Route path='/user' element={<User/>}/>
            <Route path='/news' element={<News/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='*' element={<NoMatch/>}/>
          </Routes>
        </Router>
      </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
