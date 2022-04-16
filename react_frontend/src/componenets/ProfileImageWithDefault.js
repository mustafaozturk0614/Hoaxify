import React from 'react';
import defaultPicture from '../asests/profile.png'

const ProfileImageWithDefault = (props) => {
    const {image, tempimage} = props
    let imgSource = defaultPicture
    if (image) {
        imgSource = '/images/profile/' + image
    }
    return (
        <img alt={`Profile`} src={tempimage || imgSource}  {...props}
             onError={(e) => {
                 e.target.src = defaultPicture
             }}
        />


    );
};

export default ProfileImageWithDefault;