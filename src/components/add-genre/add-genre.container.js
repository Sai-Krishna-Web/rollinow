import React, { useState } from 'react';
import AddGenreComponent from './add-genre.component';
import { useMutation } from '@apollo/client';
import { ADD_GENRE_URL, UPDATE_GENRE_URL } from 'services/mutations';

function AddGenre(props) {
    const { open, setOpen, genreData, setOnSuccess, setOnError, setMessage, refetch } = props;
    const updateMode = genreData ? true : false;
    const [initialState, setState] = useState(updateMode ? genreData : { genre: '', image: '' });
    const URL = updateMode ? UPDATE_GENRE_URL : ADD_GENRE_URL;
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [addGenre, { loading }] = useMutation(URL, {
        onCompleted: (data) => {
            if (data?.addGenre) {
                setMessage('Genre added successfully');
            }
            if (data?.updateGenre) {
                setMessage('Genre updated successfully');
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

    const handleAddGenre = (id, value) => {
        setState({ ...initialState, [id]: value });
    };

    const validate = (values) => {
        let errors = {};

        if (!values.genre) {
            errors.genre = 'Genre name is required';
        }
        if (values.genre) {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }

        return errors;
    };

    const handleSubmit = () => {
        addGenre({
            variables: {
                genre: initialState
            }
        });
    };

    const afterUpload = (link) => {
        handleAddGenre('image', link);
        if (updateMode) setEnableSubmit(true);
    };

    return (
        <AddGenreComponent
            open={open}
            handleClose={() => setOpen(false)}
            handleAddGenre={handleAddGenre}
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

export default AddGenre;
