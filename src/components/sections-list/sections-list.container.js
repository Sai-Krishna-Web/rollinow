import React, { useState } from 'react';
import SectionsListComponent from './sections-list.component';

function SectionsList(props) {
    const { rows, columns, onRowClick, editClick, deleteClick } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <SectionsListComponent
            handleChangePage={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rows={rows}
            columns={columns}
            onRowClick={onRowClick}
            editClick={editClick}
            deleteClick={deleteClick}
        />
    );
}

export default SectionsList;
