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
import { Box, Button, TextField, FormControlLabel, Switch } from '@material-ui/core';

import { Picker, LoadingScreen, SnackBarAndAlert } from 'components';

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
        margin: '20px 0px'
    },
    textField: {
        margin: theme.spacing(1),
        width: '25ch'
    }
}));
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
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

function AddSectionEntryComponent(props) {
    const {
        initialState,
        open,
        handleClose,
        handleAddSectionEntry,
        handleSubmit,
        enableSubmit,
        validate,
        loading,
        onSuccess,
        onError,
        error,
        setOnError,
        setOnSuccess
    } = props;
    const classes = useStyles();
    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h2">New section entry</Typography>
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
                                                    {' '}
                                                    <Picker
                                                        type={props.section.type}
                                                        setPickerId={handleAddSectionEntry}
                                                        input={initialState.name}
                                                    ></Picker>
                                                </div>
                                                <div className={classes.textField}>
                                                    <TextField
                                                        error={Boolean(touched.sequence && errors.sequence)}
                                                        label="Sequence"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="number"
                                                        name="sequence"
                                                        id="sequence"
                                                        value={values.sequence}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddSectionEntry(e.target.id, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.sequence && errors.sequence}
                                                    />
                                                </div>
                                                <div className={classes.textField}>
                                                    <FormControlLabel
                                                        value={values.hidden}
                                                        control={
                                                            <Switch
                                                                id="hidden"
                                                                color="primary"
                                                                checked={values.hidden}
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    handleAddSectionEntry(
                                                                        e.target.id,
                                                                        e.target.checked
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label="Shown"
                                                        labelPlacement="start"
                                                    />
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
            {onSuccess && (
                <SnackBarAndAlert
                    open={onSuccess}
                    onClose={() => {
                        setOnSuccess(false);
                        handleClose();
                    }}
                    type="success"
                >
                    Section added successfully.
                </SnackBarAndAlert>
            )}
            {onError && (
                <SnackBarAndAlert
                    open={onError}
                    onClose={() => {
                        setOnError(false);
                    }}
                    type="error"
                >
                    {`Failed:  ${error?.message}`}
                </SnackBarAndAlert>
            )}
        </div>
    );
}

export default AddSectionEntryComponent;
