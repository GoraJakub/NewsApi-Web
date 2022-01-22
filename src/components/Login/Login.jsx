import { Button, TextField, Grid, Grow, Container, Typography} from "@mui/material"
import { ThemeContext } from "@mui/styled-engine"
import { Box } from "@mui/system"
import { useContext, useState } from "react"
import { Navigate } from "react-router"
import { useUser, useUserUpdate } from "../../context/userContext"
import { fetchData } from "../../helpers/fetchData"



const Login = ()=>{
    const {palette} = useContext(ThemeContext)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const updateUser = useUserUpdate()
    const user = useUser()

    const updateLogin = (e) =>{
        setLogin(e.target.value)
    }

    const updatePassword = (e) =>{
        setPassword(e.target.value)
    }

    const getUserData = async () => {
        try {
            const {logged} = await fetchData('http://localhost:8088/auth/login','POST',{
                login: login,
                password: password
            })
            updateUser(login,logged)
            console.log(user)
        }catch(e) {
            console.log(e)
        }
    }

    

    return (
        <>
        {user.isLogged ? <Navigate to='/news'/> : ''}
        <Container sx={{display: 'flex',height: '50vh', alignItems: 'center', justifyContent: 'center'}}>
            <Grow in={true}>
                <Box sx={{background: palette.secondary.light, p: 2, maxWidth: 'sm', margin: '0 auto', borderRadius: 1}}>
                    <Grid container sx={{alignItems: 'center', justifyContent: 'center'}} spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" sx={{fontSize: '35px'}} component="h1">
                                Login to ZPSB NEWS
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField style={{width: '100%'}} id='login' label='Login' variant='outlined' onChange={updateLogin}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField style={{width: '100%'}} id='password' label='Password' type="password" variant='outlined' onChange={updatePassword}/>
                        </Grid>
                        <Grid item xs={12} container sx={{ justifyContent: 'center'}}>
                            <Button variant='contained' onClick={getUserData}>Login</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grow>
        </Container>
        </>
    )
}

export default Login