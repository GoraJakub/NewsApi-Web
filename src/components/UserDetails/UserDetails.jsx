import { Card, CardContent, Typography, Container, LinearProgress, CardHeader, Tooltip, Avatar, Stack, Paper } from "@mui/material"
import { ThemeContext } from "@mui/styled-engine"
import { Box, styled} from "@mui/system"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchData } from "../../helpers/fetchData"
import useNotification from "../../hooks/useNotification"
import { staticGlobal } from "../../static/staticGlobal"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const UserDetails = () => {
    const {palette} = useContext(ThemeContext)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const {user} = useParams()

    const { openNotification } = useNotification()


    useEffect(()=>{
        const getUserData = async () => {
            try {
                const data = await fetchData(`${staticGlobal.API_LINK}/userDetails/${user}`,'GET')
                setUserData(data)
                setLoading(false)
            }catch(e) {
                setLoading(false)
                openNotification(e.message,'error')
            }
        }
        getUserData()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box container sx={{width: '100%'}}>
            {loading ?
             <LinearProgress/> : 

             <>
                <Typography variant="h1" sx={{fontSize: '35px', p: 2,color: 'white'}} component="h1">
                    {userData.name} details
                </Typography>
                <Container sx={{display: 'flex',minHeight: '100vh', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                    <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Tooltip title={userData.name}>
                                <Avatar sx={{ bgcolor: palette.primary.light }} aria-label="recipe">
                                {userData.name.split('')[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        } 
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            User data of {userData.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        <Stack spacing={2}>
                            <Item>Name: {userData.name}</Item>
                            <Item>Surname: {userData.surname}</Item>
                        </Stack>
                        </Typography>
                        </CardContent>
                    </Card>
                </Container>
            </>
            }
        </Box>
    )
}

export default UserDetails