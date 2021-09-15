import React, { useState } from 'react';
import AddSectionComponent from './add-section.component';
import { AddSectionFormProvider } from 'contexts';
import { useMutation } from '@apollo/client';
import { CREATE_SECTION_URL } from 'services/mutations';

function AddSection(props) {
    const { id } = props.match.params;
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [addSection, { data, error, loading }] = useMutation(CREATE_SECTION_URL, {
        onCompleted: (data) => {
            if (data?.createSection) {
                setOnSuccess(true);
            }
        },
        onError: () => {
            setOnError(true);
        }
    });

    const pageData = {
        title: 'Create Section'
    };
    const validate = (values) => {
        let errors = {};

        if (!values.title) {
            errors.title = 'Title is required';
        }
        if (!enableSubmit && values.title && values.type) {
            setEnableSubmit(true);
        }
        if (!values.type) {
            errors.type = 'Type is required';
        }

        if (!values.sequence) {
            errors.sequence = 'Sequence is required';
        }

        if (!values.place) {
            errors.place = 'Place is required';
        }

        return errors;
    };

    const handleSubmit = (vars) => {
        addSection({
            variables: {
                id: Number(id),
                section: { ...vars, sequence: Number(vars.sequence) }
            }
        });
    };

    return (
        <AddSectionFormProvider>
            <AddSectionComponent
                pageData={pageData}
                validate={validate}
                handleSubmit={handleSubmit}
                loading={loading}
                data={data}
                error={error}
                onError={onError}
                setOnError={setOnError}
                uploadProgress={uploadProgress}
                setUploadProgress={setUploadProgress}
                enableSubmit={enableSubmit}
                onSuccess={onSuccess}
                setOnSuccess={setOnSuccess}
                id={id}
            />
        </AddSectionFormProvider>
    );
}

export default AddSection;
