import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import SectionDetailsComponent from './section-details.component';
import { getSectionEntriesGQL } from 'services/queries';
import { formatDateTimeByFormatString } from 'utilities/helper';
import { DELETE_SECTION_ETRY } from 'services/mutations';

function SectionDetails(props) {
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [sectionEntry, setSectionEntry] = useState();
    const { section } = props.location.state;
    const [deleteSectionEntry] = useMutation(DELETE_SECTION_ETRY);
    const { data, loading, error, refetch } = useQuery(getSectionEntriesGQL, {
        variables: { id: section.id }
    });

    React.useEffect(() => {
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
                const entryId = entry.showId || entry.listId || entry.castId || entry.userId;
                return { id, hidden, sequence, updatedAt, name, entryId };
            });
            setRows(entries);
        }
    }, [data]);
    const addSectionEntry = () => {
        setOpen(true);
    };

    const deleteClick = (id) => {
        deleteSectionEntry({
            variables: {
                id: Number(id)
            }
        });
        refetch();
    };
    const editClick = (id) => {
        const row = rows.find((row) => {
            return row.id === id;
        });
        setSectionEntry(row);
        setOpen(true);
    };
    const pageData = {
        title: 'Section details',
        actionName: 'Section entry',
        onAction: addSectionEntry
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
            label: 'Updated at',
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
            deleteClick={deleteClick}
            editClick={editClick}
            sectionEntry={sectionEntry}
            refetch={refetch}
        />
    );
}

export default SectionDetails;
