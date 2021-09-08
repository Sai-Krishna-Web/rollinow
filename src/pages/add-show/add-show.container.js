import React, { useState } from 'react';
import AddShowComponent from './add-show.component';
import { ShowInfo, MediaFiles, OtherDeatils, Summary } from 'components';
import { AddShowFormProvider } from 'contexts';
import { useMutation } from '@apollo/client';
import { ADD_SHOW_URL } from 'services/mutations';
import { setRoute } from 'utilities';

function AddShow() {
    const [step, setStep] = useState(1);
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [addShow, { data, error, loading }] = useMutation(ADD_SHOW_URL, {
        onCompleted: (data) => {
            if (data?.addShow) {
                setOnSuccess(true);
            }
        },
        onError: () => {
            setOnError(true);
        }
    });

    let steps = ['Basic info', 'Other details', 'Media files', 'Summary'];
    const pageData = {
        title: 'Create Show/Movie'
    };

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
            }
        });
    };
    const handleCancel = () => setRoute('/shows');
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
            <AddShowComponent
                steps={steps}
                getComponent={getComponent}
                step={step}
                setStep={setStep}
                nextStep={nextStep}
                pageData={pageData}
                handleSubmit={handleSubmit}
                loading={loading}
                data={data}
                error={error}
                onError={onError}
                setOnError={setOnError}
                onSuccess={onSuccess}
                setOnSuccess={setOnSuccess}
                handleCancel={handleCancel}
            />
        </AddShowFormProvider>
    );
}

export default AddShow;
