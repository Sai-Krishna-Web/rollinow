import React from 'react';
import { useQuery } from '@apollo/client';
import MoviesComponent from './movies.component';
import { setRoute } from 'utilities';
import { getMoviesListGQL } from 'services/queries';
import { formatDateTimeByFormatString } from 'utilities/helper';

function Movies() {
    const { data, loading, error, refetch } = useQuery(getMoviesListGQL);
    const AddMovie = () => {
        setRoute('/addShow');
    };
    const pageData = {
        title: 'Movies',
        actionName: 'Add Movie',
        onAction: AddMovie
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
        <MoviesComponent
            pageData={pageData}
            data={data}
            loading={loading}
            error={error}
            refetch={refetch}
            columns={columns}
        />
    );
}

export default Movies;
