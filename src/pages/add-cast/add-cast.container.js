import React, { useState } from 'react';
import AddCastComponent from './add-cast.component';
import { AddCastFormProvider } from 'contexts'
import { useMutation } from '@apollo/client';
import { ADD_CAST_URL } from 'services/mutations';

function AddCast() {
    const [enableSubmit, setEnableSubmit] = useState(false)
    const [onError, setOnError] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0)
    const [addCast, { data, error, loading }] = useMutation(ADD_CAST_URL, {
        onError: () => {
            setOnError(true);
        }
    });

    const pageData = {
        title: 'Create Cast'
    }
    const validate = (values) => {
        let errors = {};

        if (!values.name) {
            errors.name = 'Name is required';
        }
        if (!enableSubmit && values.name) {
            setEnableSubmit(true);
        }

        if (!values.entityId) {
            errors.entityId = 'Entity Id is required';
        }
        if (!values.type) {
            errors.type = 'Type is required';
        }

        if (!values.thumbnail) {
            errors.thumbnail = 'Thumbnail is required';
        }

        if (!values.biography) {
            errors.biography = 'Biography is required';
        }

        return errors;
    };

    const handleSubmit = (vars) => {
        addCast({
            variables: {
                cast: vars
            },
        })
    };

    return (
        <AddCastFormProvider>
            <AddCastComponent pageData={pageData} validate={validate} handleSubmit={handleSubmit} loading={loading} data={data} error={error} onError={onError} setOnError={setOnError} uploadProgress={uploadProgress} setUploadProgress={setUploadProgress} enableSubmit={enableSubmit} />
        </AddCastFormProvider>
    );
}

export default AddCast;
