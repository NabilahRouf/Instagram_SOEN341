import React from "react";
import Button from '@material-ui/core/Button';
import {ThemeProvider} from '@material-ui/core';
import { createMuiTheme} from '@material-ui/core/styles';

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

export default function FollowButton(props){
  

  if (props.selectedUserUid && !props.isFollower) {
    return <ThemeProvider theme={theme}><Button  variant = "outlined" color="secondary" onClick={props.follow}  aria-label="followButton">Follow</Button></ThemeProvider>;
  } else {
    return null;
  }
};
