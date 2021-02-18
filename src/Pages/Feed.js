import React from 'react';
import {auth} from "../firebase"
import Header from '../Components/Header'
import './Feed.css';
import PostLayout from '../Components/PostLayout';
import posts from '../static/posts'; 

const MainPage =() =>{

    document.title ='Fakestagram - My Feed';  
        
    return(
        <div>
            
            <div>
                <Header/>
            </div>
            
            <div className="feedHeader">
                Feed
            </div>

            <div>
            {/*<Link to ="/profile">
                <button type="button">
                    Search Profiles
                </button>
            </Link> I am liking though the header no need to link again, unless you guys want it. 
            */}
            <button type="button" onClick={() => auth.signOut()}>
                
                LogOut
                    
            </button>
            </div>

            <div className ="root" /* need to dynamicly add posts based on the database*/> 
                <PostLayout post={posts[0]} />
                <PostLayout post={posts[1]} />
            </div>

            {/*
            <div> 
                <UploadedForm/>
            </div> I am liking though the header no need to link again
            */}
        </div>
);

};

export default MainPage;