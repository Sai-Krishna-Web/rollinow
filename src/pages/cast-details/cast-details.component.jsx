import React from 'react';
import { PageHeader } from 'components';
import { Box, CircularProgress, makeStyles, Paper, CardMedia, CardContent, Grid, Typography } from '@material-ui/core';
import { SectionsList } from 'components';
import imagePlaceHolder from '../../assets/images/imagePlaceHolder.jpg';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        minWidth: 300,
        border: '1px solid #ddd',
        boxShadow: 'none'
    },
    media: {
        height: 200,
        minWidth: 200,
        maxWidth: 200,
        backgroundColor: '#171717',
        backgroundSize: 'contain',
        borderRadius: `${theme.palette.borderRadius}px`
    }
}));

const CastDetailsComponent = (props) => {
    const classes = useStyles();
    const { pageData, loading, error, data, movies } = props;
    return (
        <Paper variant="outlined" style={{ margin: 'auto' }}>
            <PageHeader pageData={pageData} />
            <div style={{ minHeight: '600px', textAlign: 'center' }}>
                {loading ? (
                    <Box textAlign="center" py={5}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box textAlign="center" py={5}>
                        An error occurred, please try reloading your browser.
                    </Box>
                ) : (
                    <>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    {' '}
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        title={data.getArtist.name}
                                        src={data.getArtist.thumbnailUrl}
                                        onError={(e) => {
                                            e.target.src = imagePlaceHolder;
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography gutterBottom variant="h4">
                                                    {data.getArtist.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography gutterBottom variant="h6">
                                                    {data.getArtist.biography}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Paper>
                        {data?.getArtist?.characters && (
                            <Box m={2} sx={{ textAlign: 'left' }}>
                                <div>
                                    <h4>Shows</h4>
                                </div>
                                <Paper variant="outlined">
                                    <SectionsList
                                        rows={data.getArtist.characters}
                                        columns={props.columns}
                                        onRowClick={() => undefined}
                                        editClick={props.editClick}
                                        deleteClick={props.deleteClick}
                                        refetch={props.refetch}
                                    />
                                </Paper>
                            </Box>
                        )}
                        {movies?.getArtist?.characters && (
                            <Box m={2} sx={{ textAlign: 'left' }}>
                                <div>
                                    <h4>Movies</h4>
                                </div>
                                <Paper variant="outlined">
                                    <SectionsList
                                        rows={movies.getArtist.characters}
                                        columns={props.columns}
                                        onRowClick={() => undefined}
                                        editClick={props.editClick}
                                        deleteClick={props.deleteClick}
                                        refetch={props.refetch}
                                    />
                                </Paper>
                            </Box>
                        )}
                    </>
                )}
            </div>
        </Paper>
    );
};

export default CastDetailsComponent;
