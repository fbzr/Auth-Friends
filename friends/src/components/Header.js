import React from 'react';
import { Typography } from '@material-ui/core';
import friendsImg from '../friends.png'
const Header = () => {
    return (
        <div style={{margin: '15px 0'}}>
            <img src={friendsImg} alt="Friends"/>
        </div>
    )
}

export default Header
