import React from 'react'
import './PostLayout.css';
import Avatar from "@material-ui/core/Avatar";
import moment from 'moment';



function PostLayout({username, caption, imageUrl,timestamp}) {
  

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

    <h4 className="timestamp">{moment(timestamp && timestamp.toDate()).format('MMMM Do YYYY, h:mm a')}</h4>
  
    </div>
  )
}

export default PostLayout
