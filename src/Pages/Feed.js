import React, { useState , useEffect, useContext } from 'react';
import {database} from "../Firebase/firebase"
import Header from '../Components/Headers/Header'
import './Feed.css';
import PostLayout from '../Components/Posts/PostLayout';
import  { AuthenticationContext } from '../Firebase/Authenticated';

const MainPage =() =>{
    const [posts, setPosts] = useState([]);
    
    const {user} = useContext(AuthenticationContext);

    useEffect(() => {
        var following = [user.uid];

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

            <div className="feedPosts"> 

                {
                    posts.map(({id, post}) => ( 
                    <PostLayout key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} timestamp={post.timestamp}/>
                    ))
                } 
            </div>

            
        </div>
);

};

export default MainPage;