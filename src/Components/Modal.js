import React, { useState, useEffect, useContext } from 'react'
import './Modal.css';
import Avatar from "@material-ui/core/Avatar";
import { Button } from '@material-ui/core';
import { database } from '../firebase';
import firebase from 'firebase';
import moment from 'moment';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import  { AuthenticationContext } from '../Authenticated';

const Modal = ({selectedImg, setSelectedImg}) => {

    const {user} = useContext(AuthenticationContext);

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

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe
        console.log("useefect for comments for modal")
        if(selectedImg.id){
          unsubscribe = database
            .collection("posts")
            .doc(selectedImg.id)
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
      }, [selectedImg.id]);

    const postComment = (event) => {
        event.preventDefault();
          
        database.collection("posts").doc(selectedImg.id).collection("comments").add({
              text: comment, 
              username: user.displayName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            setComment('');
          }


      const handleClick = (e) => {
          if(e.target.classList.contains('model-container')) {
              setSelectedImg(null);
    }
}
    return(
    <div className = "model-container" onClick = {handleClick}>

       <div className="model">
           <img className = "model-image" src={selectedImg.imageUrl} alt="Enlarged"/>
           <div className="model-content-section">
                <div className = "model-caption-section">
                    <div className="model-top-caption">
                        <Avatar className="model-top-section-avatar" alt= {selectedImg.username} src="/static/images/avatar/1.jpg"  />  
                        <div className="model-top-section-username"> {selectedImg.username} </div>
                        <div className="model-spacer"/>
                        <div className="model-timestamp">
                        Posted on {moment(selectedImg.timestamp && selectedImg.timestamp.toDate()).format('MMMM Do YYYY, h:mm a')}
                        </div>
                    </div>
                    <div className="model-caption">
                    {selectedImg.caption}
                    </div>
                </div>
                <div className = "model-comments">
                    {comments.map(({id,comment}) => (
                    <div className="inLine" key={id}>
                        <div> <b> {comment.username} </b> {comment.text} </div>
                        
                        <div className="modal-comments-timestamp">{moment(comment.timestamp && comment.timestamp.toDate()).format('MMMM Do YYYY, h:mm a')} </div>
                    </div>
                    ))}
                </div>
                <div className="model-spacer"/>
                <form className="model-comment-box">
                        <ThemeProvider theme={theme}>
                            <CssTextField
                            className="model-input"
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
        </div>
    </div>
    )

}

export default Modal;