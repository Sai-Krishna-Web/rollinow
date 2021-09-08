import React from 'react';
import { Formik } from 'formik';
import { Box, TextField, makeStyles, FormLabel, Radio, RadioGroup, FormControlLabel, Grid } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
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
    },
    formControl: {
        margin: theme.spacing(1),
        width: '25ch'
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    label: {
        alignItems: 'center',
        display: 'flex'
    },
    px: {
        paddingRight: 20
    }
}));

const ShowInfoComponent = (props) => {
    const { addShowForm, validate, handleAddShow, handleAddChip, handleDeleteChip } = props;
    const classes = useStyles();

    return (
        <Box px={5} mx={5}>
            <Formik initialValues={addShowForm} validate={validate}>
                {(formik) => {
                    const { values, handleChange, errors, touched, handleBlur } = formik;
                    return (
                        <div>
                            <h4>Basic info</h4>
                            <form>
                                <div className={classes.root}>
                                    <div>
                                        <TextField
                                            error={Boolean(touched.title && errors.title)}
                                            label="Title"
                                            margin="dense"
                                            variant="outlined"
                                            name="title"
                                            id="title"
                                            value={values.title}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleAddShow(e.target.id, e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            helperText={touched.title && errors.title}
                                            className={classes.textField}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            error={Boolean(touched.entityId && errors.entityId)}
                                            label="Entity Id"
                                            margin="dense"
                                            variant="outlined"
                                            type="text"
                                            name="entityId"
                                            id="entityId"
                                            value={values.entityId}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleAddShow(e.target.id, e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            helperText={touched.entityId && errors.entityId}
                                            className={classes.textField}
                                        />
                                    </div>
                                </div>

                                <div className={classes.root}>
                                    <ChipInput
                                        error={Boolean(touched.keywords && errors.keywords)}
                                        label="Keywords"
                                        margin="dense"
                                        variant="outlined"
                                        type="text"
                                        name="keywords"
                                        id="keywords"
                                        value={values.keywords}
                                        onBlur={handleBlur}
                                        helperText={touched.keywords && errors.keywords}
                                        className={classes.textFieldFullWidth}
                                        onAdd={(chip) => handleAddChip(chip)}
                                        onDelete={(chip, index) => handleDeleteChip(chip, index)}
                                        clearInputValueOnChange={true}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        error={Boolean(touched.description && errors.description)}
                                        label="Description"
                                        margin="dense"
                                        variant="outlined"
                                        type="text"
                                        name="description"
                                        id="description"
                                        value={values.description}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleAddShow(e.target.id, e.target.value);
                                        }}
                                        onBlur={handleBlur}
                                        helperText={touched.description && errors.description}
                                        className={classes.textFieldFullWidth}
                                        multiline
                                        rows={4}
                                    />
                                </div>
                                <div className={classes.root}>
                                    <Grid className={classes.label}>
                                        <FormLabel
                                            component="legend"
                                            align="center"
                                            required
                                            className={classes.label + ' ' + classes.px}
                                        >
                                            Type
                                        </FormLabel>{' '}
                                        <RadioGroup
                                            aria-label="type"
                                            value={values.type}
                                            row
                                            type="text"
                                            name="type"
                                            id="type"
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleAddShow(e.target.name, e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            helperText={touched.type && errors.type}
                                        >
                                            <FormControlLabel
                                                value="movie"
                                                control={<Radio color="primary" />}
                                                label="Movie"
                                            />
                                            <FormControlLabel
                                                value="show"
                                                control={<Radio color="primary" />}
                                                label="Show"
                                            />
                                        </RadioGroup>
                                    </Grid>
                                </div>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        </Box>
    );
};

export default ShowInfoComponent;
