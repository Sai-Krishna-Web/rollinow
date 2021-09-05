import React, { useState } from 'react';
import styles from './header.module.scss';
import logo from '../../assets/images/logo.svg';
import { AppBar, Toolbar, Menu, IconButton, Button, Box, CardActions, CardContent } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#171717'
    },
}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

function HeaderComponent(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout, user } = props

    return (
        <React.Fragment>
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar disableGutters={true}>
                    <div className={styles.logo}>
                        <img src={logo}
                            alt='Rollinow'
                        />
                    </div>

                    <div>
                        <IconButton
                            aria-owns={anchorEl ? 'menu-appbar' : undefined}
                            aria-haspopup='true'
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            color='inherit'
                        >
                            <AccountCircle />
                        </IconButton>
                        <StyledMenu
                            id='menu-appbar'
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(false)}
                        >
                            <Box className={styles.profile}>
                                <div className={styles.img}>{user.name.charAt(0)}</div>
                                <CardContent>
                                    <h4>{user.name}</h4>
                                    <span>{user.email}</span>
                                </CardContent>
                                <CardActions>
                                    <Button variant='outlined' onClick={logout}>Logout</Button>
                                </CardActions>
                            </Box>
                        </StyledMenu>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>)
}

export default HeaderComponent;
