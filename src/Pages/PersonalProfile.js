import React, {useState,useContext,useEffect} from 'react';
import ImageGrid from '../Components/ImageGrid'
import Modal from '../Components/Modal'
import Header from '../Components/Header'
import './Profile.css';
import {AuthenticationContext} from "../Authenticated";
import {database} from "../firebase"


const ProfilePage = () => {
    document.title ='Fakestagram - My Profile';
    const [selectedImg, setSelectedImg] = useState(null);
    const{user} = useContext(AuthenticationContext);
    
    //counts of profile that you are currently on 
    const [userFollowersCount,setUserFollowersCount]=useState(0);
    const [userFollowingCount,setUserFollowingCount]=useState(0);
    const [name,setName]=useState('');    

    useEffect(() =>{

            database.collection('users').doc(user.uid).get().then((doc)=>{
                setUserFollowersCount(doc.data().followersCount);
                setUserFollowingCount(doc.data().followingCount);
                setName(doc.data().username);
            }).catch((error)=>{alert(error.message);})
        
    },[user]);
        
    return(
        <div>
            <div>
                <Header/>
            </div>
            <div className="profileHeader">
                My Profile
            </div>
            <div>                          
                <div>User: {name}</div>
                <div>Followers: {userFollowersCount} </div>
                <div> Following: {userFollowingCount} </div>
            </div>
            <div>
                <ImageGrid setSelectedImg={setSelectedImg}/>
                {selectedImg && <Modal selectedImg = {selectedImg} setSelectedImg={setSelectedImg}/>}
            </div>
        </div>
    );

};

export default ProfilePage;