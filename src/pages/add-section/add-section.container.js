import React, { useState } from 'react';
import AddSectionComponent from './add-section.component';
import { AddSectionFormProvider } from 'contexts';
import { useMutation } from '@apollo/client';
import { CREATE_SECTION_URL } from 'services/mutations';
import { sectionPlace } from 'utilities/enums';

function AddSection(props) {
    const { id } = props.match.params;
    const [enablePlacePicker, setEnablePlacePicker] = useState(false);
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [addSection, { data, error, loading }] = useMutation(CREATE_SECTION_URL, {
        onCompleted: (data) => {
            if (data?.createSection) {
                setOnSuccess(true);
                //refetch();
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

        if (values.place) {
            handlePlacePicker(values.place);
        }

        return errors;
    };

    const handlePlacePicker = (place) => {
        if (place && place !== 'HOME' && place !== 'DISCOVER' && place !== 'BOTH') setEnablePlacePicker(true);
        else setEnablePlacePicker(false);
    };
    const handleSubmit = (vars) => {
        const { entryId, ...data } = vars;
        const showId = vars.place === sectionPlace.SHOW ? entryId : null;
        const languageId = vars.place === sectionPlace.LANGUAGE ? entryId : null;
        const platformId = vars.place === sectionPlace.PLATFORM ? entryId : null;
        const genreId = vars.place === sectionPlace.GENRE ? entryId : null;
        const castId = vars.place === sectionPlace.ARTIST ? entryId : null;
        addSection({
            variables: {
                id: Number(id),
                section: { ...data, sequence: Number(vars.sequence), showId, castId, languageId, genreId, platformId }
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
                enablePlacePicker={enablePlacePicker}
                handlePlacePicker={handlePlacePicker}
            />
        </AddSectionFormProvider>
    );
}

export default AddSection;
