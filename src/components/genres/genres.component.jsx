import React from 'react';
import { makeStyles, Grid, Typography, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    genresContainer: {
        display: 'flex'
    },
    genreTitle: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px'
    },
    tag: {
        background: theme.palette.primary.light
    }
}));

function GenresComponent(props) {
    const { genres, handleGenre, genresSource } = props;
    const classes = useStyles();
    return (
        <Grid item xs={12} className={classes.genresContainer}>
            <div className={classes.genreTitle}>
                <Typography variant="subtitle1" align="left">
                    Genres:
                </Typography>
            </div>
            <Autocomplete
                onChange={(event, value, reason) => handleGenre(value, reason)}
                disableClearable
                forcePopupIcon={false}
                size="small"
                filterSelectedOptions
                fullWidth={true}
                multiple
                id="tags-standard"
                options={genresSource}
                value={genres}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        placeholder="add genres"
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true
                        }}
                    />
                )}
                classes={{
                    tag: classes.tag
                }}
            />
        </Grid>
    );
}

export default GenresComponent;
