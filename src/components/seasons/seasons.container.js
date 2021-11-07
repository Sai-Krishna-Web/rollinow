import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import SeasonsComponent from './seasons.component';
import { getShowSeasonsGQL } from 'services/queries';

function Seasons(props) {
    const [open, setOpen] = useState(false);
    const [season, setSeason] = useState('');
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const { data, loading, error, refetch } = useQuery(getShowSeasonsGQL, {
        variables: { id: props.id }
    });

    const addShowSeason = () => {
        setOpen(true);
    };

    const editClick = (id) => {
        const row = data?.getShow.seasons.find((row) => {
            return row.id === id;
        });
        //const { source, ...other } = row;
        setSeason(row);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        refetch();
    };

    const columns = [
        { id: 'seasonName', label: 'Name', minWidth: 100 },
        { id: 'seasonYear', label: 'Year', minWidth: 100 },
        { id: 'episodes', label: 'Episodes', minWidth: 100 }
    ];
    return (
        <SeasonsComponent
            {...props}
            seasons={data?.getShow?.seasons}
            loading={loading}
            error={error}
            refetch={refetch}
            columns={columns}
            addShowSeason={addShowSeason}
            editClick={editClick}
            open={open}
            setOpen={setOpen}
            season={season}
            setSeason={setSeason}
            handleClose={handleClose}
            onError={onError}
            onSuccess={onSuccess}
            message={message}
            setOnError={setOnError}
            setOnSuccess={setOnSuccess}
            setMessage={setMessage}
        />
    );
}

export default Seasons;
