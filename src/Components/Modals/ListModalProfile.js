import React, {useEffect,useContext} from 'react';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import './UploadModal.css'
import './UploadedForm.css'
import '../../Pages/Profile';
import {useState} from 'react'
import {database} from "../../Firebase/firebase";
import {List,ThemeProvider} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {AuthenticationContext} from '../../Firebase/Authenticated';

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

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
 
  };
  

  const [followList,setFollowList]=useState([]);
  const {user} = useContext(AuthenticationContext);
  
  useEffect(() => {
    const loadFollowingFolowers = async() => {
       
        const selectedUser = await database.collection('selectedUser').doc(user.uid).get().then(doc => {
            if (doc && doc.exists) {
               return doc.data().selectedUser;
            }
        });
        console.log(selectedUser)
        const selectedUserUid = await database.collection('users').where('username','==',selectedUser).get().then((snapshot) => {
           let id = null;
            snapshot.forEach((doc)=>{
                id = doc.data().uid; 
            })
            return id;
        }).catch((error)=>{alert(error.message);})
        console.log(selectedUserUid)
        const unsubscribe = database.collection('users').doc(selectedUserUid).collection(props.followType).onSnapshot(snapshot => {
            let documents = [];
                snapshot.forEach((doc)=>{
                    if(props.followType === "followers"){
                      const followTypeItem= database.collection('users').doc(doc.data().followerId);
                      followTypeItem.get().then(doc => {
                        if (doc && doc.exists) {
                          const follower={
                            id: doc.id,
                           username: doc.data().username,
                        }
                          documents.push(follower);
                        }
                      }) 
                    }
                    else{
                      const followTypeItem= database.collection('users').doc(doc.data().followingId);
                      followTypeItem.get().then(doc => {
                        if (doc && doc.exists) {
                          const following={
                            id: doc.id,
                           username: doc.data().username,
                        }
                          documents.push(following);
                        }
                      }) 
                    }
                    
                });
                 setFollowList(documents);       
        })
        return () => {unsubscribe();}
    }
    loadFollowingFolowers();
    console.log("useEffect ListModal");
    
  }, [user.uid,props.followType])

  return (
    <div>
      <Button onClick = {handleClickOpen} variant="outlined">
        {props.followType}: &nbsp;
        {props.count} 
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.followType}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className="modalText">
            View your {props.followType}
          </Typography>
          <ThemeProvider theme={colorTheme}>
          <List component="nav">
            {followList && followList.map((doc)=>(
                  <ListItemText primary={doc.username} key = {doc.id}/>
            ))}
          </List>
          </ThemeProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}