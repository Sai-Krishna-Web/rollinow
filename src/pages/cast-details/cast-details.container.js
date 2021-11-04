import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import CastDetailsComponent from './cast-details.component';
import { getCastDetailsListGQL } from 'services/queries';

function CastDetails(props) {
    const { id } = props.match.params;
    const { data, loading, error, refetch } = useQuery(getCastDetailsListGQL, {
        variables: { id: id, type: 'TV' }
    });
    const [open, setOpen] = useState(false);
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const pageData = {
        title: 'Cast Details'
    };

    const columns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'releaseDate', label: 'Release Date', minWidth: 180 }
    ];

    return (
        <CastDetailsComponent
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

export default CastDetails;
