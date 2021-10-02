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
import { Box, Button, TextField, MenuItem } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { LoadingScreen } from 'components';
import { sourceType } from 'utilities/enums';
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
        margin: theme.spacing(1),
        width: '300px'
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

function AddWatchSourceComponent(props) {
    const {
        initialState,
        open,
        handleClose,
        handleAddWatchSource,
        handleSubmit,
        enableSubmit,
        validate,
        loading,
        sources
    } = props;

    const classes = useStyles();
    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Watch source
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
                                                <Autocomplete
                                                    name="Source"
                                                    id="source"
                                                    value={initialState.source}
                                                    onChange={(e, newInputValue) => {
                                                        handleAddWatchSource('source', newInputValue?.source);
                                                    }}
                                                    options={sources}
                                                    getOptionSelected={(option, value) => option.source === value}
                                                    getOptionLabel={(option) =>
                                                        typeof option === 'string' ? option : option?.source || ''
                                                    }
                                                    renderInput={(params) => {
                                                        return (
                                                            <TextField
                                                                error={Boolean(touched.source && errors.source)}
                                                                label="Source"
                                                                margin="dense"
                                                                {...params}
                                                                variant="outlined"
                                                                className={classes.textField}
                                                                onBlur={handleBlur}
                                                                helperText={touched.source && errors.source}
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>

                                            <div className={classes.root}>
                                                <div className={classes.textField}>
                                                    <TextField
                                                        fullWidth={true}
                                                        error={Boolean(touched.link && errors.link)}
                                                        label="Link"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="text"
                                                        name="link"
                                                        id="link"
                                                        value={values.link}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddWatchSource(e.target.id, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.link && errors.link}
                                                    />
                                                </div>
                                                <div className={classes.textField}>
                                                    <TextField
                                                        error={Boolean(touched.type && errors.type)}
                                                        label="Type"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="text"
                                                        name="type"
                                                        id="type"
                                                        value={values.type}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddWatchSource(e.target.name, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.type && errors.type}
                                                        fullWidth={true}
                                                        select
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {Object.keys(sourceType).map((key, index) => (
                                                            <MenuItem value={key} key={index}>
                                                                {sourceType[key]}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </div>
                                                <div className={classes.textField}>
                                                    <TextField
                                                        fullWidth={true}
                                                        error={Boolean(touched.price && errors.price)}
                                                        label="Price"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="text"
                                                        name="price"
                                                        id="price"
                                                        value={values.price}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddWatchSource(e.target.id, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.price && errors.price}
                                                    />
                                                </div>
                                                <div className={classes.textField}>
                                                    <TextField
                                                        fullWidth={true}
                                                        error={Boolean(touched.quality && errors.quality)}
                                                        label="Quality"
                                                        margin="dense"
                                                        variant="outlined"
                                                        type="text"
                                                        name="quality"
                                                        id="quality"
                                                        value={values.quality}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            handleAddWatchSource(e.target.id, e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        helperText={touched.quality && errors.quality}
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
        </div>
    );
}

export default AddWatchSourceComponent;
