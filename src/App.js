import Login from './components/Login/Login'
import News from './components/News/News'
import NoMatch from './components/NoMatch/NoMatch';
import User from './components/User/User';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { UserProvider, useUser } from './context/userContext';
import Header from './components/Header/Header';


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
 const {isLogged} = useUser()
console.log(isLogged)
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
      <div className="App">
        <Router>
        <Header/>
          <Routes>
            <Route path="/" element={
              isLogged ? <Navigate to="/news"/> : <Navigate to="/login"/>
            }/>
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
