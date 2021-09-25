import React from 'react';
import { Box, List, ListItem, Typography, ListItemIcon, withStyles } from '@material-ui/core';
import style from './side-nav-bar.module.scss';

const ThemeListItem = withStyles((theme) => ({
    root: {
        '&$selected': {
            borderRadius: `${theme.palette.borderRadius}px`,
            backgroundColor: '#d5fbf4',
            '& .MuiListItemIcon-root': {
                color: theme.palette.primary.main
            }
        },
        '&:hover': {
            borderRadius: `${theme.palette.borderRadius}px`,
            backgroundColor: '#d5fbf4',
            '& .MuiListItemIcon-root': {
                color: theme.palette.primary.main
            }
        }
    },
    selected: {}
}))(ListItem);

function SideNavBarComponent(props) {
    const { navLinks, selectedNav, setSelectedNav } = props;
    return (
        <React.Fragment>
            <Box pt={2}>
                <List component="nav">
                    {navLinks.map((navLink, index) => (
                        <ThemeListItem
                            button
                            selected={selectedNav === navLink.path}
                            onClick={() => {
                                setSelectedNav(navLink.path);
                                navLink.onClick();
                            }}
                            key={index}
                        >
                            <ListItemIcon>{navLink.icon}</ListItemIcon>

                            <Typography component="span" className={style.navTittle}>
                                {navLink.name}
                            </Typography>
                        </ThemeListItem>
                    ))}
                </List>
            </Box>
        </React.Fragment>
    );
}

export default SideNavBarComponent;
