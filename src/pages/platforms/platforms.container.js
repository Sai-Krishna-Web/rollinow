import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import PlatformsComponent from './platforms.component';
import { getPlatformsListGQL } from 'services/queries';
import Avatar from '@material-ui/core/Avatar';
import { tmdbLink } from 'utilities/helper';

function Platforms() {
    const { data, loading, error, refetch } = useQuery(getPlatformsListGQL);
    const [open, setOpen] = useState(false);
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const pageData = {
        title: 'Platforms',
        actionName: 'Add Platform',
        onAction: () => setOpen(true)
    };

    const imageComponet = (value) => (
        <Avatar alt="Platform" className="circular--portrait" src={tmdbLink(value)}></Avatar>
    );

    const columns = [
        {
            id: 'imageUrl',
            label: '',
            minWidth: 40,
            width: 50,
            format: imageComponet
        },
        { id: 'source', label: 'Name', minWidth: 170 },
        { id: 'flatUrl', label: 'Url', minWidth: 180 }
    ];

    return (
        <PlatformsComponent
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
        />
    );
}

export default Platforms;
