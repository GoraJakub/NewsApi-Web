import { Button, TextField, Grid} from "@mui/material"
import { ThemeContext } from "@mui/styled-engine"
import { Box } from "@mui/system"
import { useContext, useState } from "react"
import { useUserUpdate } from "../../context/userContext"
import { fetchData } from "../../helpers/fetchData"



const Login = ()=>{
    const {palette} = useContext(ThemeContext)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const updateUser = useUserUpdate()

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
        }catch(e) {
            console.log(e)
        }
    }

    

    return (
        <Box sx={{background: palette.secondary.light, p: 2, maxWidth: 'sm', margin: '0 auto', borderRadius: 1}}>
            <Grid container sx={{alignItems: 'center'}} spacing={2}>
                <Grid item xs={12}>
                    <TextField id='login' label='Login' variant='outlined' onChange={updateLogin}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id='password' label='Password' type="password" variant='outlined' onChange={updatePassword}/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' onClick={getUserData}>Login</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login