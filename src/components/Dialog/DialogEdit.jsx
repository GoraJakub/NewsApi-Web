import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { FormControl } from "@mui/material"
import { useEffect, useState } from "react"
import { fetchData } from "../../helpers/fetchData"
import useNotification from "../../hooks/useNotification"
import { staticGlobal } from "../../static/staticGlobal"

const DialogEdit = ({openModal, dialogData, handleClose, handleEditNews}) => {
    const [newNewsValue, setNewNewsValue] = useState('')
    const [newNewsTitleValue, setNewNewsTitleValue] = useState('')
    const [newNewsHeaderValue, setNewNewsHeaderValue] = useState('')

    const {openNotification} = useNotification()
    console.log(dialogData)

    const handleNewNewsValue = (e) => {
        setNewNewsValue(e.target.value)
    }
    const handleNewNewsTitleValue = (e) => {
        setNewNewsTitleValue(e.target.value)
    }
    const handleNewNewsHeaderValue = (e) => {
        setNewNewsHeaderValue(e.target.value)
    }

    const updatePost = async () => {
        try {
            const {message} = await fetchData(`${staticGlobal.API_LINK}/news/modify`,'POST',{
                id: dialogData.id,
                title: newNewsTitleValue,
                header: newNewsHeaderValue,
                content: newNewsValue
            })
            handleEditNews(message,'success')
            handleClose()
        }catch(e){
            openNotification(e,'error')
        }
    }

    const closeModal = () =>{
        handleClose()
        resetValues()
    }

    const resetValues = () => {
        setNewNewsValue(dialogData.content)
        setNewNewsTitleValue(dialogData.title)
        setNewNewsHeaderValue(dialogData.header)
    }

    useEffect(()=>{
        setNewNewsValue(dialogData.content)
        setNewNewsTitleValue(dialogData.title)
        setNewNewsHeaderValue(dialogData.header)
    },[dialogData.content,dialogData.title,dialogData.header])

    const handleSubmit = () => {}

    return (
        <Dialog open={openModal} onClose={closeModal} unmountOnExit>
        <DialogTitle>Edit post: {dialogData.title}</DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit}>
                <FormControl variant="filled" sx={{mb: 3}}>
                    <TextField
                        id="title"
                        label="What topic have you in mind?"
                        value={newNewsTitleValue}
                        onChange={handleNewNewsTitleValue}
                        margin="normal"
                        style={{width: 400}}
                    />
                    <TextField
                        id="header"
                        label="Header"
                        value={newNewsHeaderValue}
                        onChange={handleNewNewsHeaderValue}
                        margin="normal"
                        style={{width: 400}}
                    />
                    <TextField
                        id="content"
                        label="More content"
                        multiline
                        maxRows={4}
                        value={newNewsValue}
                        onChange={handleNewNewsValue}
                        margin="normal"
                        style={{width: 400}}
                    />
                    </FormControl>
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={updatePost}>Edit</Button>
        </DialogActions>
      </Dialog>
    )
}

export default DialogEdit