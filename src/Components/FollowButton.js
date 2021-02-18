import React from "react";

export default function FollowButton(props){
  

  if (props.selectedUserUid && !props.isFollower) {
    return <button type="button" onClick={props.follow}>Follow</button>;
  } else {
    return null;
  }
};
