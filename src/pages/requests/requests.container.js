import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import RequestsComponent from './requests.component';
import { getRequestsListGQL } from 'services/queries';

function Requests() {
    const { data, loading, error, refetch } = useQuery(getRequestsListGQL);
    const [open, setOpen] = useState(false);
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const pageData = {
        title: 'Requests'
    };

    const columns = [
        {
            id: 'imageUrl',
            label: '',
            minWidth: 40,
            width: 50
        },
        { id: 'source', label: 'Name', minWidth: 170 },
        { id: 'flatUrl', label: 'Url', minWidth: 180 }
    ];

    return (
        <RequestsComponent
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

export default Requests;
