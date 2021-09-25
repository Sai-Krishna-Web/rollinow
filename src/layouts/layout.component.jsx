import React, { useState } from 'react';
import Header from './header/header.container';
import SideNavBar from './side-nav-bar/side-nav-bar.container';
import Content from './content/content.container';
import { Drawer, useMediaQuery, Paper } from '@material-ui/core';
// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { AppBar, CssBaseline, Toolbar } from '@material-ui/core';
import clsx from 'clsx';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        backgroundColor: theme.palette.background.dark
    },
    appBarWidth: {
        transition: theme.transitions.create('width'),
        backgroundColor: theme.palette.background.dark
    },

    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: drawerWidth,
        padding: '0px 8px',
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderRight: 'none',
        [theme.breakpoints.up('md')]: {
            top: '80px'
        }
    },
    content: {
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    },
    paper: {
        borderColor: theme.palette.primary[200]
    }
}));

function LayoutComponent() {
    const classes = useStyles();
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = useState(!matchUpMd);

    return (
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                {/* header */}
                <AppBar
                    enableColorOnDark
                    position="fixed"
                    color="inherit"
                    elevation={0}
                    className={open ? classes.appBarWidth : classes.appBar}
                >
                    <Toolbar>
                        <Header open={open} setOpen={setOpen} />
                    </Toolbar>
                </AppBar>

                {/* drawer */}
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Drawer
                        //container={container}
                        variant={matchUpMd ? 'persistent' : 'temporary'}
                        anchor="left"
                        open={open}
                        onClose={() => setOpen(false)}
                        ModalProps={{ keepMounted: true }}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        color="inherit"
                    >
                        <SideNavBar />
                    </Drawer>
                </nav>
                {/*<Drawer open={open} onClose={() => setOpen(false)} classes={{}}></Drawer>*/}

                {/* main content */}
                <main
                    className={clsx([
                        classes.content,
                        {
                            [classes.contentShift]: open
                        }
                    ])}
                >
                    <Paper variant="outlined" className={classes.paper}>
                        <Content />
                    </Paper>
                </main>
            </div>
        </React.Fragment>
    );
}

export default LayoutComponent;
