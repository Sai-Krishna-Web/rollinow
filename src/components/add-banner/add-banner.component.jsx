import React from 'react';
import { Formik } from 'formik';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { bannerPlace, sectionPlace } from 'utilities';

import { Dialog, IconButton, Typography, Box, Button, TextField, MenuItem } from '@material-ui/core';

import { Picker, LoadingScreen } from 'components';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '20px 0px',
        alignItems: 'center'
    },
    textField: {
        display: 'flex',
        margin: theme.spacing(1),
        width: '40ch'
    },
    label: {
        alignItems: 'center',
        display: 'flex'
    },
    px: {
        paddingRight: 20
    },
    ml: {
        marginLeft: '-8px'
    },
    uploadPanel: {
        minHeight: 150,
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '-12px'
    },
    image: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(1),
        width: '300px'
    },
    mediaContainer: {
        marginLeft: '16px',
        width: '100px'
    },
    media: {
        minHeight: 150,
        minWidth: 100,
        backgroundColor: '#171717',
        backgroundSize: 'contain'
    }
}));
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h2">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-around'
    }
}))(MuiDialogActions);

function AddBannerComponent(props) {
    const { initialState, open, handleClose, handleAddBanner, handleSubmit, enableSubmit, validate, loading } = props;
    const classes = useStyles();
    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Banner
                </DialogTitle>
                <DialogContent dividers>
                    <Box my={2}>
                        <Formik initialValues={initialState} validate={validate}>
                            {(formik) => {
                                const { values, handleChange, errors, touched, handleBlur } = formik;
                                return (
                                    <div>
                                        <form>
                                            <div className={classes.root}>
                                                <div>
                                                    <TextField
                                                        error={Boolean(touched.place && errors.place)}
                                                        label="Place"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="text"
                                                        name="place"
                                                        id="place"
                                                        value={values.place}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddBanner(e.target.name, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.place && errors.place}
                                                        className={classes.textField}
                                                        select
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {Object.keys(bannerPlace).map((key, index) => (
                                                            <MenuItem value={key} key={index}>
                                                                {bannerPlace[key]}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </div>
                                                <div className={classes.textField}>
                                                    {' '}
                                                    <Picker
                                                        type={sectionPlace.SHOW}
                                                        setPickerId={(id, value) => handleAddBanner('showId', value)}
                                                        input={initialState.show?.title || ''}
                                                    ></Picker>
                                                </div>

                                                <div className={classes.textField}>
                                                    {' '}
                                                    <Picker
                                                        type={sectionPlace.GENRE}
                                                        setPickerId={(id, value) => handleAddBanner('genreId', value)}
                                                        input={initialState.genreId || ''}
                                                    ></Picker>
                                                </div>
                                                <div className={classes.textField}>
                                                    {' '}
                                                    <Picker
                                                        type={sectionPlace.LANGUAGE}
                                                        setPickerId={(id, value) =>
                                                            handleAddBanner('languageId', value)
                                                        }
                                                        input={initialState.languageId || ''}
                                                    ></Picker>
                                                </div>

                                                <div className={classes.textField}>
                                                    {' '}
                                                    <Picker
                                                        type={sectionPlace.PLATFORM}
                                                        setPickerId={(id, value) =>
                                                            handleAddBanner('platformId', value)
                                                        }
                                                        input={initialState.platformId || ''}
                                                    ></Picker>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                );
                            }}
                        </Formik>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained" disabled={!enableSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <LoadingScreen open={loading}></LoadingScreen>
        </div>
    );
}

export default AddBannerComponent;
