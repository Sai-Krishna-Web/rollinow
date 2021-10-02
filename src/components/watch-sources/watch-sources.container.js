import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import WatchSourcesComponent from './watch-sources.component';
import { getShowWatchSourcesGQL } from 'services/queries';

function WatchSources(props) {
    const [open, setOpen] = useState(false);
    const [watchSource, setWatchSource] = useState('');
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const { data, loading, error, refetch } = useQuery(getShowWatchSourcesGQL, {
        variables: { id: props.id }
    });

    const addShowWatchSource = () => {
        setOpen(true);
    };

    const editClick = (id) => {
        const row = data?.getShow.watch.find((row) => {
            return row.id === id;
        });
        const { source, ...other } = row;
        setWatchSource({ source: source.source, ...other });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        refetch();
    };

    const columns = [
        { id: 'source', label: 'Source', minWidth: 100, format: (value) => value.source },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'price', label: 'Price', minWidth: 100 },
        { id: 'quality', label: 'Quality', minWidth: 100 },
        { id: 'link', label: 'Url', minWidth: 150 }
    ];
    return (
        <WatchSourcesComponent
            {...props}
            watchSources={data?.getShow.watch}
            loading={loading}
            error={error}
            refetch={refetch}
            columns={columns}
            addShowWatchSource={addShowWatchSource}
            editClick={editClick}
            open={open}
            setOpen={setOpen}
            watchSource={watchSource}
            setWatchSource={setWatchSource}
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

export default WatchSources;
