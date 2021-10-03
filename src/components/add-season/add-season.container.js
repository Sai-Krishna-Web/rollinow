import React, { useState } from 'react';
import AddSeasonComponent from './add-season.component';
import { useMutation } from '@apollo/client';
import { ADD_SEASON_URL, UPDATE_SEASON_URL } from 'services/mutations';
import getYear from 'date-fns/getYear';

function AddSeason(props) {
    const state = {
        seasonName: '',
        seasonYear: new Date(),
        episodes: '',
        releaseSentence: '',
        seasonDesc: '',
        seasonImgUrl: ''
    };

    const { showId, open, setOpen, seasonData, setOnSuccess, setOnError, setMessage, refetch } = props;
    const URL = seasonData ? UPDATE_SEASON_URL : ADD_SEASON_URL;
    const [initialState, setState] = useState(seasonData ? seasonData : state);
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [addSeason, { loading }] = useMutation(URL, {
        onCompleted: (data) => {
            if (data?.updateSeason) {
                setMessage('Season updated successfully');
            }
            if (data?.addSeason) {
                setMessage('Season added successfully');
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

    const handleAddSeason = (id, value) => {
        setState({ ...initialState, [id]: value });
    };

    const afterUpload = (link) => {
        handleAddSeason('seasonImgUrl', link);
    };

    const validate = (values) => {
        let errors = {};

        if (!values.seasonName) {
            errors.seasonName = 'Name is required';
        }
        if (values.seasonName && values.seasonYear && values.episodes) {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }

        if (!values.seasonYear) {
            errors.seasonYear = 'Year is required';
        }
        if (!values.episodes) {
            errors.episodes = 'Number of episodes please';
        }

        return errors;
    };

    const handleSubmit = () => {
        // eslint-disable-next-line
        const { seasonYear, episodes, __typename, ...other } = initialState;
        const year = getYear(seasonYear).toString();
        let vars = {
            showId,
            season: { ...other, seasonYear: year, episodes: Number(episodes) }
        };

        addSeason({
            variables: vars
        });
    };
    return (
        <AddSeasonComponent
            open={open}
            handleClose={() => setOpen(false)}
            handleAddSeason={handleAddSeason}
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

export default AddSeason;
