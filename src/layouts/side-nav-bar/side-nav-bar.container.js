import React from 'react';
import SideNavBarComponent from './side-nav-bar.component';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import SlideshowOutlinedIcon from '@material-ui/icons/SlideshowOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import RecentActorsOutlinedIcon from '@material-ui/icons/RecentActorsOutlined';
import HorizontalSplitOutlinedIcon from '@material-ui/icons/HorizontalSplitOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import { setRoute } from '../../utilities';
import { useLogout } from '../../contexts/auth';

function SideNavBar() {
    const [selectedNav, setSelectedNav] = React.useState('');
    const logout = useLogout();

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
            name: 'Log out',
            path: 'logout',
            icon: <ExitToAppOutlinedIcon />,
            onClick: () => logout()
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
