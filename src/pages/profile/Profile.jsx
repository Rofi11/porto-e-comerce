import React from 'react';
import MyNavBar from '../../componets/MyNavbar';
import { Link } from 'react-router-dom';
import "./Profile.css"
import { useSelector } from 'react-redux';

function Profile () {
    const {username, fotoProfile, fullname, bio} = useSelector((state) => state.auth)
    return (
        <div>
            <MyNavBar/>
            <div className='container-profile'>
                <div className="profile d-flex">
                    <div className="profile-image ">
                        <img src={fotoProfile} alt="" />
                    </div>
                    <div className="infoProfile">
                        <div className="info-profile-user my-1 d-flex">
                            <div className='info-profile-user-name'>{username}</div>
                            <Link to="/editProfile"><button>Edit Profile</button></Link>
                        </div>
                        <div className="info-profile-follow my-2 d-flex">
                            <div>0 kiriman</div>
                            <div>0 pengikut</div>
                            <div>0 diikuti</div>
                        </div>
                        <div className="info-profile-nameAsli mb-1">
                            {fullname}
                        </div>
                        <div>
                            {bio}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="option-profile d-flex justify-content-center mb-3">
                    <span>POSTINGAN</span>
                    <span>TERSIMPAN</span>
                    <span>DITANDAI</span>
                </div>
            </div>
        </div>
    )
}

export default Profile