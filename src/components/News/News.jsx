import {  Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, TextField, Typography} from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { Navigate } from "react-router"
import { useUser } from "../../context/userContext"
import { fetchData } from "../../helpers/fetchData"
import { staticGlobal } from "../../static/staticGlobal"
import NewNewsForm from "./NewNewsForm"
import NewsItem from "./NewsItem"
import { TransitionGroup } from 'react-transition-group';
import useNotification from "../../hooks/useNotification"
import DialogEdit from "../Dialog/DialogEdit"


const News = ()=>{
    const user = useUser()
    const [news, handleNews] = useState([])
    const [loading,setLoading] = useState(true)
    const [addedNews, setAddedNews] = useState(true)
    const { openNotification } = useNotification()

    const [dialogData, setDialogData] = useState({})

    const [openModal,setOpenModal] = useState(false)

    const handlePostNews = (message, severity) =>{
        setAddedNews(!addedNews)
        openNotification(message,severity)
    }
    const handleClickOpen = () => {
        setOpenModal(true);
      };
    
      const handleClose = () => {
        setOpenModal(false);
      };


    useEffect(()=>{
        const getNews = async () => {
            try {
                const res = await fetchData(`${staticGlobal.API_LINK}/news/list`,'GET');
                setLoading(false)
                handleNews(res)
                
            }catch(e) {
                setLoading(false)
            }
        }
        getNews()
        return () => {
            handleNews([])
        }
    },[addedNews])

    return (
    <>
    {!user.isLogged ? <Navigate to='/login'/> : ''}
        <Box containet sx={{ width: '100%'}}>
            {loading ?
             <LinearProgress/> : 

             <>
            <Typography variant="h1" sx={{fontSize: '35px', p: 2,color: 'white'}} component="h1">
                Recent News
            </Typography>
            <Container sx={{display: 'flex',minHeight: '100vh', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                <NewNewsForm afterPostCallback={handlePostNews}/>
                <TransitionGroup>
                    {news.map((item, index)=>(
                        <NewsItem setDialogData={setDialogData} openModalFC={handleClickOpen} key={index} newsId={item.id} header={item.header} title={item.title} content={item.content} author={item.author}/> 
                    ))}
                </TransitionGroup>
            </Container>
            </>
            }
        <DialogEdit openModal={openModal} handleClose={handleClose} handleEditNews={handlePostNews} dialogData={dialogData}/>

        </Box>
    </>
    )
}

export default News