import Login from './components/Login/Login'
import News from './components/News/News'
import NoMatch from './components/NoMatch/NoMatch';
import User from './components/User/User';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { UserProvider } from './context/userContext';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { NotificationsContextProvider } from './context/notifications';
import { Notification } from './components/Notofication/Notification.jsx';
import UserDetails from './components/UserDetails/UserDetails';


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
    <NotificationsContextProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
        <div className="App" style={{backgroundColor: theme.palette.secondary.dark, minHeight: '100vh'}}>
          <Router>
          <Header/>
            <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path='/user' element={<User/>}/>
              <Route path='/news' element={<News/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path="/userDetails/:user" element={<UserDetails/>}/>
              <Route path='*' element={<NoMatch/>}/>
            </Routes>
          </Router>
          <Notification/>
        </div>
        </UserProvider>
      </ThemeProvider>
    </NotificationsContextProvider>
  );
}

export default App;
