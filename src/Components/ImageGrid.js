import React,{useState,useEffect} from 'react';
import {database} from '../firebase';
import './ImageGrid.css';


const ImageGrid = ({setSelectedImg, profile}) => {

    const[docs,setDocs]=useState([]);
    
    useEffect(()=>{
       const unsubscribe = database.collection('posts')
        .where('uid','==',profile)
        .orderBy('timestamp','desc')
        .onSnapshot(snapshot => {
            let documents = [];
                snapshot.forEach((doc)=>{
                    if(doc.data().uid===profile){
                        const post={
                            id: doc.id,
                           ...doc.data(),
                        }
                        documents.push(post);
                    }
                });
                 setDocs(documents);   
        
        
    })

    return () => {unsubscribe();}
    },[profile])
    
 

    return(
        
         <div className = "imgGrid">
             {docs && docs.map((doc)=>(
                 <div className = "imgWrap" key = {doc.id}
                  onClick= {() => setSelectedImg(doc.imageUrl)}
                  >
        
                    
                     <img src={doc.imageUrl} alt = "uploaded"/>
            </div>
             ))}
         </div>
        
    );
};

export default ImageGrid;