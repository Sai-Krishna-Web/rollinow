import React from 'react';
import { UploadMedia, CircularProgressBar } from 'components';
import { makeStyles, Grid, TextField, MenuItem, CardMedia, Card, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StepIcon from '@material-ui/core/StepIcon';
import { tmdbLink } from 'utilities/helper';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '20px 0px'
    },
    textField: {
        margin: theme.spacing(1),
        width: '25ch'
    },
    uploadContainer: {
        margin: 'auto',
        justifyContent: 'center'
    },
    uploadPanel: {
        minHeight: 180,
        border: '1px solid #ddd',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    filesPanel: {
        display: 'flex',
        alignItems: 'center'
    },
    listItemIcon: {
        justifyContent: 'center'
    },
    mediaContainer: {
        margin: '0px  30px'
    },
    media: {
        height: 100,
        minWidth: 100,
        backgroundColor: '#171717',
        backgroundSize: 'contain'
    }
}));

const MediaFilesComponent = (props) => {
    const { addShowForm, mediaFiles, mediaType, uploadProgress, setMediaType, setUploadProgress, afterUpload } = props;
    const classes = useStyles();

    return (
        <div style={{ margin: 'auto' }}>
            <h4>Upload media files</h4>
            <div className={classes.root}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item className={classes.filesPanel}>
                        <List>
                            {Object.keys(mediaFiles).map((value, index) => {
                                return (
                                    <ListItem key={value} role={undefined} dense>
                                        <ListItemIcon className={classes.listItemIcon}>
                                            {mediaType === value && uploadProgress ? (
                                                <CircularProgressBar
                                                    variant="determinate"
                                                    value={parseInt(uploadProgress)}
                                                />
                                            ) : (
                                                <StepIcon
                                                    icon={index + 1}
                                                    active={addShowForm[`${value}`]}
                                                    color="primary"
                                                />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={mediaFiles[value]} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={5} sm container>
                        <Grid item xs={8}>
                            <Grid item>
                                <TextField
                                    label="Media type"
                                    margin="dense"
                                    variant="outlined"
                                    type="text"
                                    name="mediaType"
                                    id="mediaType"
                                    value={mediaType}
                                    onChange={(e) => {
                                        setMediaType(e.target.value);
                                    }}
                                    className={classes.textField}
                                    select
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="backdropUrl">Backdrop</MenuItem>
                                    <MenuItem value="thumbnailUrl">Thumbnail</MenuItem>
                                    <MenuItem value="trailerUrl">Trailer</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item className={classes.uploadPanel}>
                                <UploadMedia
                                    location="shows"
                                    afterUpload={afterUpload}
                                    uploadProgress={uploadProgress}
                                    setUploadProgress={setUploadProgress}
                                    disabled={Boolean(!mediaType)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                        {Object.keys(mediaFiles).map((value, index) => {
                            return (
                                addShowForm[`${value}`] && (
                                    <Card key={index} className={classes.mediaContainer} variant="outlined">
                                        <CardMedia
                                            src={tmdbLink(addShowForm[`${value}`])}
                                            image={tmdbLink(addShowForm[`${value}`])}
                                            className={classes.media}
                                        />
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {mediaFiles[value]}
                                        </Typography>
                                    </Card>
                                )
                            );
                        })}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default MediaFilesComponent;
