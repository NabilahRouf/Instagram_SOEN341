import React,{useCallback,useContext} from 'react';
import {Redirect} from "react-router";
import {auth} from "../firebase"
import SignInBox from '../Components/SignInBox';
import {AuthenticationContext} from "../Authenticated";

const SignInPage =()=> {
    document.title ='Fakestagram - Sign In';

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
        
            <div className='hero-container'>
                <video src="/videos/Forest.mp4" autoPlay loop muted />
                <div className= "hero-content">
                    <h1 className="hero-header"> Fakestagram </h1>
                    <SignInBox 
                    handleLogin={handleLogin}
                    ></SignInBox>
                </div>
            </div>  
    );
    
};
export default SignInPage;