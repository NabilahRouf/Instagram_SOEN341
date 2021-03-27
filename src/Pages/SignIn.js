import React,{useCallback,useContext} from 'react';
import {Redirect} from "react-router";
import {auth} from "../firebase"
import SignInBox from '../Components/SignInBox';
import {AuthenticationContext} from "../Authenticated";


const SignInPage =()=> {
    document.title ='Stratus - Sign In';

    const handleLogin = useCallback(async event => {

    event.preventDefault();
    const{email,password} = event.target.elements;
    
    
        await auth.signInWithEmailAndPassword(email.value,password.value).catch((error)=>alert(error.message));   
        
    },[]);

    const{user} = useContext(AuthenticationContext);
    
    if(user){
        console.log("signin");
        return <Redirect to ="/feed"/>;
    }

    return(
        
        <div className='heroContainer'>
        <video data-testid="CloudsVideo" alt="CloudsVideo" src="/videos/Clouds.mp4" autoPlay loop muted />
        <div className= "heroContent">
            <div className="logo">
                <img alt="stratusLogo" src="/images/logo4.png"/>
            </div>
            <SignInBox 
            handleLogin={handleLogin}
            ></SignInBox>
        </div>
        </div>  
    );
    
};
export default SignInPage;