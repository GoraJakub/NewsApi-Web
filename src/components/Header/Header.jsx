import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { useUser, useUserUpdate } from '../../context/userContext';
import  { Link }  from 'react-router-dom';
import { ThemeContext } from '@mui/styled-engine';
import './header.css'


const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {login,isLogged} = useUser()
  const {palette} = useContext(ThemeContext)
  const updateUser = useUserUpdate()

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (callback) => {
    setAnchorElUser(null);
    console.log(callback)
    if (callback && typeof callback === 'function') callback()
  };

  const logout = () => {
    updateUser('',false)
  }
  
  const pages = [{name: 'Home', link: '/'}, {name: 'News', link: '/news'}, {name: 'Top Users', link: 'topusers'}];
  const settings = [{name: 'Profile', link: `/userDetails/${login}`},{name: 'Logout', cb: logout}];


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  

  return (
    <AppBar position="static" sx={{background: palette.primary.light }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            ZPSB NEWS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link key={page.name} to={page.link} className="link">
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h2"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontSize: '35px' }}
          >
            ZPSB NEWS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.link} className="link">
                {page.name}
                </Link>
              </Button>
            ))}
          </Box>
            {isLogged ?
                <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Profile options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="A" src="/static/images/avatar/2.jpg" />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting,index) => (
                  <Link to={setting?.link ? setting.link : ''} key={index} className="link"> 
                    <MenuItem key={setting.name} onClick={() => {handleCloseUserMenu(setting.cb);}}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  </Link>
                )
                )}
                </Menu>
            </Box>
            :
            <Button variant="contained">
                <Link to="/login" style={{textDecoration: 'none', color: 'white'}}>Log In</Link>
            </Button>
            }
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;