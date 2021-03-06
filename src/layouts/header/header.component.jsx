import React, { useState } from 'react';
import styles from './header.module.scss';
import logo from '../../assets/images/logo.svg';
import { Avatar, ButtonBase, Menu, IconButton, Button, Box, CardActions, CardContent } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

const useStyles = makeStyles((theme) => ({
    buttonBase: {
        //margin: '0px 24px',
        borderRadius: '10px'
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.primary.light,
        color: theme.palette.primary.main,
        '&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.primary.light
        }
    },
    boxContainer: {
        width: '228px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        }
    }
}));

const StyledMenu = withStyles((theme) => ({
    paper: {
        border: '1px solid',
        borderColor: theme.palette.grey[200],
        paddingTop: theme.spacing(2)
    }
}))((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        {...props}
    />
));

function HeaderComponent(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout, user, setOpen, open } = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={styles.logo}>
                <Box sx={{ display: { xs: 'none', md: 'block' }, marginRight: '24px' }}>
                    <img src={logo} alt="Rollinow" width="180" />
                </Box>
                <ButtonBase className={classes.buttonBase}>
                    <Avatar
                        variant="rounded"
                        className={classes.headerAvatar}
                        onClick={() => setOpen(!open)}
                        color="primary"
                    >
                        <MenuOutlinedIcon stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </div>

            <div>
                <IconButton
                    aria-owns={anchorEl ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    color="primary"
                    size="small"
                >
                    <AccountCircle fontSize="large" />
                </IconButton>
                <StyledMenu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(false)}
                >
                    <Box className={styles.profile}>
                        <Avatar
                            alt={user.name}
                            variant="rounded"
                            className={classes.headerAvatar}
                            color="primary"
                            src={undefined}
                        >
                            {user.name.charAt(0)}
                        </Avatar>

                        <CardContent>
                            <h4>{user.name}</h4>
                            <span>{user.email}</span>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="outlined" color="secondary" onClick={logout}>
                                Log out
                            </Button>
                        </CardActions>
                    </Box>
                </StyledMenu>
            </div>
        </React.Fragment>
    );
}

export default HeaderComponent;
