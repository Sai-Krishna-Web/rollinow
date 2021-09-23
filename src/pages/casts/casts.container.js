import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import CastsComponent from './casts.component';
import { setRoute } from 'utilities';
import { getCastListGQL } from 'services/queries';
import { DELETE_CAST } from 'services/mutations';

function Casts() {
    const { data, loading, error, refetch, networkStatus } = useQuery(getCastListGQL);
    const [deleteCast] = useMutation(DELETE_CAST);

    const AddCast = () => {
        setRoute('/addCast');
    };

    const editClick = (id) => {
        const row = data.searchArtists.data.find((row) => {
            return row.id === id;
        });
        setRoute(`/editCast/${id}`, {
            cast: row
        });
    };

    const deleteClick = (id) => {
        deleteCast({
            variables: {
                id: Number(id)
            }
        });
        refetch();
    };

    const pageData = {
        title: 'Casts',
        actionName: 'Add Cast',
        onAction: AddCast
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'entityId', label: 'Entity Id', minWidth: 100 },
        {
            id: 'thumbnail',
            label: 'Thumbnail',
            minWidth: 100
        },
        {
            id: 'biography',
            label: 'Biography',
            minWidth: 140
        }
    ];

    return (
        <CastsComponent
            pageData={pageData}
            data={data}
            loading={loading}
            error={error}
            refetch={refetch}
            columns={columns}
            editClick={editClick}
            deleteClick={deleteClick}
            networkStatus={networkStatus}
        />
    );
}

export default Casts;
