import React from 'react';
import { useQuery } from '@apollo/client';
import CastDetailsComponent from './cast-details.component';
import { getCastDetailsListGQL } from 'services/queries';
import { formatDateTimeByFormatString } from 'utilities/helper';

function CastDetails(props) {
    const { id } = props.match.params;
    const { data, loading, error } = useQuery(getCastDetailsListGQL, {
        variables: { id: id, type: 'TV' }
    });

    const { data: movies, loading: moviesloading } = useQuery(getCastDetailsListGQL, {
        variables: { id: id, type: 'MOVIE' }
    });

    const pageData = {
        title: 'Cast Details'
    };

    const columns = [
        { id: 'character', label: 'Character', minWidth: 170 },
        { id: 'show', label: 'Title', minWidth: 170, format: (value) => value.title },
        {
            id: 'show',
            label: 'Release Date',
            minWidth: 180,
            format: (value) => value && formatDateTimeByFormatString(value.releaseDate, 'YYYY-MM-DD')
        }
    ];

    return (
        <CastDetailsComponent
            pageData={pageData}
            data={data}
            loading={loading}
            error={error}
            columns={columns}
            movies={movies}
            moviesloading={moviesloading}
        />
    );
}

export default CastDetails;
