import React, { useState } from 'react';
import AddSectionEntryComponent from './add-section-entry.component';
import { useMutation } from '@apollo/client';
import { CREATE_SECTION_ENTRY_URL } from 'services/mutations';
import { sectionType } from 'utilities/enums';
function AddSectionEntry(props) {
    const { open, setOpen, section, sectionEntry, refetch } = props;
    const [initialState, setState] = React.useState(
        sectionEntry ? sectionEntry : { sequence: null, hidden: false, entryId: null }
    );
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [addSectionEntry, { loading, error }] = useMutation(CREATE_SECTION_ENTRY_URL, {
        onCompleted: (data) => {
            if (data?.createSectionEntry) {
                setOnSuccess(true);
                refetch();
            }
        },
        onError: () => {
            setOnError(true);
        }
    });

    const handleClose = () => {
        setOpen(false);
    };
    const handleAddSectionEntry = (id, value) => {
        setState({ ...initialState, [id]: value });
    };

    const validate = (values) => {
        let errors = {};

        if (!values.entryId) {
            errors.entryId = 'Please select an option';
        }
        if (initialState.entryId && values.sequence) {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }

        if (!values.sequence) {
            errors.sequence = 'Sequence is required';
        }

        return errors;
    };

    const handleSubmit = () => {
        const { sequence, hidden, entryId } = initialState;
        const showId =
            section.type === sectionType.SHOW || section.type === sectionType.MOVIE || section.type === sectionType.TV
                ? entryId
                : null;
        const listId = section.type === sectionType.LIST ? entryId : null;
        const userId = section.type === sectionType.USER ? entryId : null;
        const castId = section.type === sectionType.CAST ? entryId : null;
        const sectionId = section.id;

        addSectionEntry({
            variables: {
                id: Number(sectionEntry?.id),
                sectionEntry: { sequence: Number(sequence), hidden, sectionId, showId, listId, castId, userId }
            }
        });
    };
    return (
        <AddSectionEntryComponent
            open={open}
            handleClose={handleClose}
            section={section}
            handleAddSectionEntry={handleAddSectionEntry}
            handleSubmit={handleSubmit}
            initialState={initialState}
            enableSubmit={enableSubmit}
            validate={validate}
            loading={loading}
            onError={onError}
            onSuccess={onSuccess}
            error={error}
            setOnError={setOnError}
            setOnSuccess={setOnSuccess}
            sectionEntry={sectionEntry}
        />
    );
}

export default AddSectionEntry;
