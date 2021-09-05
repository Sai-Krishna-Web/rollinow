import React from 'react';
import OtherDetailsComponent from './other-details.component';
import { useAddShowFormContext } from 'contexts';

function OtherDetails() {
    const { addShowForm, setAddShowForm, languageList } = useAddShowFormContext();

    const validate = (values) => {
        let errors = {};

        if (!addShowForm.languageId) {
            errors.languageId = 'Language is required';
        }
        if (!values.tagline) {
            errors.tagline = 'Tagline is required';
        }
        if (!values.duration) {
            errors.duration = 'Duration is required';
        }
        if (!values.releaseDate) {
            errors.releaseDate = 'Release date is required';
        }
        return errors;
    };

    const handleAddShow = (key, value) => {
        setAddShowForm(addShowForm => ({
            ...addShowForm,
            [key]: value
        }));
    }

    return <OtherDetailsComponent addShowForm={addShowForm} validate={validate} handleAddShow={handleAddShow} languageList={languageList} />;
}

export default OtherDetails;
