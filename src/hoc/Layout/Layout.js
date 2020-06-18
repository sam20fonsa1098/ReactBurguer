import React, {useState} from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToogleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    return(
        <Aux>
            <Toolbar isAuth = {props.isAuthenticated} clicked = {sideDrawerToogleHandler}></Toolbar>
            <SideDrawer 
                isAuth = {props.isAuthenticated}
                closed = {sideDrawerClosedHandler}
                open   = {showSideDrawer}>
            </SideDrawer>
            <main className = {classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);