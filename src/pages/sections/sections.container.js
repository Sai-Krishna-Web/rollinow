import React from 'react';
import { useQuery } from '@apollo/client';
import SectionsComponent from './sections.component';
import { setRoute } from 'utilities';
import { getSectionsListGQL } from 'services/queries';

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
    return (
        <SectionsComponent
            pageData={pageData}
            tab={tab}
            handleTabChange={handleTabChange}
            data={data}
            loading={loading}
            error={error}
        />
    );
}

export default Sections;
