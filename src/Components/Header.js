import React,{useState,useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton , Toolbar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UploadedForm from './UploadedForm'
import {database} from '../firebase'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Redirect} from "react-router-dom";
import {AuthenticationContext} from "../Authenticated";

const useStyles = makeStyles((theme)=>({

    // class that attributes are general.  
    root:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
    },

    // the appbar itself, without the components. 
    appbar:{
        background: '#ffffff',     // 'none' to remove the background color, so the website background shows.
    },

    // the appbar wrapper that can be used to align and fix wdith of toolbar. 
    Toolbar: {
        width: '80%',           // width while centered
        margin: '0 auto',       // to make the toolbar centered. 
    },

    // The title on the appbar top of screen.
    appbarTitle:{
        flexGrow: '1',
        fontSize: '1rem',
        color: '#d6a09b',
    },

    homeIcon: {
        color: '#d6a09b',
        fontSize: '1.5rem', 
    },

    accountIcon: {
        color: '#d6a09b',
        fontSize: '1.5rem', 
    },

    search: {
        position: 'relative',
        paddingRight: 450,
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

      inputInput: {
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
      }
      

      //load all users
    useEffect(() => {
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

         });
        
         if(username){
            return (
            <Redirect  to="/profile"/>
            );
          }
    return (
    <div className = {classes.root}> 
        <AppBar className = {classes.appbar} elevation={0}>
        {/* <Collapse in = {checked} {...(checked ? { timeout: 2000 } : {})} 
        collapseHeight={50}> */}

            <Toolbar  className = {classes.Toolbar}>
                
                <h1 className = {classes.appbarTitle}>Fake<span className = {classes.colorTitle}> Instagram</span> </h1>
                <div style ={{display: "flex"}}>
                <Autocomplete
                    classes={{ root: classes.inputRoot, input: classes.inputInput }}
                    id="username Search"
                    style={{width: "450px", marginLeft: "300px"}}
                    disableClearable
                    options={users.map((option) => option.username)}
                    onChange={onSelectChange}
                    renderInput={(params) => (
                    <TextField
                    {...params}
                        label="Search Profile ...."
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        InputProps={{ ...params.InputProps, type: "search" }}
                    />
                    )}
                 />
                  <div className={classes.search}> 
                    <div className={classes.searchIcon}> 
                        <SearchIcon/> 
                </div>
                 </div>
                </div>
                <IconButton type="submit">
                    <UploadedForm/>
                </IconButton> 
                <IconButton >
                    <Link to = "/feed">
                        <HomeIcon className= {classes.homeIcon}></HomeIcon>
                    </Link>
                </IconButton>
                <IconButton>
                    <Link to = "/myprofile">
                        <AccountCircleIcon className= {classes.accountIcon}></AccountCircleIcon>
                    </Link>
                </IconButton>
            </Toolbar>
        {/* </Collapse>  */}
        </AppBar>
    </div>
    );
}