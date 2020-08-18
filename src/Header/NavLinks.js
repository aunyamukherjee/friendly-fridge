import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to ="/food/new">ADD</NavLink>
        </li>
        <li>
            <NavLink to ="/authenticate/login" exact>LOGIN</NavLink>
        </li>
        <li>
            <NavLink to ="/search">SEARCH</NavLink>
        </li>
    </ul>
};

export default NavLinks;