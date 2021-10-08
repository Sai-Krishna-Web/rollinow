import React from 'react';
import { Avatar, Typography, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';

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
    }
}));

const HomeComponent = (props) => {
    const { user } = props;
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
            <Grid></Grid>
        </Grid>
    );
};

export default HomeComponent;
