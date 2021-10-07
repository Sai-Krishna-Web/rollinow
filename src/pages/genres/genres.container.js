import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import GenresComponent from './genres.component';
import { getGenresListGQL } from 'services/queries';
import Avatar from '@material-ui/core/Avatar';

function Genres() {
    const { data, loading, error, refetch } = useQuery(getGenresListGQL);
    const [open, setOpen] = useState(false);
    const [genre, setGenre] = useState('');
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const pageData = {
        title: 'Genres',
        actionName: 'Add Genre',
        onAction: () => {
            setGenre('');
            setOpen(true);
        }
    };

    const imageComponet = (value) => <Avatar alt="Genre" className="circular--portrait" src={value}></Avatar>;
    const columns = [
        {
            id: 'image',
            label: '',
            minWidth: 40,
            width: 50,
            format: imageComponet
        },
        { id: 'genre', label: 'Genre', minWidth: '100%' }
    ];

    const editClick = (id) => {
        const row = data?.getGenresList.find((row) => {
            return row.genre === id;
        });
        const { genre, image } = row;
        setGenre({ genre, image });
        setOpen(true);
    };

    return (
        <GenresComponent
            pageData={pageData}
            data={data}
            loading={loading}
            error={error}
            refetch={refetch}
            columns={columns}
            open={open}
            setOpen={setOpen}
            onError={onError}
            onSuccess={onSuccess}
            message={message}
            setOnError={setOnError}
            setOnSuccess={setOnSuccess}
            setMessage={setMessage}
            editClick={editClick}
            genre={genre}
            setGenre={setGenre}
        />
    );
}

export default Genres;
