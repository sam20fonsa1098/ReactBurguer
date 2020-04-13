import React from 'react'
import classes from './Logo.css'
import burguerLogo from '../../assets/images/logo.png'

const logo = (props) => {
    return (
        <div className = {classes.Logo}>
            <img src = {burguerLogo} alt = "MyBurguer"></img>
        </div>
    );
};

export default logo;