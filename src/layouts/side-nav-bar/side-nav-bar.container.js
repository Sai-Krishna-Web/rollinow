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
    const [selectedNav, setSelectedNav] = React.useState('');

    let navLinks = [
        {
            name: 'Home',
            path: '',
            icon: <HomeOutlinedIcon />,
            onClick: () => {
                setRoute('/');
            }
        },
        {
            name: 'Shows',
            path: 'shows',
            icon: <SlideshowOutlinedIcon />,
            onClick: () => {
                setRoute('/shows');
            }
        },
        {
            name: 'Movies',
            path: 'movies',
            icon: <MovieOutlinedIcon />,
            onClick: () => {
                setRoute('/movies');
            }
        },
        {
            name: 'Casts',
            path: 'casts',
            icon: <RecentActorsOutlinedIcon />,
            onClick: () => {
                setRoute('/casts');
            }
        },
        {
            name: 'Sections',
            path: 'sections',
            icon: <HorizontalSplitOutlinedIcon />,
            onClick: () => {
                setRoute('/sections');
            }
        },
        {
            name: 'Settings',
            path: 'settings',
            icon: <SettingsOutlinedIcon />,
            onClick: () => {
                setRoute('/settings');
            }
        }
    ];

    React.useEffect(() => {
        const currentPath = document.location.pathname.toString().split('/')[1];
        setSelectedNav(currentPath);
        // eslint-disable-next-line
    }, []);

    return <SideNavBarComponent navLinks={navLinks} selectedNav={selectedNav} setSelectedNav={setSelectedNav} />;
}

export default SideNavBar;
