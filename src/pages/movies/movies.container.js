import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MoviesComponent from './movies.component';
import { setRoute } from 'utilities';
import { getMoviesListGQL } from 'services/queries';
import { DELETE_SHOW } from 'services/mutations';
import { formatDateTimeByFormatString } from 'utilities/helper';

function Movies() {
    const [onSuccess, setOnSuccess] = useState(false);
    const [onError, setOnError] = useState(false);
    const [message, setMessage] = useState();
    const [searchValue, setSearchValue] = React.useState('');
    const { data, loading, error, refetch } = useQuery(getMoviesListGQL, {
        variables: {
            query: searchValue
        }
    });
    const [deleteMovie] = useMutation(DELETE_SHOW, {
        onCompleted: () => {
            setOnSuccess(true);
            setMessage('Movie deleted successfully');
        },
        onError: (error) => {
            setOnError(true);
            setMessage(`Failed: ${error.message}`);
        }
    });

    const AddMovie = () => {
        setRoute('/addShow');
    };

    const editClick = (id) => {
        setRoute(`/editShow/${id}`);
    };

    const deleteClick = (id) => {
        deleteMovie({
            variables: {
                id
            }
        });
        refetch();
    };

    const pageData = {
        title: 'Movies',
        actionName: 'Add Movie',
        onAction: AddMovie,
        onSearch: true,
        searchValue: searchValue,
        setSearchValue: setSearchValue
    };

    const columns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'language', label: 'Language', minWidth: 100 },
        {
            id: 'inFavorites',
            label: 'In favorites',
            minWidth: 50,
            format: (value) => (value ? 'Yes' : 'No')
        },
        {
            id: 'isIndianOTT',
            label: 'Indian OTT',
            minWidth: 50,
            format: (value) => (value ? 'Yes' : 'No')
        },
        {
            id: 'releaseDate',
            label: 'Release date',
            minWidth: 140,
            format: (value) => value && formatDateTimeByFormatString(value, 'YYYY-MM-DD', false, true)
        }
    ];
    return (
        <MoviesComponent
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

export default Movies;
