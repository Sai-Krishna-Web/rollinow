import React from 'react';
import HeaderComponent from './header.component';
import { useLogout, userContext } from '../../contexts/auth';

function Header() {
    const logout = useLogout();
    const user = userContext();
    return <HeaderComponent logout={logout} user={user} />;
}

export default Header;
