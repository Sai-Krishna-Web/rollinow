import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { PageHeader, LoadingScreen, SnackBarAndAlert, Picker } from 'components';
import {
    Box,
    Button,
    TextField,
    makeStyles,
    FormControlLabel,
    Switch,
    MenuItem,
    CircularProgress,
    Paper
} from '@material-ui/core';
import { useAddSectionFormContext } from 'contexts';
import { setRoute, sectionPlace, sectionType } from 'utilities';
import { useLazyQuery } from '@apollo/client';
import { getSectionGQL } from 'services/queries';
import { formatDateTimeByFormatString } from 'utilities/helper';
import { goBack } from 'utilities/route';

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
    },
    uploadPanel: {
        minHeight: 150,
        minWidth: 100,
        border: '1px solid #ddd',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginRight: theme.spacing(2)
    }
}));

function AddSectionComponent(props) {
    const classes = useStyles();
    const [fetching, seFetching] = useState(true);
    const {
        pageData,
        validate,
        handleSubmit,
        loading,
        data,
        error,
        enableSubmit,
        onSuccess,
        setOnSuccess,
        id,
        enablePlacePicker,
        handlePlacePicker
    } = props;
    const { addSectionForm, setAddSectionForm } = useAddSectionFormContext();

    const [getSection] = useLazyQuery(getSectionGQL, {
        onCompleted: (data) => {
            if (data?.section) {
                handlePlacePicker(data.section.place);
                // eslint-disable-next-line
                const { __typename, ...section } = data.section;
                setAddSectionForm((addSectionForm) => ({
                    ...addSectionForm,
                    ...section,
                    startTime: formatDateTimeByFormatString(section.startTime, 'YYYY-MM-DDTHH:mm'),
                    endTime: data.section.endTime && formatDateTimeByFormatString(section.endTime, 'YYYY-MM-DDTHH:mm'),
                    entryId:
                        section.showId || section.castId || section.languageId || section.genreId || section.platformId
                }));

                seFetching(false);
            }
        }
    });

    const handleAddSection = (key, value) => {
        setAddSectionForm((addSectionForm) => ({
            ...addSectionForm,
            [key]: value
        }));
    };

    const fetchData = async () => {
        getSection({
            variables: { id: Number(id) }
        });
    };

    useEffect(async () => {
        if (id) {
            await fetchData();
        } else seFetching(false);
    }, []);

    return (
        <Paper variant="outlined">
            <div style={{ margin: 'auto' }}>
                <PageHeader pageData={pageData} />

                <div style={{ minHeight: '600px', textAlign: 'center', padding: '20px' }}>
                    {fetching ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <Box px={5} mx={5}>
                                <Formik initialValues={addSectionForm} validate={validate}>
                                    {(formik) => {
                                        const { values, handleChange, errors, touched, handleBlur } = formik;
                                        return (
                                            <div>
                                                <h4>Section info</h4>
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
                                                                    handleAddSection(e.target.id, e.target.value);
                                                                }}
                                                                onBlur={handleBlur}
                                                                helperText={touched.title && errors.title}
                                                                className={classes.textField}
                                                                required
                                                            />
                                                        </div>
                                                        <div>
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
                                                                    handleAddSection(e.target.name, e.target.value);
                                                                }}
                                                                onBlur={handleBlur}
                                                                helperText={touched.type && errors.type}
                                                                className={classes.textField}
                                                                select
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                {Object.keys(sectionType).map((key, index) => (
                                                                    <MenuItem value={key} key={index}>
                                                                        {sectionType[key]}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </div>
                                                    </div>
                                                    <div className={classes.root}>
                                                        <div>
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
                                                                    handleAddSection(e.target.id, e.target.value);
                                                                }}
                                                                onBlur={handleBlur}
                                                                helperText={touched.sequence && errors.sequence}
                                                                className={classes.textField}
                                                            />
                                                        </div>
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
                                                                    handleAddSection(e.target.name, e.target.value);
                                                                }}
                                                                onBlur={handleBlur}
                                                                helperText={touched.place && errors.place}
                                                                className={classes.textField}
                                                                select
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                {Object.keys(sectionPlace).map((key, index) => (
                                                                    <MenuItem value={key} key={index}>
                                                                        {sectionPlace[key]}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </div>
                                                    </div>
                                                    {enablePlacePicker && (
                                                        <div className={classes.root}>
                                                            {' '}
                                                            <Picker
                                                                type={values.place}
                                                                setPickerId={handleAddSection}
                                                                input={values.entryId}
                                                            ></Picker>
                                                        </div>
                                                    )}
                                                    <div className={classes.root}>
                                                        <TextField
                                                            type="datetime-local"
                                                            error={Boolean(touched.startTime && errors.startTime)}
                                                            label="Start time"
                                                            margin="dense"
                                                            variant="outlined"
                                                            name="startTime"
                                                            id="startTime"
                                                            value={values.startTime}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                handleAddSection(e.target.id, e.target.value);
                                                            }}
                                                            onBlur={handleBlur}
                                                            helperText={touched.startTime && errors.startTime}
                                                            className={classes.textField}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                        />

                                                        <TextField
                                                            type="datetime-local"
                                                            error={Boolean(touched.endTime && errors.endTime)}
                                                            label="End time"
                                                            margin="dense"
                                                            variant="outlined"
                                                            name="endTime"
                                                            id="endTime"
                                                            value={values.endTime}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                handleAddSection(e.target.id, e.target.value);
                                                            }}
                                                            onBlur={handleBlur}
                                                            helperText={touched.endTime && errors.endTime}
                                                            className={classes.textField}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
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
                                                                handleAddSection(e.target.id, e.target.value);
                                                            }}
                                                            onBlur={handleBlur}
                                                            helperText={touched.description && errors.description}
                                                            className={classes.textFieldFullWidth}
                                                            multiline
                                                            rows={2}
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextField
                                                            error={Boolean(touched.remark && errors.remark)}
                                                            label="Remark"
                                                            margin="dense"
                                                            variant="outlined"
                                                            type="text"
                                                            name="remark"
                                                            id="remark"
                                                            value={values.remark}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                handleAddSection(e.target.id, e.target.value);
                                                            }}
                                                            onBlur={handleBlur}
                                                            helperText={touched.remark && errors.remark}
                                                            className={classes.textFieldFullWidth}
                                                            multiline
                                                            rows={2}
                                                        />
                                                    </div>
                                                    <div className={classes.root}>
                                                        <FormControlLabel
                                                            value={values.shown}
                                                            control={
                                                                <Switch
                                                                    id="shown"
                                                                    color="primary"
                                                                    checked={values.shown}
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        handleAddSection(e.target.id, e.target.checked);
                                                                    }}
                                                                />
                                                            }
                                                            label="Shown"
                                                            labelPlacement="start"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        );
                                    }}
                                </Formik>
                            </Box>
                            <div>
                                <Button
                                    onClick={() => setRoute('/sections')}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={!enableSubmit}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleSubmit(addSectionForm)}
                                >
                                    Submit
                                </Button>
                            </div>
                        </>
                    )}
                </div>

                <LoadingScreen open={loading}></LoadingScreen>
            </div>
            {onSuccess && (
                <SnackBarAndAlert
                    open={Boolean(data)}
                    onClose={() => {
                        setOnSuccess(false);
                        goBack();
                    }}
                    type="success"
                >
                    Section added successfully.
                </SnackBarAndAlert>
            )}
            {props.onError && (
                <SnackBarAndAlert
                    open={Boolean(error)}
                    onClose={() => {
                        props.setOnError(false);
                    }}
                    type="error"
                >
                    {`Failed:  ${error?.message}`}
                </SnackBarAndAlert>
            )}
        </Paper>
    );
}

export default AddSectionComponent;
