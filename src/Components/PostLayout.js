import React, { useState, useEffect } from 'react'
import './PostLayout.css';
import Avatar from "@material-ui/core/Avatar";
import moment from 'moment';
import { database } from '../firebase';
import firebase from 'firebase';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e6b3ae',
    },
    secondary: {
      main: '#8dafb5',
    },
  },
});

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: '#ffffff',
      },
      '&:hover fieldset': {
          borderColor: '#e6b3ae',
        },
    }
  }
})(TextField);


// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   timestampUI: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }));

function PostLayout({ postId , user , username, caption, imageUrl, timestamp }) {
  
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');


  useEffect(() => {
    let unsubscribe
    console.log("useeefect for comments")
    if(postId){
      unsubscribe = database
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map(doc => ({
            id: doc.id,
            comment: doc.data()
        })));
        });
    }
    return () =>{
      unsubscribe();
    };
  }, [postId]);

const postComment = (event) => {
  event.preventDefault();

  database.collection("posts").doc(postId).collection("comments").add({
    text: comment, 
    username: user.displayName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  setComment('');
}


  return (
    
    <div className="postLayout">
      
 
      <div className="postLayout_header">
        <Avatar
          className="postLayout_avatar"
          alt= {username}
          src="/static/images/avatar/1.jpg"  
        />
        <h3> {username} </h3>
      </div>
      
 
      <img className="postlayout_image" src={imageUrl} alt=""></img>

      <div className = "captionAndTime">
      <h4 className="postlayout_caption">  <b className="user"> {username} </b> {caption} </h4>

      <h4 className="postlayout_timestamp">{moment(timestamp && timestamp.toDate()).format('MMMM Do YYYY, h:mm a')}</h4>
      </div>
      <div className="postlayout_comments">
        {comments.map(({id,comment}) => (
        <div className="inLine" key={id}>
          <div> <b> {comment.username} </b> {comment.text} </div>
          <div className="postlayout_commenttimestamp">{moment(comment.timestamp && comment.timestamp.toDate()).format('MMMM Do YYYY, h:mm a')} </div>
        </div>
        
        ))}
      </div>




      <form className="postlayout_commentbox">

        <ThemeProvider theme={theme}>
          <CssTextField
          className="postlayout_input"
          id="outlined-basic"
          label="Comment"
          variant="outlined"
          color="primary"
          type="text"
          placeholder="Add a comment..."
          inputProps={{ maxLength: 70 }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

          <Button
          // className="postLayout_button"
          variant = "outlined"
          color="secondary"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </Button>
        </ThemeProvider>
        

      </form>

      </div> 
  )
}

export default PostLayout
