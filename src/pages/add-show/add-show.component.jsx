import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { PageHeader, Stepper, LoadingScreen, SnackBarAndAlert } from 'components';
import { Button, makeStyles, CircularProgress, Paper } from '@material-ui/core';
import { useAddShowFormContext } from 'contexts';
import { getShowGQL } from 'services/queries';
import { formatDateTimeByFormatString } from 'utilities/helper';
import { goBack } from 'utilities/route';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    button: {
        marginRight: theme.spacing(2)
    },
    completed: {
        display: 'inline-block'
    },
    container: {
        marginBottom: '50px'
    }
}));

const AddShowComponent = (props) => {
    const classes = useStyles();
    const {
        getComponent,
        steps,
        step,
        setStep,
        pageData,
        nextStep,
        handleSubmit,
        loading,
        error,
        onSuccess,
        setOnSuccess,
        handleCancel
    } = props;
    const [fetching, seFetching] = React.useState(true);
    const { addShowForm, setAddShowForm } = useAddShowFormContext();
    const [getShow] = useLazyQuery(getShowGQL, {
        onCompleted: (data) => {
            if (data?.getShow) {
                // eslint-disable-next-line
                const { __typename, ...show } = data.getShow;
                setAddShowForm((addShowForm) => ({
                    ...addShowForm,
                    ...show,
                    releaseDate: formatDateTimeByFormatString(show.releaseDate, 'YYYY-MM-DD')
                }));
                seFetching(false);
            }
        }
    });

    const fetchData = async () => {
        getShow({
            variables: { id: props.id }
        });
    };

    React.useEffect(async () => {
        if (props.id) {
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
                        <React.Fragment>
                            <Stepper getComponent={getComponent} currentStep={step} steps={steps} setStep={setStep} />
                            <div className={classes.container}>{getComponent(step)}</div>
                            <div>
                                {step === 1 ? (
                                    <Button
                                        onClick={handleCancel}
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Cancel
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => nextStep(step - 1)}
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Previous
                                    </Button>
                                )}
                                {step === steps.length ? (
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleSubmit(addShowForm)}
                                    >
                                        Submit
                                    </Button>
                                ) : (
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => nextStep()}
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>
                        </React.Fragment>
                    )}
                </div>
                <LoadingScreen open={loading}></LoadingScreen>
            </div>
            {onSuccess && (
                <SnackBarAndAlert
                    open={onSuccess}
                    onClose={() => {
                        setOnSuccess(false);
                        goBack();
                    }}
                    type="success"
                >
                    {props.message}
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
                    {`Failed:  ${props.message}`}
                </SnackBarAndAlert>
            )}
        </Paper>
    );
};

export default AddShowComponent;
