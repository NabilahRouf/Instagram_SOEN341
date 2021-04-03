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
      main: '#858585',
    },
  },
});

export default function UploadButton(selected){
  

  if (selected.isSelected) { 
    return <ThemeProvider theme={theme}><Button autoFocus onClick={selected.handleUpload} color="primary">Upload</Button></ThemeProvider>;
  } else {
    return null;
  }
};