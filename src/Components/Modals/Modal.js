import React, { useState, useEffect, useContext } from 'react'
import './Modal.css';
import Avatar from "@material-ui/core/Avatar";
import { Button } from '@material-ui/core';
import { database } from '../../Firebase/firebase';
import firebase from 'firebase';
import moment from 'moment';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import  { AuthenticationContext } from '../../Firebase/Authenticated';

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
          if(e.target.classList.contains('modalContainer')) {
              setSelectedImg(null);
      }
    }

    return(
    <div className = "modalContainer" onClick = {handleClick}>

       <div className="modal">
           <img className = "modalImage" src={selectedImg.imageUrl} alt="Enlarged"/>
           <div className="modalContentSection">
                <div className = "modalCaptionSection">
                    <div className="modalTopCaption">
                        <Avatar className="modalTopSectionAvatar" alt= {selectedImg.username} src="/static/images/avatar/1.jpg"  />  
                        <div className="modalTopSectionUsername"> {selectedImg.username} </div>
                        <div className="modalSpacer"/>
                        <div className="modalTimestamp">
                        Posted on {moment(selectedImg.timestamp && selectedImg.timestamp.toDate()).format('MMMM Do YYYY, h:mm a')}
                        </div>
                    </div>
                    <div className="modalCaption">
                    {selectedImg.caption}
                    </div>
                </div>
                <div className = "modalComments">
                    {comments.map(({id,comment}) => (
                    <div className="inLine" key={id}>
                        <div> <b> {comment.username} </b> {comment.text} </div>
                        <div className="modalCommentsTimestamp">{moment(comment.timestamp && comment.timestamp.toDate()).format('MMMM Do YYYY, h:mm a')} </div>
                    </div>
                    ))}
                </div>
                <div className="modalSpacer"/>
                <form className="modalCommentBox">
                        <ThemeProvider theme={theme}>
                            <CssTextField onChange={event=>setComment(event.target.value)} value = {comment}
                              autoFocus
                              className="modalInput"
                              type="text"
                              placeholder="Add a comment..."
                              id="comment"
                              variant="outlined"
                              label="Comment"
                              color="primary"
                              fullWidth
                              inputProps={{
                                maxLength: 70,
                                'data-testid': 'comment'
                              }}
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