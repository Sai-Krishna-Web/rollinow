import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles((theme) => ({
    genresContainer: {
        display: 'flex'
    },
    genreTitle: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px'
    },
    chip: {
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
                    Genres :{' '}
                </Typography>
            </div>
            <ChipInput
                dataSource={genresSource}
                type="text"
                name="genres"
                id="genres"
                alwaysShowPlaceholder={true}
                variant="standard"
                placeholder="add genres"
                disableUnderline={true}
                value={genres}
                onAdd={(chip) => handleGenre(chip)}
                onDelete={(chip, index) => handleGenre(chip, index, true)}
                InputProps={{
                    disableUnderline: true,
                    border: 'none'
                }}
                classes={{
                    chip: classes.chip
                }}
            />
        </Grid>
    );
}

export default GenresComponent;
