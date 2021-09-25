import React from 'react';
import HeaderComponent from './header.component';
import { useLogout, userContext } from '../../contexts/auth';

function Header(props) {
    const logout = useLogout();
    const user = userContext();
    return <HeaderComponent logout={logout} user={user} {...props} />;
}

export default Header;
