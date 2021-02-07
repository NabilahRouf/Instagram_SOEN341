import React, {useState} from 'react';
import ImageGrid from '../Components/ImageGrid'
import Modal from '../Components/Modal'
import Header from '../Components/Header'
import './Profile.css';

const ProfilePage = () => {
    document.title ='Fakestagram - Profiles';
    const [selectedImg, setSelectedImg] = useState(null);

    return(
        <div>
            <div>
                <Header/>
            </div>
            <div className="profileHeader">
                Profile
            </div>
            <div>
                <ImageGrid setSelectedImg={setSelectedImg}/>
                {selectedImg && <Modal selectedImg = {selectedImg} setSelectedImg={setSelectedImg}/>}
            </div>
        </div>
    );

};

export default ProfilePage;