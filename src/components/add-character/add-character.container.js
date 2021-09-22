import React, { useState } from 'react';
import AddCharacterComponent from './add-character.component';
import { useMutation } from '@apollo/client';
import { ADD_CHARACTER_URL, UPDATE_CHARACTER_URL } from 'services/mutations';

function AddCharacter(props) {
    const { showId, open, setOpen, characterData, setOnSuccess, setOnError, setMessage, refetch } = props;
    const URL = characterData ? UPDATE_CHARACTER_URL : ADD_CHARACTER_URL;
    const [initialState, setState] = useState(characterData ? characterData : { character: '', entryId: null });
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [addCharacter, { loading }] = useMutation(URL, {
        onCompleted: (data) => {
            if (data?.updateCharacter) {
                setMessage('Character updated successfully');
            }
            if (data?.addCharacter) {
                setMessage('Character added successfully');
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

    const handleAddCharacter = (id, value) => {
        setState({ ...initialState, [id]: value });
    };

    const validate = (values) => {
        let errors = {};

        if (!values.entryId) {
            errors.entryId = 'Please select an option';
        }
        if (initialState.entryId && values.character) {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }

        if (!values.character) {
            errors.character = 'Character is required';
        }

        return errors;
    };

    const handleSubmit = () => {
        const { character, entryId } = initialState;
        let vars = {
            character,
            showId,
            castId: entryId
        };
        if (characterData) vars['id'] = characterData.id;
        addCharacter({
            variables: {
                character: vars
            }
        });
    };
    return (
        <AddCharacterComponent
            open={open}
            handleClose={() => setOpen(false)}
            handleAddCharacter={handleAddCharacter}
            handleSubmit={handleSubmit}
            initialState={initialState}
            enableSubmit={enableSubmit}
            validate={validate}
            loading={loading}
        />
    );
}

export default AddCharacter;
