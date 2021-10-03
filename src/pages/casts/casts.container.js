import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import CastsComponent from './casts.component';
import { setRoute } from 'utilities';
import { getCastListGQL } from 'services/queries';
import { DELETE_CAST } from 'services/mutations';

function Casts() {
    const [searchValue, setSearchValue] = React.useState('');
    const { data, loading, error, refetch } = useQuery(getCastListGQL, {
        variables: {
            query: searchValue
        }
    });
    const [deleteCast] = useMutation(DELETE_CAST);

    const AddCast = () => {
        setRoute('/casts/add');
    };

    const editClick = (id) => {
        const row = data.searchArtists.data.find((row) => {
            return row.id === id;
        });
        setRoute(`/casts/edit/${id}`, {
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
        onAction: AddCast,
        onSearch: true,
        searchValue: searchValue,
        setSearchValue: setSearchValue
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'entityId', label: 'Entity Id', minWidth: 100 },
        {
            id: 'thumbnail',
            label: 'Thumbnail',
            minWidth: 100,
            format: (value) => value.split('/').pop()
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
