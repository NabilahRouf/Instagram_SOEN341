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


function PostLayout({ postId , user , username, caption, imageUrl, timestamp }) {
  
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');


  useEffect(() => {
    let unsubscribe
    console.log("useefect for comments for post layout")
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
      
 
      <div className="postLayoutHeader">
        <Avatar
          className="postLayoutAvatar"
          alt= {username}
          src="/static/images/avatar/1.jpg"  
        />
        <h3> {username} </h3>
      </div>
      
 
      <img className="postlayoutImage" src={imageUrl} alt=""></img>

      <div className = "captionAndTime">
      <h4 className="postlayoutCaption">  <b className="user"> {username} </b> {caption} </h4>

      <h4 className="postlayoutTimestamp">{moment(timestamp && timestamp.toDate()).format('MMMM Do YYYY, h:mm a')}</h4>
      </div>
      <div className="postlayoutComments">
        {comments.map(({id,comment}) => (
        <div className="inLine" key={id}>
          <div> <b> {comment.username} </b> {comment.text} </div>
          <div className="postlayoutCommentTimestamp">{moment(comment.timestamp && comment.timestamp.toDate()).format('MMMM Do YYYY, h:mm a')} </div>
        </div>
        
        ))}
      </div>

      <form className="postlayoutCommentBox">

        <ThemeProvider theme={theme}>
          <CssTextField
          className="postlayoutInput"
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
