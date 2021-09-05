import React from 'react';
import ShowInfoComponent from './show-info.component';
import { useAddShowFormContext } from 'contexts';

function ShowInfo() {
    const { addShowForm, setAddShowForm } = useAddShowFormContext();

    const validate = (values) => {
        let errors = {};

        if (!values.title) {
            errors.title = 'Title is required';
        }

        if (!values.entityId) {
            errors.entityId = 'Entity Id is required';
        }
        if (!values.type) {
            errors.type = 'Type is required';
        }

        if (!values.keywords.length) {
            errors.keywords = 'Keywords is required';
        }

        if (!values.description) {
            errors.description = 'Description is required';
        }

        return errors;
    };

    const handleAddShow = (key, value) => {
        setAddShowForm(addShowForm => ({
            ...addShowForm,
            [key]: value
        }));
    }

    const handleAddChip = (value) => {
        addShowForm.keywords.push(value);
    }

    const handleDeleteChip = (value, index) => {
        addShowForm.keywords.splice(index, 1)
    }
    return <ShowInfoComponent  addShowForm={addShowForm} validate={validate} handleAddChip={handleAddChip} handleDeleteChip={handleDeleteChip} handleAddShow={handleAddShow} />;
}

export default ShowInfo;
