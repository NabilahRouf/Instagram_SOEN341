import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton , Toolbar, InputBase, Collapse} from '@material-ui/core';


import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UploadedForm from './UploadedForm'



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
        //paddingRight: 450,   Search bar on the right is nicer
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

    // // used for the collapse effect on Header once the site opens.  
     const [checked, setChecked] = useState(false);
    useEffect(()=>{
        setChecked(true);
    },[]);

    return (
    <div className = {classes.root}> 
        <AppBar className = {classes.appbar} elevation={0}>
        <Collapse in = {checked} {...(checked ? { timeout: 2000 } : {})}
        collapseHeight={50}> 

            <Toolbar className = {classes.Toolbar}>
                
                <hi className = {classes.appbarTitle}>Fake<span className = {classes.colorTitle}>stagram</span> </hi>

                <div className={classes.search}> 
                    <div className={classes.searchIcon}> 
                        <SearchIcon /> 
                </div>
            
                    <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }}
                        inputProps={{ 'aria-label': 'search' }}/>

                </div>
                <IconButton>
                    <UploadedForm/>
                </IconButton> 
                <IconButton >
                    <Link to = "/feed">
                        <HomeIcon className= {classes.homeIcon}></HomeIcon>
                    </Link>
                </IconButton>
                <IconButton>
                    <Link to = "/profile"> {/* I changed from /feed/profile to /profile TD */}
                        <AccountCircleIcon className= {classes.accountIcon}></AccountCircleIcon>
                    </Link>
                </IconButton>
            </Toolbar>
        </Collapse>  
        </AppBar>
    </div>
    );
}