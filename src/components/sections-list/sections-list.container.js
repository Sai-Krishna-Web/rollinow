import React from 'react';
import SectionsListComponent from './sections-list.component';

function SectionsList(props) {
    const { rows } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
            minWidth: 170
        },
        {
            id: 'endTime',
            label: 'EndTime',
            minWidth: 170
        }
    ];

    return (
        <SectionsListComponent
            handleChangePage={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rows={rows}
            columns={columns}
        />
    );
}

export default SectionsList;
