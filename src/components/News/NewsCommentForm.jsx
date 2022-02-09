import { IconButton, InputBase, Paper } from "@mui/material"
import { useState } from "react"
import SendIcon from '@mui/icons-material/Send';
import { fetchData } from "../../helpers/fetchData";
import { staticGlobal } from "../../static/staticGlobal";
import { useUser } from "../../context/userContext";
import useNotification from "../../hooks/useNotification";

const NewCommentForm = ({postId, commentAddCallback}) => {
    const [newComment, setNewComment] = useState('')
    const user = useUser()
    const {openNotification} = useNotification()

    const handleNewComment = (e) => {
        setNewComment(e.target.value)
    }

    const handleCommentSend = async (e) => {
        e.preventDefault()
        try {
            const data = {content: newComment, author: `${user.name} ${user.surname}`, newsId: postId}
            const {message} = await fetchData(`${staticGlobal.API_LINK}/comments/add`,'POST', data)
            if(commentAddCallback) commentAddCallback()
            openNotification(message,'success')
            setNewComment('')
        }catch(e) {
            openNotification(e.message,'error')
        }
    }

    return (
        <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      onSubmit={handleCommentSend}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add your comment"
        onChange={handleNewComment}
        value={newComment}
        inputProps={{ 'aria-label': 'Add your comment' }}
      />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" type="submit">
        <SendIcon />
      </IconButton>
    </Paper>
    )
}

export default NewCommentForm