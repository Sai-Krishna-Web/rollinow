import React, { useState } from 'react';
import AddPlatformComponent from './add-platform.component';
import { useMutation } from '@apollo/client';
import { ADD_PLATFORM_URL } from 'services/mutations';

function AddPlatform(props) {
    const { open, setOpen, setOnSuccess, setOnError, setMessage, refetch } = props;
    const [initialState, setState] = useState({ source: '', imageUrl: '', flatUrl: '' });
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [addPlatform, { loading }] = useMutation(ADD_PLATFORM_URL, {
        onCompleted: (data) => {
            if (data?.addSource) {
                setMessage('Platform added successfully');
            }
            setOpen(false);
            setOnSuccess(true);
            refetch();
        },
        onError: (error) => {
            setOnError(true);
            setMessage(error.message);
        }
    });

    const handleAddPlatform = (id, value) => {
        setState({ ...initialState, [id]: value });
    };

    const validate = (values) => {
        let errors = {};

        if (!values.source) {
            errors.source = 'platform name is required';
        }
        if (values.source) {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }

        return errors;
    };

    const handleSubmit = () => {
        addPlatform({
            variables: {
                source: initialState
            }
        });
    };

    const afterUpload = (link) => {
        handleAddPlatform('imageUrl', link);
    };

    return (
        <AddPlatformComponent
            open={open}
            handleClose={() => setOpen(false)}
            handleAddPlatform={handleAddPlatform}
            handleSubmit={handleSubmit}
            initialState={initialState}
            enableSubmit={enableSubmit}
            validate={validate}
            loading={loading}
            afterUpload={afterUpload}
            uploadProgress={uploadProgress}
            setUploadProgress={setUploadProgress}
        />
    );
}

export default AddPlatform;
