import React from 'react';
import SectionDetailsComponent from './section-details.component';

function SectionDetails(props) {
    const [open, setOpen] = React.useState(false);
    const AddSectionEntry = () => {
        setOpen(true);
    };
    const pageData = {
        title: 'Section details',
        actionName: 'Section entry',
        onAction: AddSectionEntry
    };
    return <SectionDetailsComponent pageData={pageData} open={open} setOpen={setOpen} {...props} />;
}

export default SectionDetails;
