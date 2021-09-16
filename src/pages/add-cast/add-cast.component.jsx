import React from 'react';
import { Formik } from 'formik';
import { PageHeader, LoadingScreen, SnackBarAndAlert, UploadMedia } from 'components';
import { Box, Button, TextField, makeStyles, Grid, FormLabel, CircularProgress } from '@material-ui/core';
import { useAddCastFormContext } from 'contexts';
import { setRoute } from 'utilities';

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

const AddCastComponent = (props) => {
    const classes = useStyles();
    const {
        pageData,
        validate,
        handleSubmit,
        loading,
        data,
        error,
        uploadProgress,
        setUploadProgress,
        enableSubmit,
        onSuccess,
        setOnSuccess
    } = props;
    const [fetching, seFetching] = React.useState(true);
    const { addCastForm, setAddCastForm } = useAddCastFormContext();

    const handleAddCast = (key, value) => {
        setAddCastForm((addCastForm) => ({
            ...addCastForm,
            [key]: value
        }));
    };

    const afterUpload = (link) => {
        setAddCastForm((addCastForm) => ({ ...addCastForm, thumbnail: link }));
    };

    const fetchData = async () => {
        // eslint-disable-next-line
        const { __typename, ...cast } = props.cast;
        await setAddCastForm((addCastForm) => ({ ...addCastForm, ...cast }));
    };

    React.useEffect(async () => {
        if (props.id) {
            await fetchData();
        }
        seFetching(false);
    }, []);

    return (
        <>
            <div style={{ margin: 'auto' }}>
                <PageHeader pageData={pageData} />
                <div style={{ minHeight: '600px', textAlign: 'center', padding: '20px' }}>
                    {fetching ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <Box px={5} mx={5}>
                                <Formik initialValues={addCastForm} validate={validate}>
                                    {(formik) => {
                                        const { values, handleChange, errors, touched, handleBlur } = formik;
                                        return (
                                            <div>
                                                <h4>Cast info</h4>
                                                <form>
                                                    <div className={classes.root}>
                                                        <div>
                                                            <TextField
                                                                error={Boolean(touched.name && errors.name)}
                                                                label="Name"
                                                                margin="dense"
                                                                variant="outlined"
                                                                name="name"
                                                                id="name"
                                                                value={values.name}
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    handleAddCast(e.target.id, e.target.value);
                                                                }}
                                                                onBlur={handleBlur}
                                                                helperText={touched.name && errors.name}
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
                                                                    handleAddCast(e.target.id, e.target.value);
                                                                }}
                                                                onBlur={handleBlur}
                                                                helperText={touched.entityId && errors.entityId}
                                                                className={classes.textField}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <TextField
                                                            error={Boolean(touched.biography && errors.biography)}
                                                            label="Biography"
                                                            margin="dense"
                                                            variant="outlined"
                                                            type="text"
                                                            name="biography"
                                                            id="biography"
                                                            value={values.biography}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                handleAddCast(e.target.id, e.target.value);
                                                            }}
                                                            onBlur={handleBlur}
                                                            helperText={touched.biography && errors.biography}
                                                            className={classes.textFieldFullWidth}
                                                            multiline
                                                            rows={4}
                                                        />
                                                    </div>
                                                    <div className={classes.root}>
                                                        <Grid item md={6} className={classes.label}>
                                                            <FormLabel
                                                                component="legend"
                                                                align="center"
                                                                required
                                                                className={classes.label + ' ' + classes.px}
                                                            >
                                                                Thumbnail
                                                            </FormLabel>{' '}
                                                            <Grid item xs={9} className={classes.uploadPanel}>
                                                                <UploadMedia
                                                                    location="shows"
                                                                    afterUpload={afterUpload}
                                                                    uploadProgress={uploadProgress}
                                                                    setUploadProgress={setUploadProgress}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </form>
                                            </div>
                                        );
                                    }}
                                </Formik>
                            </Box>
                            <div>
                                <Button
                                    onClick={() => setRoute('/casts')}
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
                                    onClick={() => handleSubmit(addCastForm)}
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
                    }}
                    type="success"
                >
                    Cast added successfully.
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
        </>
    );
};

export default AddCastComponent;
