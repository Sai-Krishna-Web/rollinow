import React, { useState } from 'react';
import AddCastComponent from './add-cast.component';
import { AddCastFormProvider } from 'contexts';
import { useMutation } from '@apollo/client';
import { ADD_CAST_URL, UPDATE_CAST_URL } from 'services/mutations';

function AddCast(props) {
    const { id } = props.match.params;
    const { cast } = props.location.state;
    const URL = id ? UPDATE_CAST_URL : ADD_CAST_URL;
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [addCast, { data, error, loading }] = useMutation(URL, {
        onCompleted: (data) => {
            if (data?.addCast || data?.updateCast) {
                setOnSuccess(true);
            }
        },
        onError: () => {
            setOnError(true);
        }
    });

    const pageData = {
        title: 'Create Cast'
    };
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
            }
        });
    };

    return (
        <AddCastFormProvider>
            <AddCastComponent
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
                cast={cast}
            />
        </AddCastFormProvider>
    );
}

export default AddCast;
