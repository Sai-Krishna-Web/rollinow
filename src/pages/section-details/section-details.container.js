import React from 'react';
import { useQuery } from '@apollo/client';
import SectionDetailsComponent from './section-details.component';
import { getSectionGQL } from 'services/queries';
import { formatDateTimeByFormatString } from 'utilities/helper';

function SectionDetails(props) {
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const { section } = props.location.state;
    const { loading, error } = useQuery(getSectionGQL, {
        variables: { id: section.id },
        onCompleted: (data) => {
            if (data?.section?.sectionEntries) {
                let entries = data.section.sectionEntries;
                entries = entries.map((entry) => {
                    const { id, hidden, sequence, updatedAt } = entry;
                    const name = entry.showId
                        ? entry.show.title
                        : entry.listId
                        ? entry.list.name
                        : entry.castId
                        ? entry.cast.name
                        : entry.user?.name;
                    return { id, hidden, sequence, updatedAt, name };
                });
                setRows(entries);
            }
        }
    });

    const AddSectionEntry = () => {
        setOpen(true);
    };
    const pageData = {
        title: 'Section details',
        actionName: 'Section entry',
        onAction: AddSectionEntry
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'sequence', label: 'Sequence', minWidth: 100 },
        {
            id: 'hidden',
            label: 'Hidden',
            minWidth: 170,
            format: (value) => (value ? 'Yes' : 'No')
        },
        {
            id: 'updatedAt',
            label: 'Updated Time',
            minWidth: 170,
            format: (value) => value && formatDateTimeByFormatString(value, 'YYYY-MM-DD hh:mm A')
        }
    ];

    return (
        <SectionDetailsComponent
            pageData={pageData}
            open={open}
            setOpen={setOpen}
            section={section}
            loading={loading}
            error={error}
            columns={columns}
            rows={rows}
        />
    );
}

export default SectionDetails;
