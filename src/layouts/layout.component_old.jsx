import React, { useState } from 'react';
import Header from './header/header.container';
import SideNavBar from './side-nav-bar/side-nav-bar.container';
import Content from './content/content.container';
import style from './layout.module.scss';
import { Drawer, Grid, useMediaQuery, Paper } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

//
function LayoutComponent() {
    const mediaLessThan600px = useMediaQuery('(max-width:599px)');
    const [open, setOpen] = useState(!mediaLessThan600px);

    return (
        <React.Fragment>
            <Grid container className={style.container}>
                {!mediaLessThan600px ? (
                    <div className={style.headerContainer}>
                        <Header />
                    </div>
                ) : (
                    <Grid item xs={12} className={style.mobileHeader}>
                        <Grid container>
                            <Grid item xs={2} sm={2} className={style.menuIconContainer}>
                                <Menu className={style.menuIcon} onClick={() => setOpen(true)} />
                            </Grid>
                            <Grid item xs={9} sm={6} className={style.listMerchantsContainer}>
                                <Header />
                            </Grid>
                        </Grid>
                        <Drawer
                            open={open}
                            onClose={() => setOpen(false)}
                            classes={{
                                paper: style.navContainer
                            }}
                        >
                            <SideNavBar />
                        </Drawer>
                    </Grid>
                )}
                <Grid container className={style.mainContainer}>
                    {!mediaLessThan600px && (
                        <Grid item md={2}>
                            <Drawer
                                variant="permanent"
                                classes={{
                                    paper: style.navContainer
                                }}
                            >
                                <SideNavBar />
                            </Drawer>
                        </Grid>
                    )}
                    <Grid item xs={12} md={10}>
                        <Paper className={style.contentContainer} variant="outlined">
                            <Content />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default LayoutComponent;
