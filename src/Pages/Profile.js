import React, {useState,useContext,useEffect} from 'react';
import ImageGrid from '../Components/ImageGrid'
import Modal from '../Components/Modal'
import Header from '../Components/Header'
import './Profile.css';
import {AuthenticationContext} from "../Authenticated";
import {database} from "../firebase"
import FollowButton from '../Components/FollowButton';

const ProfilePage = () => {
    
    document.title ='Stratus - Profiles';
    const [selectedImg, setSelectedImg] = useState(null);
    const[selectedUser,setSelectedUser] = useState(null);
    const{user} = useContext(AuthenticationContext);
    
    //counts of profile that you are currently on 
    const [userFollowersCount,setUserFollowersCount]=useState(0);
    const [userFollowingCount,setUserFollowingCount]=useState(0);
    const [name,setName]=useState('');
    const [selectedUserUid,setSelectedUserUid] = useState('');
    const [followInvoked,setFollowInvoked] = useState(false);
    const [isFollower,setIsFollower] = useState(false);

    const follow = async() => {
       
       var currentUser = user.uid;

        console.log(currentUser);
        console.log("Selected User: " + selectedUser);
        var selectedUserId;
        
        //get the user to be followed by username
        await database.collection('users').where('username','==',selectedUser).get().then((snapshot) => {
            snapshot.forEach((doc)=>{
                const document=doc.data();
                selectedUserId=document.uid;
                console.log("selected ID"+ selectedUserId);
                //creating a new document with its resppective id
                database.collection('users').doc(doc.id).collection('followers').doc(currentUser).set({followerId: currentUser});
                //increment followers count of the account to be followed
                var followersCount=document.followersCount;
                //get all data (followingCount,id and username) the same way and put it in the set or else theyll disappear (overwritten)
                followersCount++;
                var followingCount=document.followingCount;
                var uid=document.uid;
                var username=document.username;
                database.collection('users').doc(doc.id).set({
                    followersCount: followersCount,
                    followingCount:followingCount,
                    uid:uid,
                    username: username,
                 });
        })
    }).catch((error) => {console.log("Error getting document:", error);});

    var followersCount;
    var uid;
    var username;
    var followingCount;
    //get the authenticated user's document
    await database.collection('users').doc(currentUser).get().then((doc)=>{
        
        followersCount=doc.data().followersCount;
        followingCount=doc.data().followingCount;
        followingCount++;
        username = doc.data().username;
        uid = doc.data().uid;
    
    })
    .catch((error) => {console.log("Error getting document:", error);});

    
    //update the authenticated user's document with the new followingCount
    await database.collection('users').doc(currentUser).set({
        
        followersCount: followersCount,
        followingCount:followingCount,
        uid:uid,
        username: username,
    
    })
    .catch((error) => {console.log("Error getting document:", error);});

    await database.collection('users').doc(currentUser).collection("following").doc(selectedUserId).set({
        followingId: selectedUserId
    }).catch((error) => {console.log("Error getting document:", error);});
    
    setFollowInvoked(true);
    };

     
        
    // useEffect(() =>{

        //getting selected user's username from database
        database.collection('selectedUser').doc(user.uid).get().then((doc)=>{
            
            setSelectedUser(doc.data().selectedUser);
        
        }).catch((error) => {console.log("Error getting document:", error);});

    useEffect(() =>{
        
        database.collection('users').where('username','==',selectedUser).get().then((snapshot) => {
            snapshot.forEach((doc)=>{
                const document = doc.data();
                setSelectedUserUid(document.uid);
                setUserFollowersCount(document.followersCount);
                setUserFollowingCount(document.followingCount);
                setName(document.username);
                
            })
        }).catch((error)=>{alert(error.message);})

        database.collection('users').doc(user.uid).collection('following').where('followingId','==',selectedUserUid).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                    setIsFollower(true);
            })  
        }).catch((error)=>{alert(error.message);})
        
        console.log("useEffect Profile");
    },[selectedUser,followInvoked,selectedUserUid,user]);

    return(
        <div>
            <div>
                <Header/>
            </div>
            <div className="profileHeader">
                Profile
            </div>
            <div>          

                <FollowButton selectedUserUid={selectedUserUid} isFollower={isFollower} follow={follow}/>
                
                <div>User: {name}</div>
                <div>Followers: {userFollowersCount} </div>
                <div> Following: {userFollowingCount} </div>
            </div>
            <div>
                <ImageGrid setSelectedImg={setSelectedImg} profile = {selectedUserUid}/>
                {selectedImg && <Modal selectedImg = {selectedImg} setSelectedImg={setSelectedImg}/>}
            </div>
        </div>
    );

};

export default ProfilePage;