import React, {useState,useContext} from 'react';
import ImageGrid from '../Components/Grids/ImageGrid'
import Modal from '../Components/Modals/Modal'
import './Profile.css';
import Avatar from "@material-ui/core/Avatar";
import  { AuthenticationContext } from '../Firebase/Authenticated';
import {database} from "../Firebase/firebase"
import './PersonalProfile.css';
import { makeStyles } from '@material-ui/core/styles';
import HeaderProfile from '../Components/Headers/HeaderProfile';
import ListModal from '../Components/Modals/ListModal';



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
                        <ListModal followType = {"followers"} count={userFollowersCount}/>&nbsp;
                        <ListModal followType= {"following"}  count ={userFollowingCount}/>
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