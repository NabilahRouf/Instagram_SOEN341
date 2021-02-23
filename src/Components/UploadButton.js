import React from "react";
import Button from '@material-ui/core/Button';


export default function UploadButton(selected){
  

  if (selected.isSelected) { 
    return <Button autoFocus onClick={selected.handleUpload} color="primary">Upload</Button>;
  } else {
    return null;
  }
};