import React, { useState } from 'react';
import AddLanguageComponent from './add-language.component';
import { useMutation } from '@apollo/client';
import { UPDATE_LANGUAGE_URL } from 'services/mutations';

function AddLanguage(props) {
    const { open, setOpen, languageData, setOnSuccess, setOnError, setMessage, refetch } = props;
    const updateMode = languageData ? true : false;
    const [initialState, setState] = useState(updateMode ? languageData : { language: '', image: '' });
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [addLanguage, { loading }] = useMutation(UPDATE_LANGUAGE_URL, {
        onCompleted: (data) => {
            if (data?.addLanguage) {
                setMessage('Language added successfully');
            }
            if (data?.updateLanguage) {
                setMessage('Language updated successfully');
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

    const handleAddLanguage = (id, value) => {
        setState({ ...initialState, [id]: value });
    };

    const validate = (values) => {
        let errors = {};

        if (!values.language) {
            errors.language = 'Language name is required';
        }
        if (values.language) {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }

        return errors;
    };

    const handleSubmit = () => {
        addLanguage({
            variables: {
                genre: initialState
            }
        });
    };

    const afterUpload = (link) => {
        handleAddLanguage('image', link);
        if (updateMode) setEnableSubmit(true);
    };

    return (
        <AddLanguageComponent
            open={open}
            handleClose={() => setOpen(false)}
            handleAddLanguage={handleAddLanguage}
            handleSubmit={handleSubmit}
            initialState={initialState}
            enableSubmit={enableSubmit}
            validate={validate}
            loading={loading}
            afterUpload={afterUpload}
            uploadProgress={uploadProgress}
            setUploadProgress={setUploadProgress}
            updateMode={updateMode}
        />
    );
}

export default AddLanguage;
