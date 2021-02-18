import React,{useState,useContext,useEffect} from 'react';
import useFirestore from '../Hooks/useFirestore';
import {database} from '../firebase';
import './ImageGrid.css';
import {AuthenticationContext} from "../Authenticated";
import PostLayout from './PostLayout';

const ImageGrid = ({setSelectedImg}) => {

    const{user} = useContext(AuthenticationContext);
    const[docs,setDocs]=useState([]);
    
    useEffect(()=>{
        database.collection('posts')
        .where('uid','==',user.uid)
        .onSnapshot(snapshot => {
            setDocs(snapshot.docs.map(doc=>doc.data()))
        
    })
    },[])
    
const [initial,setInitial]=useState("TD");
    return(
        
         <div className = "imgGrid">
             {docs && docs.map((doc)=>(
                 <div className = "imgWrap" key = {doc.id}
                  onClick= {() => setSelectedImg(doc.imageUrl)}
                  >
                
                      {/* {<PostLayout profileInitials={initial} date={doc.timestamp} username={doc.username} imageURL={doc.imageUrl} caption={doc.caption} comment={initial}/>} */}
                    
                     <img src={doc.imageUrl} alt = "uploaded"/>
            </div>
             ))}
         </div>
        
    );
};

export default ImageGrid;