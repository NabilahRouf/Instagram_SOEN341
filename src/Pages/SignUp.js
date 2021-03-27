import React,{useCallback,useContext} from 'react';
import {Redirect} from "react-router";
import {auth,database} from '../firebase';
import SignUpBox from '../Components/SignUpBox';
import {AuthenticationContext} from "../Authenticated";

const SignUpPage =()=> {
    document.title ='Stratus - Sign Up';
    const handleSignUp = useCallback(async event => {
    
        event.preventDefault();
        const{username,email,password} = event.target.elements;
        console.log(username.value,email.value,password.value);
        var newUsername=true;

        await database.collection('users').where('username','==',username.value).get('value').then((snapshot) =>{
    
            if(snapshot.empty){
                newUsername=true;
            }
            else{
                newUsername=false;
                console.log(newUsername +"line 23");
                throw new Error('Username is not unique: Try again!');
            }

        }).catch((error)=>alert(error.message));  

        if(newUsername===true){
            console.log(newUsername+"line 30"); 
        await auth.createUserWithEmailAndPassword(email.value,password.value).then((authenticatedUser) =>  {
            database.collection('users').doc(authenticatedUser.user.uid).set({
                followersCount:0,
                followingCount:0,
                uid:authenticatedUser.user.uid,
                username: username.value,
             });
             console.log("Entered create");

            return authenticatedUser.user.updateProfile({
            displayName: username.value
            
            })
        }).catch((error)=>alert(error.message));
        console.log("after create");

    }


    },[]);

    const{user} = useContext(AuthenticationContext);
    if(user){
        return <Redirect to ="/feed"/>;
    }

    return(     
        <div className='heroContainer'>
        <video data-testid="CloudsVideo" alt="CloudsVideo" src="/videos/Clouds.mp4" autoPlay loop muted />
        <div className= "heroContent">
        <SignUpBox  
        handleSignUp={handleSignUp}
        ></SignUpBox>
        </div>
        </div> 
    
    );
    
};

export default SignUpPage;