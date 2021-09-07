import React from 'react';
import SideNavBarComponent from './side-nav-bar.component';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import SlideshowOutlinedIcon from '@material-ui/icons/SlideshowOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import RecentActorsOutlinedIcon from '@material-ui/icons/RecentActorsOutlined';
import HorizontalSplitOutlinedIcon from '@material-ui/icons/HorizontalSplitOutlined';

import { setRoute } from '../../utilities';

function SideNavBar() {
    const [selectedNav, setSelectedNav] = React.useState(0);
    let navLinks = [
        {
            name: 'Home',
            icon: <HomeOutlinedIcon />,
            onClick: () => {
                setRoute('/');
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
            name: 'Sections',
            icon: <HorizontalSplitOutlinedIcon />,
            onClick: () => {
                setRoute('/sections');
            }
        },
        {
            name: 'Settings',
            icon: <SettingsOutlinedIcon />,
            onClick: () => {
                setRoute('/settings');
            }
        }
    ];
    return <SideNavBarComponent navLinks={navLinks} selectedNav={selectedNav} setSelectedNav={setSelectedNav} />;
}

export default SideNavBar;
