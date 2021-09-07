import React from 'react';
import SectionsComponent from './sections.component';
import { setRoute } from 'utilities';

function Sections() {
    const [tab, setTab] = React.useState(0);

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
    return <SectionsComponent pageData={pageData} tab={tab} handleTabChange={handleTabChange} />;
}

export default Sections;
