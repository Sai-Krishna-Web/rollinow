import React from 'react';
import { useQuery } from '@apollo/client';
import ShowDetailsComponent from './show-details.component';
import { getShowGQL } from 'services/queries';

function ShowDetails(props) {
    const { id } = props.match.params;
    const { data, loading, error, refetch } = useQuery(getShowGQL, {
        variables: { id: id }
    });

    const pageData = {
        title: 'Show details',
        actionName: 'Charcter'
    };

    return (
        <ShowDetailsComponent
            pageData={pageData}
            show={data?.getShow}
            loading={loading}
            error={error}
            id={id}
            refetch={refetch}
        />
    );
}

export default ShowDetails;
