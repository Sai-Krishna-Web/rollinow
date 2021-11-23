import React, { useState } from 'react';
import AddBannerComponent from './add-banner.component';
import { useMutation } from '@apollo/client';
import { CREATE_OR_UPDATE_BANNER_URL } from 'services/mutations';

function AddBanner(props) {
    const { open, setOpen, bannerData, setOnSuccess, setOnError, setMessage, refetch } = props;
    const updateMode = bannerData ? true : false;
    const [initialState, setState] = useState(
        updateMode ? bannerData : { place: '', genreId: '', languageId: '', platformId: '', showId: '' }
    );
    const URL = CREATE_OR_UPDATE_BANNER_URL;
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [addOrUpdateBanner, { loading }] = useMutation(URL, {
        onCompleted: (data) => {
            if (data?.createOrUpdateBanner) {
                setMessage('Banner added/updated successfully');
                setOpen(false);
                setOnSuccess(true);
                refetch();
            }
        },
        onError: (error) => {
            setOnError(true);
            setMessage(error.message);
        }
    });

    const handleAddBanner = (id, value) => {
        setState({ ...initialState, [id]: value });
    };

    const validate = (values) => {
        let errors = {};

        if (!values.place) {
            errors.place = 'Place is required';
        }
        if (values.place) {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }

        return errors;
    };

    const handleSubmit = () => {
        const { place, genreId, languageId, platformId, showId } = initialState;
        addOrUpdateBanner({
            variables: {
                id: Number(bannerData?.id),
                banner: { place, genreId, languageId, platformId, showId }
            }
        });
    };

    return (
        <AddBannerComponent
            open={open}
            handleClose={() => setOpen(false)}
            handleAddBanner={handleAddBanner}
            handleSubmit={handleSubmit}
            initialState={initialState}
            enableSubmit={enableSubmit}
            validate={validate}
            loading={loading}
            updateMode={updateMode}
        />
    );
}

export default AddBanner;
