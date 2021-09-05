import React from 'react';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import style from './side-nav-bar.module.scss';

function SideNavBarComponent(props) {
    return (
        <React.Fragment>
            <Box pt={2} >
                <List component="nav">
                    {props.navLinks.map((navLink, index) => (
                        <ListItem button onClick={navLink.onClick} key={index}>
                            {navLink.icon}
                            <Typography component="span" className={style.navTittle}>
                                {navLink.name}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </React.Fragment>
    )
}

export default SideNavBarComponent