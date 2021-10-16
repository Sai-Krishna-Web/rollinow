import React from 'react';
import {
    Avatar,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Divider,
    CardHeader,
    Box,
    CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import { tmdbLink } from 'utilities/helper';
import { setRoute } from 'utilities';

const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: 8,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#28d9b8',
        boxShadow: 'none',
        borderRadius: 12,
        position: 'relative'
    },
    avatar: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary[200],
        marginRight: 10
    },
    account: {
        right: '-12px',
        color: '#158a82',
        bottom: '-14px',
        position: 'absolute',
        transform: 'rotate(315deg)'
    },
    listCard: {
        boxShadow: 'none',
        borderRadius: 12,
        position: 'relative',
        border: '1px solid #d4fbf4'
    },
    headerTitle: {
        fontSize: 18
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    scrollContainer: {
        height: 360,
        overflow: 'auto',
        overflowAnchor: 'none',
        position: 'relative'
    },
    actionButton: {
        textTransform: 'capitalize'
    }
}));

const HomeComponent = (props) => {
    const {
        user,
        topPlatforms,
        topPlatformsLoading,
        topPlatformsError,
        topLanguages,
        topLanguagesLoading,
        topLanguagesError,
        topGenres,
        topGenresLoading,
        topGenresError
    } = props;
    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card variant="rounded" className={classes.card}>
                    <CardContent>
                        <Typography variant="subtitle2" className={classes.account}>
                            {' '}
                            <AccountCircleTwoToneIcon style={{ fontSize: 90 }} />
                        </Typography>
                        <Grid container alignItems="center">
                            <Avatar round size={25} alt="Jane Smith" className={classes.avatar}>
                                {user.name.charAt(0)}
                            </Avatar>
                            <Typography variant="h2" style={{ color: '#fff' }}>
                                Hi {user.name}
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="rounded" className={classes.listCard}>
                    <CardHeader
                        title="Top platforms"
                        classes={{
                            title: classes.headerTitle
                        }}
                    />

                    <Divider />
                    <div className={classes.scrollContainer}>
                        <CardContent>
                            <Grid conatiner>
                                {topPlatformsLoading ? (
                                    <Box textAlign="center" py={5}>
                                        <CircularProgress />
                                    </Box>
                                ) : topPlatformsError ? (
                                    <Box textAlign="center" py={5}>
                                        An error occurred, please try reloading your browser.
                                    </Box>
                                ) : (
                                    topPlatforms.getTopPlatforms.map((platform, index) => {
                                        return (
                                            <Grid item key={index}>
                                                <Grid container spacing={3} alignItems="center">
                                                    <Grid item>
                                                        <Avatar
                                                            alt="Platform"
                                                            className="circular--portrait"
                                                            src={tmdbLink(platform?.source?.imageUrl)}
                                                        ></Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography>{platform?.source?.source}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        );
                                    })
                                )}
                            </Grid>
                        </CardContent>
                    </div>
                    <Divider />
                    <CardActions className={classes.cardActions}>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => setRoute('/platforms')}
                            className={classes.actionButton}
                        >
                            View all
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="rounded" className={classes.listCard}>
                    <CardHeader
                        title="Top languages"
                        classes={{
                            title: classes.headerTitle
                        }}
                    />

                    <Divider />
                    <div className={classes.scrollContainer}>
                        <CardContent>
                            <Grid conatiner>
                                {topLanguagesLoading ? (
                                    <Box textAlign="center" py={5}>
                                        <CircularProgress />
                                    </Box>
                                ) : topLanguagesError ? (
                                    <Box textAlign="center" py={5}>
                                        An error occurred, please try reloading your browser.
                                    </Box>
                                ) : (
                                    topLanguages.getTopLanguages.map((language, index) => {
                                        return (
                                            <Grid item key={index}>
                                                <Grid container spacing={3} alignItems="center">
                                                    <Grid item>
                                                        <Typography>{language?.language}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        );
                                    })
                                )}
                            </Grid>
                        </CardContent>
                    </div>
                    <Divider />
                    <CardActions className={classes.cardActions}>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => setRoute('/languages')}
                            className={classes.actionButton}
                        >
                            View all
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="rounded" className={classes.listCard}>
                    <CardHeader
                        title="Top genres"
                        classes={{
                            title: classes.headerTitle
                        }}
                    />

                    <Divider />
                    <div className={classes.scrollContainer}>
                        <CardContent>
                            <Grid conatiner>
                                {topGenresLoading ? (
                                    <Box textAlign="center" py={5}>
                                        <CircularProgress />
                                    </Box>
                                ) : topGenresError ? (
                                    <Box textAlign="center" py={5}>
                                        An error occurred, please try reloading your browser.
                                    </Box>
                                ) : (
                                    topGenres.getTopGenre.map((genre, index) => {
                                        return (
                                            <Grid item key={index}>
                                                <Grid container spacing={3} alignItems="center">
                                                    <Grid item>
                                                        <Typography>{genre?.genre}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        );
                                    })
                                )}
                            </Grid>
                        </CardContent>
                    </div>
                    <Divider />
                    <CardActions className={classes.cardActions}>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => setRoute('/genres')}
                            className={classes.actionButton}
                        >
                            View all
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default HomeComponent;
