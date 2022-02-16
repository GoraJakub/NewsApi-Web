import { Fab, FormControl, TextField } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import SendIcon from '@mui/icons-material/Send';
import { useUser } from "../../context/userContext";
import { fetchData } from "../../helpers/fetchData";
import { staticGlobal } from "../../static/staticGlobal";

const useStyles = makeStyles({
    input: {
        color: 'white',
    }
})

const NewNewsForm = ({afterPostCallback}) => {
    const [newNewsValue, setNewNewsValue] = useState('')
    const [newNewsTitleValue, setNewNewsTitleValue] = useState('')
    const [newNewsHeaderValue, setNewNewsHeaderValue] = useState('')
    const classes = useStyles()
    const user = useUser()

    const handleNewNewsValue = (e) => {
        setNewNewsValue(e.target.value)
    }
    const handleNewNewsTitleValue = (e) => {
        setNewNewsTitleValue(e.target.value)
    }
    const handleNewNewsHeaderValue = (e) => {
        setNewNewsHeaderValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const postData = {title: newNewsTitleValue, header: newNewsHeaderValue, content: newNewsValue, author: `${user.name} ${user.surname}`}
        try {
            const {message} = await fetchData(`${staticGlobal.API_LINK}/news/add`, 'POST', postData)
            if(afterPostCallback) afterPostCallback(message,'success')
        }catch(e) {
            afterPostCallback(e.message,'success')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
                <FormControl variant="filled" sx={{mb: 3}}>
                    <TextField
                        id="title"
                        label="What topic have you in mind?"
                        value={newNewsTitleValue}
                        onChange={handleNewNewsTitleValue}
                        variant="filled"
                        style={{width: 600}}
                        inputProps={{className: classes.input}}
                        // margin="normal"
                    />
                    <TextField
                        id="header"
                        label="Header"
                        value={newNewsHeaderValue}
                        onChange={handleNewNewsHeaderValue}
                        variant="filled"
                        style={{width: 600}}
                        inputProps={{className: classes.input}}
                        margin="normal"
                    />
                    <TextField
                        id="content"
                        label="More content"
                        multiline
                        maxRows={4}
                        value={newNewsValue}
                        onChange={handleNewNewsValue}
                        variant="filled"
                        style={{width: 600}}
                        inputProps={{className: classes.input}}
                        margin="normal"
                    />
                    <Fab color="primary" variant="extended" sx={{mt:1, mb: 1}} type="submit">
                        Send
                        <SendIcon sx={{ml: 1}} />
                    </Fab>
                </FormControl>
             </form>
    )
}

export default NewNewsForm