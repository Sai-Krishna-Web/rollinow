import React, { useState } from 'react';
import AddShowComponent from './add-show.component';
import { ShowInfo, MediaFiles, OtherDeatils, Summary } from '../../components';
import { AddShowFormProvider } from '../../contexts/show-form-context'
import { useMutation } from '@apollo/client';
import { ADD_SHOW_URL } from '../../services/mutations';

function AddShow() {
    const [step, setStep] = useState(1);
    const [onError, setOnError] = useState(false);
    const [addShow, { data, error, loading }] = useMutation(ADD_SHOW_URL, {
        onError: (error) => {
            setOnError(true);
            console.log(error);
        }
    });


    let steps = [
        'Basic info',
        'Other details',
        'Media files',
        'Summary'
    ];
    const pageData = {
        title: 'Create Show/Movie'
    }

    const nextStep = (stepNumber) => {
        if (stepNumber) {
            setStep(stepNumber);
        } else {
            setStep(step + 1);
        }
    };

    const handleSubmit = (vars) => {
        addShow({
            variables: {
                show: vars
            },
        })
        if (data) {
            console.log(data);
        }
        if (error) {
            console.log(error);
        }
    };

    const getComponent = (step) => {
        switch (step) {
            case 1:
                return <ShowInfo nextStep={nextStep} currentStep={step} />;
            case 2:
                return <OtherDeatils nextStep={nextStep} currentStep={step} />;
            case 3:
                return <MediaFiles nextStep={nextStep} currentStep={step} />;
            case 4:
                return <Summary nextStep={nextStep} currentStep={step} />;
            default:
                return <div>Component nr. {step}</div>;
        }
    };

    return (
        <AddShowFormProvider>
            <AddShowComponent steps={steps} getComponent={getComponent} step={step} setStep={setStep} nextStep={nextStep} pageData={pageData} handleSubmit={handleSubmit} loading={loading} data={data} error={error} onError={onError} setOnError={setOnError} />
        </AddShowFormProvider>
    );
}

export default AddShow;
