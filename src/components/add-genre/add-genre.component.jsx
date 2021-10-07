import React from 'react';
import { Formik } from 'formik';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import {
    Dialog,
    IconButton,
    Typography,
    Box,
    Button,
    TextField,
    Grid,
    FormLabel,
    Card,
    CardMedia
} from '@material-ui/core';

import { UploadMedia, LoadingScreen } from 'components';

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

function AddGenreComponent(props) {
    const {
        initialState,
        open,
        handleClose,
        handleAddGenre,
        handleSubmit,
        enableSubmit,
        validate,
        loading,
        afterUpload
    } = props;
    const classes = useStyles();
    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Genre
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
                                                <div className={classes.textField}>
                                                    <TextField
                                                        disabled={props.updateMode}
                                                        fullWidth={true}
                                                        error={Boolean(touched.genre && errors.genre)}
                                                        label="Genre"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="text"
                                                        name="genre"
                                                        id="genre"
                                                        value={values.genre}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddGenre(e.target.id, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.genre && errors.genre}
                                                    />
                                                </div>
                                                <div className={classes.image}>
                                                    <FormLabel
                                                        component="legend"
                                                        align="left"
                                                        className={classes.label + ' ' + classes.px}
                                                    >
                                                        Image
                                                    </FormLabel>{' '}
                                                    <div className={classes.textField}>
                                                        <Grid item className={classes.uploadPanel}>
                                                            <UploadMedia
                                                                location="platform"
                                                                afterUpload={afterUpload}
                                                                uploadProgress={props.uploadProgress}
                                                                setUploadProgress={props.setUploadProgress}
                                                            />
                                                        </Grid>
                                                        {initialState.image && (
                                                            <Grid item>
                                                                <Card
                                                                    key="image"
                                                                    className={classes.mediaContainer}
                                                                    variant="outlined"
                                                                >
                                                                    <CardMedia
                                                                        src={initialState.image}
                                                                        image={initialState.image}
                                                                        className={classes.media}
                                                                    />
                                                                    <Typography
                                                                        variant="subtitle2"
                                                                        color="textSecondary"
                                                                    >
                                                                        {initialState.image.split('/').pop()}
                                                                    </Typography>
                                                                </Card>
                                                            </Grid>
                                                        )}
                                                    </div>
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

export default AddGenreComponent;
