import React from 'react';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';
import './UploadModal.css'
import './UploadedForm.css'
import {useState, useContext} from 'react'
import {firebaseStorage, database, timestamp} from "../firebase"
import {AuthenticationContext} from "../Authenticated";
import UploadButton from '../Components/UploadButton';
import {ThemeProvider} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#e6b3ae',
    },
    secondary: {
      main: '#858585',
    },
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setError("");
  };
  const handleClose = () => {
    setOpen(false);
 
  };

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const allowedTypes = ['image/png', 'image/jpeg'];
  const [caption, setCaption] = useState('');
  const{user} = useContext(AuthenticationContext);
  const [isSelected,setSelected] = useState(false);


  const changeHandler = (e) => {
    // access first file that the user selected
    let selected = e.target.files[0];

    // if we have a file, update the state
    console.log(selected);
    if(selected && allowedTypes.includes(selected.type)) {
        setImage(selected);
        setError('');
        setSelected(true);
    
    } else {
        setImage(null);
        setError('Please select an image file (jpeg or png)');

    }

  }
const handleUpload =() => {
  
  const uploadTask = firebaseStorage.ref(`posts/${image.name}`).put(image); //uploads the image
  
  uploadTask.on(
    "state_changed",
    (snapshot) => {
    
    },
    (error) => {
      //Error function 
      console.log(error);
      alert(error.message);

    },
    () => {
      //complete function
      firebaseStorage
        .ref("posts")
        .child(image.name)
        .getDownloadURL() //get the url from the image
        .then(url => {
          //post image inside of the database
          const createdAt = timestamp();
          database.collection("posts").add({
            timestamp: createdAt,
            caption: caption,
            imageUrl: url,
            username: user.displayName,
            uid:user.uid,
          });
          setCaption("");
          setImage(null);
          setError("");
          handleClose();

        })
    }
  )
  
}

  return (
    <div>
      <IconButton aria-label="uploadButtonHeader" onClick={handleClickOpen}>
        <PublishIcon className="uploadPicIcon"></PublishIcon>
    </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Upload a Photo
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className="modalText">
            Upload jpeg or png from your device.
          </Typography>
          <div>
          <form className="uploadForm">
            <label className="uploadLabel">
                <input type= "file" onChange = {changeHandler}/>
                <span>+</span>
            </label>
            <div className = "output">
                {error && <div className="error">{error}</div>}
                {image && <div>{image.name}</div>}  
            </div>
          </form>
          </div>
          <Typography gutterBottom>
            Pair your lovely photo with a caption:
          </Typography>
          <ThemeProvider theme={colorTheme}>
          <TextField onChange={event=>setCaption(event.target.value)} value = {caption}
            autoFocus
            margin="dense"
            id="caption"
            label="Caption"
            color="primary"
            fullWidth
            inputProps={{
              'data-testid': 'caption'
            }}
          />
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <UploadButton isSelected={isSelected} handleUpload = {handleUpload}/>
        </DialogActions>
      </Dialog>
    </div>
  );
}
