import React, { useState, useEffect } from 'react'
import './PostLayout.css';
import Avatar from "@material-ui/core/Avatar";
import moment from 'moment';
import { database } from '../firebase';
import firebase from 'firebase';


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
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
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
    
      <h4 className="postlayout_text">  <strong> {username} </strong> {caption} </h4>

      <h4 className="postlayout_timestamp">{moment(timestamp && timestamp.toDate()).format('MMMM Do YYYY, h:mm a')}</h4>

      <div className="postlayout_comments">
        {comments.map((comment) => (
        <p>
          <strong> {comment.username} </strong> {comment.text}
        </p>
        ))}
      </div>



      <form className="postlayout_commentbox">

        <input
          className="postlayout_input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          className="postLayout_button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>

      </form>

      </div> 
  )
}

export default PostLayout
