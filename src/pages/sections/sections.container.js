import React from 'react';
import { useQuery } from '@apollo/client';
import SectionsComponent from './sections.component';
import { setRoute } from 'utilities';
import { getSectionsListGQL } from 'services/queries';
import { formatDateTimeByFormatString } from 'utilities/helper';

function Sections() {
    const [tab, setTab] = React.useState(0);
    const { data, loading, error } = useQuery(getSectionsListGQL);

    const AddSection = () => {
        setRoute('/addSection');
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
            minWidth: 170
        },
        {
            id: 'startTime',
            label: 'Start Time',
            minWidth: 170,
            format: (value) => value && formatDateTimeByFormatString(value, 'YYYY-MM-DD hh:mm A')
        },
        {
            id: 'endTime',
            label: 'EndTime',
            minWidth: 170,
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
        />
    );
}

export default Sections;
