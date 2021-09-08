import React from 'react';
import { PageHeader, Stepper, LoadingScreen, SnackBarAndAlert } from 'components';
import { Button, makeStyles } from '@material-ui/core';
import { useAddShowFormContext } from 'contexts';

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
        data,
        error,
        onSuccess,
        setOnSuccess,
        handleCancel
    } = props;
    const { addShowForm } = useAddShowFormContext();

    return (
        <>
            <div style={{ margin: 'auto' }}>
                <PageHeader pageData={pageData} />
                <div style={{ minHeight: '600px', textAlign: 'center', padding: '20px' }}>
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
                    Show added successfully.
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

export default AddShowComponent;
