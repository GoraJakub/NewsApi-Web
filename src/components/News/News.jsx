import { Container, LinearProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { Navigate } from "react-router"
import { useUser } from "../../context/userContext"
import { fetchData } from "../../helpers/fetchData"
import NewsItem from "./NewsItem"

const News = ()=>{
    const user = useUser()
    const [news, handleNews] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const getNews = async () => {
            try {
                const res = await fetchData('http://localhost:8088/news/list','GET');
                setLoading(false)
                handleNews(res)
                
            }catch(e) {
                setLoading(false)
                console.log(e)
            }
        }
        getNews()
    },[])

    return (
    <>
    {!user.isLogged ? <Navigate to='/login'/> : ''}
    <Typography variant="h1" sx={{fontSize: '35px', p: 2}} component="h1">
        Recent News
    </Typography>
    <Container sx={{display: 'flex',height: '50vh', alignItems: 'center', justifyContent: 'center'}}>
        <Box>
        <LinearProgress/> 
        </Box>
        {loading ? <LinearProgress/> : ''}
        {!loading && news.map(({id,author,header,content})=>(
            <NewsItem key={id} id={id} header={header} content={content} author={author}/>
        ))}
    </Container>
    </>
    )
}

export default News