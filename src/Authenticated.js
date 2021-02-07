import React,{useState,useEffect} from "react";
import {auth} from "./firebase"
import { CircularProgress } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    
    centerCircle: { 
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#d6a09b',
    }
}
  ));


export const AuthenticationContext = React.createContext();
export const AuthenticationProvider=({children}) => {
    const classes = useStyles();
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() =>{
        auth.onAuthStateChanged((user)=> 
        {
            setUser(user)
            setLoading(false)
        });
    },[]);

if(loading){
    return (
        <div className = {classes.centerCircle}>
            <CircularProgress/> 

        </div> 
         
    );
}

    return(
            <AuthenticationContext.Provider
            
            value ={{

                user
            }}
            >
                {children}
            </AuthenticationContext.Provider>


    );

};
