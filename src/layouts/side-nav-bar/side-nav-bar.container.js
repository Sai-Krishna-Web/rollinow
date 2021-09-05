import React from 'react';
import SideNavBarComponent from './side-nav-bar.component';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import SlideshowOutlinedIcon from '@material-ui/icons/SlideshowOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import RecentActorsOutlinedIcon from '@material-ui/icons/RecentActorsOutlined';

import { setRoute } from '../../utilities'

function SideNavBar() {
    let navLinks = [
        {
            name: 'Home',
            icon: <HomeOutlinedIcon />,
            onClick: () => {
                setRoute('/home');
            }
        },
        {
            name: 'Shows',
            icon: <SlideshowOutlinedIcon />,
            onClick: () => {
                setRoute('/shows');
            }
        },
        {
            name: 'Movies',
            icon: <MovieOutlinedIcon />,
            onClick: () => {
                setRoute('/Movies');
            }
        },
        {
            name: 'Casts',
            icon: <RecentActorsOutlinedIcon />,
            onClick: () => {
                setRoute('/casts');
            }
        },
        {
            name: 'Settings',
            icon: <SettingsOutlinedIcon />,
            onClick: () => {
                setRoute('/settings');
            }
        },
    ]
    return <SideNavBarComponent navLinks={navLinks} />;
}

export default SideNavBar;
