import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import SectionsComponent from './sections.component';
import { setRoute } from 'utilities';
import { getSectionsListGQL } from 'services/queries';
import { DELETE_SECTION } from 'services/mutations';
import { formatDateTimeByFormatString } from 'utilities/helper';

function Sections() {
    const [tab, setTab] = React.useState(0);
    const { data, loading, error, refetch } = useQuery(getSectionsListGQL);
    const [deleteSection] = useMutation(DELETE_SECTION);

    const AddSection = () => {
        setRoute('/addSection');
    };

    const onRowClick = (row) => {
        setRoute(`/sectionDetails/${row.id}`, {
            section: row
        });
    };

    const editClick = (id) => {
        setRoute(`/editSection/${id}`);
    };

    const deleteClick = (id) => {
        deleteSection({
            variables: {
                id: Number(id)
            }
        });
        refetch();
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const pageData = {
        title: 'Sections',
        actionName: 'Create section',
        onAction: AddSection
    };
    const columns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'type', label: 'Type', minWidth: 100 },
        {
            id: 'place',
            label: 'Place',
            minWidth: 100
        },
        {
            id: 'startTime',
            label: 'Start Time',
            minWidth: 140,
            format: (value) => value && formatDateTimeByFormatString(value, 'YYYY-MM-DD hh:mm A')
        },
        {
            id: 'endTime',
            label: 'EndTime',
            minWidth: 140,
            format: (value) => value && formatDateTimeByFormatString(value, 'YYYY-MM-DD hh:mm A')
        }
    ];

    return (
        <SectionsComponent
            pageData={pageData}
            tab={tab}
            handleTabChange={handleTabChange}
            data={data}
            loading={loading}
            error={error}
            columns={columns}
            onRowClick={onRowClick}
            editClick={editClick}
            deleteClick={deleteClick}
        />
    );
}

export default Sections;
