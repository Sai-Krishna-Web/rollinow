import React, { useState } from 'react';
import SectionsListComponent from './sections-list.component';

function SectionsList(props) {
    const { rows, columns, onRowClick, editClick, deleteClick, count, refetch } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [fetching, setFetching] = useState(false);
    const [data, setData] = React.useState([]);

    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
        await fetchData(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        await fetchData(0, parseInt(event.target.value, 10));
    };

    const fetchData = async (currentPage, noOfItems) => {
        setFetching(true);
        await refetch({
            skip: currentPage * noOfItems,
            take: noOfItems
        });
        setFetching(false);
    };

    React.useEffect(() => {
        setData(rows);
    }, [rows]);

    return (
        <SectionsListComponent
            handleChangePage={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rows={data}
            columns={columns}
            onRowClick={onRowClick}
            editClick={editClick}
            deleteClick={deleteClick}
            count={count}
            fetching={fetching}
        />
    );
}

export default SectionsList;
