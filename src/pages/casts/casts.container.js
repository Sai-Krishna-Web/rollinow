import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import CastsComponent from './casts.component';
import { setRoute } from 'utilities';
import { getCastListGQL } from 'services/queries';
import { DELETE_CAST } from 'services/mutations';

function Casts() {
    const { data, loading, error, refetch } = useQuery(getCastListGQL);
    const [deleteSection] = useMutation(DELETE_CAST);

    const AddCast = () => {
        setRoute('/addCast');
    };

    const editClick = (id) => {
        setRoute(`/editCast/${id}`);
    };

    const deleteClick = (id) => {
        deleteSection({
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
        />
    );
}

export default Casts;
