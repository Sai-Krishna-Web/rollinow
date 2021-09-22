import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import CharactersComponent from './characters.component';
import { getShowCharactersGQL } from 'services/queries';
import { DELETE_CHARACTER_URL } from 'services/mutations';

function Characters(props) {
    const [open, setOpen] = useState(false);
    const [character, setCharacter] = useState('');
    const [deleteCharacterEntry] = useMutation(DELETE_CHARACTER_URL);
    const { data, loading, error, refetch } = useQuery(getShowCharactersGQL, {
        variables: { id: props.id }
    });

    const addShowCharacter = () => {
        setOpen(true);
    };

    const deleteClick = (id) => {
        deleteCharacterEntry({
            variables: {
                id: Number(id)
            }
        });
        refetch();
    };
    const editClick = (id) => {
        const row = data?.getShow.characters.find((row) => {
            return row.id === id;
        });
        setCharacter(row);
        setOpen(true);
    };

    const columns = [
        { id: 'character', label: 'character', minWidth: 170 },
        { id: 'cast', label: 'Name', minWidth: 170, format: (value) => value.name }
    ];
    return (
        <CharactersComponent
            {...props}
            characters={data?.getShow.characters}
            loading={loading}
            error={error}
            refetch={refetch}
            columns={columns}
            addShowCharacter={addShowCharacter}
            editClick={editClick}
            deleteClick={deleteClick}
            open={open}
            setOpen={setOpen}
            character={character}
            setCharacter={setCharacter}
        />
    );
}

export default Characters;
