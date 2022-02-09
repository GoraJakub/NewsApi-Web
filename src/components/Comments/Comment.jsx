import { Avatar, Collapse, Grid, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchData } from "../../helpers/fetchData";
import { staticGlobal } from "../../static/staticGlobal";
import { useState } from "react";
import useNotification from "../../hooks/useNotification";

const Comment = ({author, content, handleDelComCallback, comId}) => {
    const [anchorElOption, setAnchorElOption] = useState(null);
    const {openNotification} = useNotification()
    const [isDeleted, setIsDeleted] = useState(false)

    const handleOpenOption = (event) => {
        setAnchorElOption(event.currentTarget);
    };
    const handleCloseOption = async (id) => {
        setAnchorElOption(null)
        if(!id) return

        try {
            const {message} = await fetchData(`${staticGlobal.API_LINK}/comments/remove/${id}`, 'DELETE')
            openNotification(message,'success')
            setIsDeleted(true)
            if(handleDelComCallback) handleDelComCallback()
        }catch(e) {
            openNotification(e,'error')
        }
      };
    return (
        <Collapse in={!isDeleted}>
        <Paper style={{ padding: "10px 20px"}}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar>{author.split('')[0].toUpperCase()}</Avatar>
                  </Grid>
                  <Grid justifyContent="left" item xs={11} zeroMinWidth>
                    <Typography variant="subtitle1"  component="div">
                    {author}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                     {content}{" "}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Box sx={{ flexGrow: 0 }}>
                    <IconButton aria-label="settings" onClick={handleOpenOption}>
                    <MoreVertIcon />
                    </IconButton>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElOption}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElOption)}
                    onClose={() => handleCloseOption()}
                    >
                        <MenuItem key='1' onClick={() => handleCloseOption(comId)}>
                            <Typography textAlign="center">Delete Comment</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
                </Grid>
                    
            
                </Grid>
              </Paper>
              </Collapse>
    )
}

export default Comment