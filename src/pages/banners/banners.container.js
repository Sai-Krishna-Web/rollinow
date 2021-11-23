import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import BannersComponent from './banners.component';
import { getBannersListGQL } from 'services/queries';
import { DELETE_BANNER_URL } from 'services/mutations';

function Banners() {
    const { data, loading, error, refetch } = useQuery(getBannersListGQL);
    const [open, setOpen] = useState(false);
    const [banner, setBanner] = useState('');
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const [deleteBanner] = useMutation(DELETE_BANNER_URL, {
        onCompleted: (data) => {
            if (data?.deleteBanner) {
                setOnSuccess(true);
                setMessage('Banner deleted successfully');
                refetch();
            }
        },
        onError: (error) => {
            setOnError(true);
            setMessage(`Failed: ${error.message}`);
        }
    });

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
            width: 50
        },
        { id: 'show', label: 'Show Title', minWidth: '100', format: (value) => value.title },
        {
            id: 'genreId',
            label: 'Genre',
            minWidth: 100,
            format: (value) => value || 'NA'
        },
        {
            id: 'platformId',
            label: 'Platform',
            minWidth: 100,
            format: (value) => value || 'NA'
        },
        {
            id: 'languageId',
            label: 'Language',
            minWidth: 100,
            format: (value) => value || 'NA'
        }
    ];

    const editClick = (id) => {
        const row = data?.allBanners.find((row) => {
            return row.id === id;
        });
        setBanner(row);
        setOpen(true);
    };

    const deleteClick = (id) => {
        deleteBanner({
            variables: {
                id: Number(id)
            }
        });
        //refetch();
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
            deleteClick={deleteClick}
            banner={banner}
            setBanner={setBanner}
        />
    );
}

export default Banners;
