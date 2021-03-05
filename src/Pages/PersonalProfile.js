import React, {useState,useContext} from 'react';
import ImageGrid from '../Components/ImageGrid'
import Modal from '../Components/Modal'
import './Profile.css';
import Avatar from "@material-ui/core/Avatar";
import {AuthenticationContext} from "../Authenticated";
import {database} from "../firebase"
import './PersonalProfile.css';
import { makeStyles } from '@material-ui/core/styles';
import HeaderProfile from '../Components/HeaderProfile';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(17),
      height: theme.spacing(17),
      backgroundColor: '#BEE6EE',
      fontSize:'5em',
      color: '#808080',
      
    },
  }));

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: '#f5f5f5',
            height: 0.1
        }}
    />
);
  

const ProfilePage = () => {
    document.title ='Stratus - My Profile';
    const [selectedImg, setSelectedImg] = useState(null);
    const{user} = useContext(AuthenticationContext);
    const classes = useStyles();
    
    //counts of profile that you are currently on 
    const [userFollowersCount,setUserFollowersCount]=useState(0);
    const [userFollowingCount,setUserFollowingCount]=useState(0);
    const [name,setName]=useState('');    

    database.collection('users').doc(user.uid).get().then((doc)=>{
        const document= doc.data();
        setUserFollowersCount(document.followersCount);
        setUserFollowingCount(document.followingCount);
        setName(document.username);
    }).catch((error)=>{alert(error.message);})
        
    return(
        <div>
            <div>
                <HeaderProfile/>
            </div>
            <div className="profileInfo"> 
                <div className="userIconAvatar">
                <Avatar className = {classes.large} alt= {name} src="/static/images/avatar/1.jpg"/>
                </div>                                                         
                <div>
                <div className = "username"> {name} </div>
                    <div className ="follow">
                        <strong>Followers:</strong> {userFollowersCount} &nbsp;
                        <strong>Following: </strong>{userFollowingCount}
                    </div>
                </div>                       
            </div>
            <ColoredLine/>
            <div>
                <ImageGrid setSelectedImg={setSelectedImg}  profile ={user.uid}/>
                {selectedImg && <Modal selectedImg = {selectedImg} setSelectedImg={setSelectedImg}/>}
            </div>
        </div>
    );

};

export default ProfilePage;