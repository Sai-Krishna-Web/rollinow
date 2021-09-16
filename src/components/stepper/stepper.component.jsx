import React from 'react';
import PropTypes from 'prop-types';
import { Stepper, Step, StepButton } from '@material-ui/core';

function StepperComponent(props) {
    const { steps, currentStep, setStep } = props;

    return (
        <Stepper nonLinear activeStep={currentStep - 1}>
            {steps.map((label, index) => {
                return (
                    <Step completed={false} key={label}>
                        <StepButton onClick={() => setStep(index + 1)}>{label}</StepButton>
                    </Step>
                );
            })}
        </Stepper>
    );
}

StepperComponent.propTypes = {
    steps: PropTypes.array,
    currentStep: PropTypes.number,
    setStep: PropTypes.func
};

export default StepperComponent;
