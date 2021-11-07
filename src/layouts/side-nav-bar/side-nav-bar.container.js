import React from 'react';
import SideNavBarComponent from './side-nav-bar.component';
import MovieOutlinedIcon from '@material-ui/icons/MovieOutlined';
import SlideshowOutlinedIcon from '@material-ui/icons/SlideshowOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import RecentActorsOutlinedIcon from '@material-ui/icons/RecentActorsOutlined';
import HorizontalSplitOutlinedIcon from '@material-ui/icons/HorizontalSplitOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import MovieFilterOutlinedIcon from '@material-ui/icons/MovieFilterOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

import { setRoute } from '../../utilities';
import { useLogout } from '../../contexts/auth';

function SideNavBar(props) {
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
            name: 'Platforms',
            path: 'platforms',
            icon: <SubscriptionsOutlinedIcon />,
            onClick: () => {
                setRoute('/platforms');
            }
        },
        {
            name: 'Genres',
            path: 'genres',
            icon: <MovieFilterOutlinedIcon />,
            onClick: () => {
                setRoute('/genres');
            }
        },
        {
            name: 'Languages',
            path: 'languages',
            icon: <LanguageOutlinedIcon />,
            onClick: () => {
                setRoute('/languages');
            }
        },
        {
            name: 'Missing Requests',
            path: 'missingRequests',
            icon: <AnnouncementOutlinedIcon />,
            onClick: () => {
                setRoute('/missingRequests');
            }
        },
        {
            name: 'New Requests',
            path: 'newRequests',
            icon: <AddBoxOutlinedIcon />,
            onClick: () => {
                setRoute('/newRequests');
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
    }, [document.location]);

    return (
        <SideNavBarComponent navLinks={navLinks} selectedNav={selectedNav} setSelectedNav={setSelectedNav} {...props} />
    );
}

export default SideNavBar;
