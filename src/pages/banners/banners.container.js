import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import BannersComponent from './banners.component';
import { getBannersListGQL } from 'services/queries';

function Banners() {
    const { data, loading, error, refetch } = useQuery(getBannersListGQL);
    const [open, setOpen] = useState(false);
    const [banner, setBanner] = useState('');
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const pageData = {
        title: 'Banners',
        actionName: 'Add Banner',
        onAction: () => {
            setBanner('');
            setOpen(true);
        }
    };

    const columns = [
        {
            id: 'place',
            label: 'Place',
            minWidth: 100
        },
        { id: 'show', label: 'Title', minWidth: '100', format: (value) => value.title }
    ];

    const editClick = (id) => {
        const row = data?.allBanners.find((row) => {
            return row.id === id;
        });
        setBanner(row);
        setOpen(true);
    };

    return (
        <BannersComponent
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
            banner={banner}
            setBanner={setBanner}
        />
    );
}

export default Banners;
