import React from 'react';
import { PageHeader, Stepper, LoadingScreen,SnackBarAndAlert } from 'components';
import { Button, makeStyles } from '@material-ui/core';
import { useAddShowFormContext } from 'contexts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(2)
    },
    completed: {
        display: 'inline-block'
    },
    container: {
        marginBottom: '50px',
    }

}));

const AddShowComponent = (props) => {
    const classes = useStyles();
    const { getComponent, steps, step, setStep, pageData, nextStep, handleSubmit, loading, data, error } = props;
    const { addShowForm } = useAddShowFormContext();

    return (
        <>
            <div style={{ margin: 'auto' }}>
                <PageHeader pageData={pageData} />
                <div style={{ minHeight: '600px', textAlign: 'center', padding: '20px' }}>
                    <Stepper
                        getComponent={getComponent}
                        currentStep={step}
                        steps={steps}
                        setStep={setStep}
                    />
                    <div className={classes.container}>
                        {getComponent(step)}
                    </div>
                    <div>
                        <Button
                            disabled={step === 1}
                            onClick={() => nextStep(step - 1)}
                            variant='contained'
                            color='primary'
                            className={classes.button}
                        >
                            Back
                    </Button>
                        {step === steps.length ? <Button
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            onClick={() => handleSubmit(addShowForm)}
                        >
                            Submit
                     </Button> : <Button
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            onClick={() => nextStep()}
                        >
                            Next
                     </Button>}
                    </div>
                </div>
                <LoadingScreen open={loading}></LoadingScreen>
            </div>
            {data && (
                <SnackBarAndAlert
                    open={Boolean(data)}
                    onClose={() => {
                        console.log('closed')
                    }}
                    type='success'
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
                    type='error'
                >
                    {`Failed:  ${error?.message}`}
                </SnackBarAndAlert>
            )}
        </>
    );
};

export default AddShowComponent;
