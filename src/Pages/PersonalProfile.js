import React, {useState,useContext,useEffect} from 'react';
import ImageGrid from '../Components/ImageGrid'
import Modal from '../Components/Modal'
import Header from '../Components/Header'
import './Profile.css';
import {AuthenticationContext} from "../Authenticated";
import {database} from "../firebase"
import './PersonalProfile.css';

const ProfilePage = () => {
    document.title ='Stratus - My Profile';
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
            <div className="profileInfo">  
                <img alt="profilePic" className="profilePic" src="/images/circle.png"/>  
                <div>
                <div className = "username"> {name} </div>
                    <div className ="follow">
                        Followers: {userFollowersCount} &nbsp;
                        Following: {userFollowingCount}
                    </div>
                </div>                       
            </div>
            <div>
                <ImageGrid setSelectedImg={setSelectedImg}/>
                {selectedImg && <Modal selectedImg = {selectedImg} setSelectedImg={setSelectedImg}/>}
            </div>
        </div>
    );

};

export default ProfilePage;