import React from 'react';
import HomeComponent from './home.component';
import { userContext } from '../../contexts/auth';

function Home() {
    const user = userContext();
    return <HomeComponent user={user} />;
}

export default Home;
