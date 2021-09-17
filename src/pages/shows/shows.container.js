import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import ShowsComponent from './shows.component';
import { setRoute } from 'utilities';
import { getShowsListGQL } from 'services/queries';
import { formatDateTimeByFormatString } from 'utilities/helper';
import { DELETE_SHOW } from 'services/mutations';

function Shows() {
    const [onSuccess, setOnSuccess] = useState(false);
    const [onError, setOnError] = useState(false);
    const [message, setMessage] = useState();
    const { data, loading, error, refetch } = useQuery(getShowsListGQL);
    const [deleteShow] = useMutation(DELETE_SHOW, {
        onCompleted: () => {
            setOnSuccess(true);
            setMessage('Show deleted successfully');
        },
        onError: (error) => {
            setOnError(true);
            setMessage(`Failed: ${error.message}`);
        }
    });
    const AddShow = () => {
        setRoute('/addShow');
    };

    const editClick = (id) => {
        setRoute(`/editShow/${id}`);
    };

    const deleteClick = (id) => {
        deleteShow({
            variables: {
                id
            }
        });
        refetch();
    };

    const pageData = {
        title: 'Shows',
        actionName: 'Add show',
        onAction: AddShow
    };

    const columns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'language', label: 'Language', minWidth: 100 },
        {
            id: 'inFavorites',
            label: 'In favorites',
            minWidth: 100
        },
        {
            id: 'isIndianOTT',
            label: 'Indian OTT',
            minWidth: 140
        },
        {
            id: 'releaseDate',
            label: 'Release date',
            minWidth: 140,
            format: (value) => value && formatDateTimeByFormatString(value, 'YYYY-MM-DD')
        }
    ];

    return (
        <ShowsComponent
            pageData={pageData}
            data={data}
            loading={loading}
            error={error}
            refetch={refetch}
            columns={columns}
            editClick={editClick}
            deleteClick={deleteClick}
            onError={onError}
            setOnError={setOnError}
            onSuccess={onSuccess}
            setOnSuccess={setOnSuccess}
            message={message}
        />
    );
}

export default Shows;
