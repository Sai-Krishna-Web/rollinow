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
import { Box, Button, TextField } from '@material-ui/core';

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

function AddCharacterComponent(props) {
    const { initialState, open, handleClose, handleAddCharacter, handleSubmit, enableSubmit, validate, loading } =
        props;
    const classes = useStyles();
    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Character
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
                                                        error={Boolean(touched.character && errors.character)}
                                                        label="Character"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="text"
                                                        name="character"
                                                        id="character"
                                                        value={values.character}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddCharacter(e.target.id, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.character && errors.character}
                                                    />
                                                </div>
                                                <div className={classes.textField}>
                                                    {' '}
                                                    <Picker
                                                        type="CAST"
                                                        setPickerId={handleAddCharacter}
                                                        input={initialState.cast?.name}
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

export default AddCharacterComponent;
