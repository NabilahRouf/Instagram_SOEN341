import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, IconButton , Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import UploadModal from '../Components/UploadModal';
import Menu from '../Components/Menu'

const useStyles = makeStyles(()=>({

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

    homeIcon: {
        color: '#d6a09b',
        fontSize: '1.5rem', 
    },

    logo: {
        width: 110,
        height:50,
    },

    buttons:{
        marginRight: 'auto',
    },


}));


export default function HeaderProfile(){
    const classes = useStyles(); 

    return (
    <div className = {classes.root}> 
        <AppBar className = {classes.appBar} elevation={0}>

            <Toolbar  className = {classes.toolBar}>
                
                <h1>
                    <img alt="stratusLogoHeaderProfile" className={classes.logo} src="/images/logo4.png"/>
                </h1>
                
                <div className={classes.buttons}>
                </div> 
                    <UploadModal/>
                
                    <IconButton aria-label = "homeButtonHeaderProfile">
                        <Link to = "/feed">
                            <HomeIcon className= {classes.homeIcon}></HomeIcon>
                        </Link>
                    </IconButton>
                    <Menu aria-label = "menuHeaderProfile"/>
            </Toolbar>
        </AppBar>
    </div>
    );
}