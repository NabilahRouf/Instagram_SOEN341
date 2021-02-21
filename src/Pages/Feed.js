import React, { useState , useEffect } from 'react';
import {auth, database} from "../firebase"
import Header from '../Components/Header'
import './Feed.css';
import PostLayout from '../Components/PostLayout';

const MainPage =() =>{
    const [posts, setPosts] = useState([]);

    // useeeffect -> tuns a peice of code based on a specific condition

    useEffect(() => {
        console.log("feed useeffect");
        // this is where the code runs, we are odrering posts by timestamps. 
        const unsubscribe = database.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
            // everytime a change happens like a new post, this code is fired
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        })
        return () => unsubscribe();
    }, [
        // condition, if emtpy then it updates when page refreshes
    ]);
    
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
                    <PostLayout key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
                    ))
                } 
            </div>

        
        </div>
);

};

export default MainPage;