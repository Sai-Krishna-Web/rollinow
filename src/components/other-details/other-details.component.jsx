import React from 'react';
import { Formik } from 'formik';
import { Box, FormControlLabel, Switch, TextField, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
    textFieldFullWidth: {
        margin: theme.spacing(1),
        width: '50ch'
    }
}));

const OtherDetailsComponent = (props) => {
    const { addShowForm, handleAddShow, validate, languageList } = props;
    const classes = useStyles();

    return (
        <Box px={5} mx={5}>
            <Formik initialValues={addShowForm} validate={validate}>
                {(formik) => {
                    const { values, handleChange, errors, touched, handleBlur } = formik;
                    return (
                        <div>
                            <h4>Other details</h4>
                            <form>
                                <div className={classes.root}>
                                    <div>
                                        <TextField
                                            error={Boolean(touched.duration && errors.duration)}
                                            label="Duration"
                                            margin="dense"
                                            variant="outlined"
                                            type="text"
                                            name="duration"
                                            id="duration"
                                            value={values.duration}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleAddShow(e.target.id, e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            helperText={touched.duration && errors.duration}
                                            className={classes.textField}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            type="date"
                                            error={Boolean(touched.releaseDate && errors.releaseDate)}
                                            label="Release Date"
                                            margin="dense"
                                            variant="outlined"
                                            name="releaseDate"
                                            id="releaseDate"
                                            value={values.releaseDate}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleAddShow(e.target.id, e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            helperText={touched.releaseDate && errors.releaseDate}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={classes.root}>
                                    <div>
                                        <TextField
                                            error={Boolean(touched.tagline && errors.tagline)}
                                            label="Tagline"
                                            margin="dense"
                                            variant="outlined"
                                            type="text"
                                            name="tagline"
                                            id="tagline"
                                            value={values.tagline}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleAddShow(e.target.id, e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            helperText={touched.tagline && errors.tagline}
                                            className={classes.textFieldFullWidth}
                                            multiline
                                            rows={2}
                                        />
                                    </div>
                                </div>
                                <div className={classes.root}>
                                    <Autocomplete
                                        name="languageId"
                                        id="languageId"
                                        value={addShowForm.languageId}
                                        onChange={(e, newInputValue) => {
                                            handleAddShow('languageId', newInputValue.language);
                                        }}
                                        options={languageList}
                                        getOptionSelected={(option, value) => option.language === value}
                                        getOptionLabel={(option) =>
                                            typeof option === 'string' ? option : option?.language || ''
                                        }
                                        style={{ width: 300 }}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    error={Boolean(touched.languageId && errors.languageId)}
                                                    label="Language"
                                                    margin="dense"
                                                    {...params}
                                                    variant="outlined"
                                                    className={classes.textField}
                                                    onBlur={handleBlur}
                                                    helperText={touched.languageId && errors.languageId}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <div className={classes.root}>
                                    <FormControlLabel
                                        value={values.isIndianOTT}
                                        control={
                                            <Switch
                                                id="isIndianOTT"
                                                color="primary"
                                                checked={values.isIndianOTT}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleAddShow(e.target.id, e.target.checked);
                                                }}
                                            />
                                        }
                                        label="Indian OTT"
                                        labelPlacement="start"
                                    />
                                </div>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        </Box>
    );
};

export default OtherDetailsComponent;
