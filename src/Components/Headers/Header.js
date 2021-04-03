import React,{useState,useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles,createMuiTheme, withStyles } from '@material-ui/core/styles';
import { AppBar, IconButton , ThemeProvider, Toolbar} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import UploadModal from '../Modals/UploadModal';
import {database} from  '../../Firebase/firebase';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Redirect} from "react-router-dom";
import  { AuthenticationContext } from '../../Firebase/Authenticated';
import Menu from './Menu'

const useStyles = makeStyles((theme)=>({

    // class that attributes are general.  
    root:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        
    },
    // the appbar itself, without the components. 
    appBar:{
        background: '#ffffff',     // 'none' to remove the background color, so the website background shows.
        borderBottom: '1px solid lightgray',
        
    },

    // the appbar wrapper that can be used to align and fix wdith of toolbar. 
    toolBar: {
        width: '80%',           // width while centered
        margin: '0 auto',       // to make the toolbar centered.

    },

    // The title on the appbar top of screen.
    appBarTitle:{
        flexGrow: '1',
        fontSize: '1rem',
        color: '#d6a09b',
    },

    homeIcon: {
        color: '#d6a09b',
        fontSize: '1.5rem', 
    },

    search: {
        position: 'relative',
        paddingRight: 180,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': { 
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',

        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#d6a09b',
      },
      inputRoot: {
        color: '#d6a09b',
    
      },

      logo: {
        width: 110,
        height:50,
      },

    textfieldCSS : {
        marginBottom: 15,
    },
    buttons:{
      marginRight: 'auto',
   },
      input: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
            color: '#d6a09b',
    
          },
        },
      },

}));

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

export default function Header(){
    const classes = useStyles(); 
    const [users,setUsers]=useState([]);
    const[username, setUsername]=useState('');
    const{user} = useContext(AuthenticationContext);
    const onSelectChange = (event,value) => {
      database.collection('selectedUser').doc(user.uid).set({
        selectedUser: value
    })
    setUsername(value); 
    console.log("chose user");  
      }

      //load all users
      useEffect(() => {
        console.log("header useEffect");
         database.collection("users").get().then((snapshot) => {
            const usersSnapshot=[];
            snapshot.forEach((doc) => {
                if(doc.data().uid !== user.uid){
                usersSnapshot.push({
                    username: doc.data().username
                  });
                }
            });
            setUsers(usersSnapshot);
           
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

         },[user]);
 
         if(username){
            return (
            <Redirect  to="/profile"/>
            );
          }
    return (
    <div className = {classes.root}> 
        <AppBar className = {classes.appBar} elevation={0}>

            <Toolbar  className = {classes.toolBar}>
                <h1>
                <img alt="stratusLogoHeader" className={classes.logo} src="/images/logo4.png"/>
                </h1>
                <div style ={{display: "flex"}} className={classes.buttons}>
                <Autocomplete
                    classes={{ root: classes.inputRoot, input: classes.input }}
                    id="username Search"
                    style={{width: "450px", marginLeft: "300px"}}
                    disableClearable
                    options={users.map((option) => option.username)}
                    onChange={onSelectChange}
                    renderInput={(params) => (
                    <ThemeProvider theme={theme}>
                        <CssTextField
                        {...params}
                            label="Search Profile"
                            margin="normal"
                            variant="outlined"
                            size="small"
                            color="primary"
                            className = {classes.textfieldCSS}
                            fullWidth
                            // InputProps={{ ...params.InputProps, type: "search" }}
                        />
                    </ThemeProvider>

                    )}
                 />
                  <div className={classes.search}> 
                 </div>
                </div>
                <div className={classes.buttons}>
                  </div>
                    <UploadModal/>
                
                <IconButton >
                    <Link to = "/feed">
                        <HomeIcon className= {classes.homeIcon}></HomeIcon>
                    </Link>
                </IconButton>
                <Menu/>
            </Toolbar>
        </AppBar>
    </div>
    );
}