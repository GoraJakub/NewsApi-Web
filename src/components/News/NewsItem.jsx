import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext,  useState } from 'react';
import { ThemeContext } from '@mui/styled-engine';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {  Menu, MenuItem, Tooltip} from '@mui/material'
import { staticGlobal } from '../../static/staticGlobal';
import { Box } from '@mui/system';
import { fetchData } from '../../helpers/fetchData';
import useNotification from '../../hooks/useNotification';
import NewCommentForm from './NewsCommentForm';
import { TransitionGroup } from 'react-transition-group';
import Comment from '../Comments/Comment';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));



const NewsItem = ({id, key, growDelay, header, title, content, author})=>{
    const [expanded, setExpanded] = useState(false);
    const {palette} = useContext(ThemeContext)
    const [anchorElOption, setAnchorElOption] = useState(null);
    const [grow, setGrow] = useState(true)
    const [comments, setComments] = useState([])
    const {openNotification} = useNotification()
    const [isFetched, setIsFetched] = useState(false)


    const handleFetchComsSuccess = (coms) => {
      if (!isFetched) setIsFetched(true)
      setComments(coms)
    }
  

    const fetchComs = async () => {
        try {
            const coms = await fetchData(`${staticGlobal.API_LINK}/news/commentsList/${id}`,'GET')
            handleFetchComsSuccess(coms)
    
        }catch(e) {
            openNotification(e.message,'error')
        }
    }

    const handleExpandClick = () => {
        if(!isFetched) {
           fetchComs()
        }
        setExpanded(!expanded);
    };


    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const handleOpenOption = (event) => {
        setAnchorElOption(event.currentTarget);
    };
    const handleCloseOption = async (id) => {
        setAnchorElOption(null);

        if(!id) return

        try {
            const {message} = await fetchData(`${staticGlobal.API_LINK}/news/remove/${id}`, 'DELETE')
            setGrow(false)
            openNotification(message,'success')
        }catch(e) {
            openNotification(e.message,'error')
        }
      };

    return (
        <Collapse key={key} in={grow}>
        <Card sx={{ width: 600, mb: 2 }}>
        <CardHeader
          avatar={
            <Tooltip title={author}>
                <Avatar sx={{ bgcolor: palette.primary.light }} aria-label="recipe">
                {author.split('')[0].toUpperCase()}
                </Avatar>
            </Tooltip>
          }
          action={
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
                onClose={handleCloseOption}
                >
                    <MenuItem key='1' onClick={handleCloseOption}>
                        <Typography textAlign="center">Edit post</Typography>
                    </MenuItem>
                    <MenuItem key='2' onClick={() => handleCloseOption(id)}>
                        <Typography textAlign="center">Delete Post</Typography>
                    </MenuItem>
                </Menu>
            </Box>
          }
          title={title}
          subheader={header}
        />
        <CardMedia
          component="img"
          height="194"
          image={`${staticGlobal.IMG_LINK}/600/${getRandomIntInclusive(400,420)}`}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteBorderOutlinedIcon  />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <NewCommentForm postId={id} commentAddCallback={fetchComs}/>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <TransitionGroup>
          {console.log(comments, isFetched)}
            {(isFetched) ? comments.map((com, index)=>(
                <Comment author={com.author} key={index} content={com.content} comId={com.id} handleDelComCallback={fetchComs}/>
            ))
            :
            console.log("XDDDDD")
        }
        </TransitionGroup>
        </Collapse>
      </Card>
      </Collapse>
    )
}

export default NewsItem