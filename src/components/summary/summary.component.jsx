import React from 'react';
import { makeStyles, Paper, CardMedia, CardContent, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    },
    paper: {
        padding: theme.spacing(3),
        margin: 'auto',
        minWidth: 300,
        border: '1px solid #ddd',
        boxShadow: 'none',
        maxWidth: 'fit-content'
    },
    media: {
        height: '100%',
        minWidth: 200,
        backgroundColor: '#171717',
        backgroundSize: 'contain'
    }
}));

const SummaryComponent = (props) => {
    const { addShowForm } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h4>Summary</h4>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        {' '}
                        <CardMedia
                            className={classes.media}
                            image={addShowForm.thumbnailUrl}
                            title={addShowForm.title}
                        />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="h4">
                                        {addShowForm.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="h6">
                                        {addShowForm.tagline}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="subtitle2">
                                        {addShowForm.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="subtitle2">
                                        {addShowForm.keywords.join(', ')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="subtitle1" align="left">
                                        Release Date : {addShowForm.releaseDate}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="subtitle1" align="left">
                                        Duration : {addShowForm.duration}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="subtitle1" align="left">
                                        Indian OTT : {addShowForm.isIndianOTT ? 'Yes' : 'No'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="subtitle1" align="left">
                                        In favorites : {addShowForm.inFavorites ? 'Yes' : 'No'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default SummaryComponent;
