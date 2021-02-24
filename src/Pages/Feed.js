import React, { useState , useEffect, useContext } from 'react';
import {auth, database} from "../firebase"
import Header from '../Components/Header'
import './Feed.css';
import PostLayout from '../Components/PostLayout';
import  { AuthenticationContext } from '../Authenticated';

const MainPage =() =>{
    const [posts, setPosts] = useState([]);
    
    const {user} = useContext(AuthenticationContext);
    // useeeffect -> tuns a peice of code based on a specific condition

    useEffect(() => {
        var following = [user.uid];
        console.log("feed useeffect");
        
        database.collection('users').doc(user.uid).collection('following').get().then(snapshot=>{
                snapshot.forEach((doc)=>{
                    following.push(doc.data().followingId);
                });
                
                const unsubscribe = database.collection('posts').where('uid','in',following).orderBy('timestamp','desc').onSnapshot(snapshot => {
                    // everytime a change happens like a new post, this code is fired
                    setPosts(snapshot.docs.map(doc => ({
                        id: doc.id,
                        post: doc.data()
                    })));
                })
                return () => unsubscribe(); 
        })
    
    
    }, [user]);
    
    
    document.title ='Stratus - Home';  
    return(
        <div className="feed">
            
            <div>
                <Header/>
            </div>
        
            <div>
            <button type="button" onClick={() => auth.signOut()}>
                LogOut
            </button>
            </div>

            <div className="feed_posts"> 
            
                {
                    posts.map(({id, post}) => (
                    <PostLayout key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} timestamp={post.timestamp}/>
                    ))
                } 
            </div>

        
        </div>
);

};

export default MainPage;