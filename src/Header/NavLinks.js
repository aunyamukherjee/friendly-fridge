import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';

import { AuthContext } from '../shared/context/auth-context';

import './NavLinks.css';

const NavLinks = props => {

    const auth = useContext(AuthContext);

    return <ul className="nav-links">
        {auth.isLoggedIn && (
            <li>
                <NavLink to ="/food/new">ADD</NavLink>
            </li>
        )}
                {/* {auth.isLoggedIn && (
            <li>
                <NavLink to ="/users" exact>ALL USERS</NavLink>
            </li>
        )} */}
        {!auth.isLoggedIn && (
            <li>

                <NavLink to ="/auth" exact>AUTHENTICATE</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
        <li>
            <button onClick={auth.logout}>LOGOUT</button>
        </li>
        )
        }
    </ul>
};

export default NavLinks;