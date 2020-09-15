import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../shared/context/auth-context';
import { useContext } from 'react';

import Header from "./index.js";
import NavLinks from './NavLinks.js'
import SideDrawer from './SideDrawer.js';
import Backdrop from '../shared/UIElements/Backdrop.js';
import './Navigation.css';

const Navigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    //const auth = useContext(AuthContext);
    
    const openDrawer = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawer = () => {
        setDrawerIsOpen(false);
    };
    
    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className="Drawer-Nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <Header>
                <button className="menu-button" onClick ={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                {/* {auth.isLoggedIn && (  */}
                    <h1 className ="Nav-Title">
                        <Link to ="/">FriendlyFridge</Link>
                    </h1>
                {/* )}  */}
            <nav className ="Header-Nav">
                <NavLinks />
            </nav>
            </Header>
        </React.Fragment>
    )
};

export default Navigation;