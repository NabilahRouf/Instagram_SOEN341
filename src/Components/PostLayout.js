import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
  cardPadding: {
    paddingTop: 40,


  },
  
    root: {
    maxWidth: 1200,
    marginBottom: 50, 
  },
  media: {
    height: 700,
    //paddingTop: '56.25%', // 16:9
  },
  expand: {
    //transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    //transform: 'rotate(180deg)',
  },

  avatar: {
    backgroundColor: blue[500], 
  },
}));


export default function PostLayout( {post} ) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className ={classes.cardPadding}>
<Card className={classes.root}>

<CardHeader
avatar={ <Avatar aria-label="Avatar" className={classes.avatar}> {post.profileInitials /* this is where I get the initials from TD*/}</Avatar> }
action={ <IconButton aria-label=" settings"> <MoreVertIcon /> </IconButton> }
title= {post.profileName}
subheader= {post.date /* this is where I get the date from TD*/}
/>

<CardMedia
    className={classes.media}
    image= {post.imageURL /* no picture in the asset*/}
    title="Picture media"
/>

<CardContent className= {classes.caption}>
    
    <Typography variant="body2" color="textSecondary" component="p">
    
    {post.caption /* this is where I get the caption from TD*/}
    
    </Typography>

</CardContent>

<CardActions disableSpacing>
    
    <IconButton aria-label="add to favorites">
        <FavoriteIcon />
    </IconButton>

    <IconButton aria-label="share">
        <ShareIcon />
    </IconButton>

    <IconButton
        className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more comments" 
    >
        <ChatIcon />
    </IconButton>

</CardActions>

<Collapse in={expanded} timeout="auto" unmountOnExit>

<CardContent>
    
  <Typography >
    

    {post.comment /* this is where I get the comment from TD*/}
    
  </Typography>

</CardContent>
</Collapse>
</Card>            

</div>
  );
}