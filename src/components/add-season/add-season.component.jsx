import React from 'react';
import { Formik } from 'formik';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Box, Button, TextField, FormLabel, Grid, Card, CardMedia } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { LoadingScreen, UploadMedia } from 'components';

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
        alignItems: 'center'
    },
    textField: {
        display: 'flex',
        margin: theme.spacing(1),
        width: '300px'
    },
    picker: {
        paddingRight: '8px'
    },
    label: {
        alignItems: 'center',
        display: 'flex'
    },
    px: {
        paddingRight: 20
    },
    uploadPanel: {
        minHeight: 100,
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '-8px'
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
        minHeight: 100,
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

function AddSeasonComponent(props) {
    const {
        initialState,
        open,
        handleClose,
        handleAddSeason,
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
                    Season
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
                                                        fullWidth={true}
                                                        error={Boolean(touched.seasonName && errors.seasonName)}
                                                        label="Name"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="text"
                                                        name="seasonName"
                                                        id="seasonName"
                                                        value={values.seasonName}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddSeason(e.target.id, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.seasonName && errors.seasonName}
                                                        required
                                                    />
                                                </div>
                                                <div className={classes.textField}>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <DatePicker
                                                            views={['year']}
                                                            error={Boolean(touched.seasonYear && errors.seasonYear)}
                                                            label="Year"
                                                            margin="dense"
                                                            variant="outlined"
                                                            type="text"
                                                            name="seasonYear"
                                                            id="seasonYear"
                                                            value={initialState.seasonYear}
                                                            onChange={(e) => {
                                                                handleAddSeason('seasonYear', e);
                                                            }}
                                                            onBlur={handleBlur}
                                                            helperText={touched.seasonYear && errors.seasonYear}
                                                            required
                                                            inputVariant="outlined"
                                                            className={classes.picker}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                    <TextField
                                                        error={Boolean(touched.episodes && errors.episodes)}
                                                        label="Episodes"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="number"
                                                        name="episodes"
                                                        id="episodes"
                                                        value={values.episodes}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddSeason(e.target.name, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.episodes && errors.episodes}
                                                        required
                                                    ></TextField>
                                                </div>

                                                <div className={classes.textField}>
                                                    <TextField
                                                        fullWidth={true}
                                                        error={Boolean(
                                                            touched.releaseSentence && errors.releaseSentence
                                                        )}
                                                        label="Release sentence"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="text"
                                                        name="releaseSentence"
                                                        id="releaseSentence"
                                                        value={values.releaseSentence}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddSeason(e.target.id, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.releaseSentence && errors.releaseSentence}
                                                        multiline
                                                        rows={2}
                                                    />
                                                </div>
                                                <div className={classes.textField}>
                                                    <TextField
                                                        fullWidth={true}
                                                        error={Boolean(touched.seasonDesc && errors.seasonDesc)}
                                                        label="Description"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="text"
                                                        name="seasonDesc"
                                                        id="seasonDesc"
                                                        value={values.seasonDesc}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddSeason(e.target.id, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.seasonDesc && errors.seasonDesc}
                                                        multiline
                                                        rows={2}
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
                                                        {initialState.seasonImgUrl && (
                                                            <Grid item>
                                                                <Card
                                                                    key="seasonImgUrl"
                                                                    className={classes.mediaContainer}
                                                                    variant="outlined"
                                                                >
                                                                    <CardMedia
                                                                        src={initialState.seasonImgUrl}
                                                                        image={initialState.seasonImgUrl}
                                                                        className={classes.media}
                                                                    />
                                                                    <Typography
                                                                        variant="subtitle2"
                                                                        color="textSecondary"
                                                                    >
                                                                        {initialState.seasonImgUrl.split('/').pop()}
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

export default AddSeasonComponent;
