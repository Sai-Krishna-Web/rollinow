import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledTableCell = withStyles(() => ({
    head: {
        backgroundColor: '#d5fbf4',
        fontWeight: 600
    }
}))(TableCell);

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 540
    }
});

function SectionsListComponent(props) {
    const {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        columns,
        rows,
        onRowClick,
        editClick,
        deleteClick,
        count,
        fetching
    } = props;
    const classes = useStyles();

    return (
        <>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, width: column.width }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            {(editClick || deleteClick) && (
                                <StyledTableCell key="actions" style={{ width: 96 }}>
                                    Actions
                                </StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetching ? (
                            <TableRow>
                                <TableCell colSpan={columns?.length + 1} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns?.length + 1} align="center">
                                    No entries yet!
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id || index}
                                        onClick={() => onRowClick(row)}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                        {(editClick || deleteClick) && (
                                            <TableCell key="actions" onClick={(e) => e.stopPropagation()}>
                                                {editClick && (
                                                    <IconButton
                                                        aria-label="edit"
                                                        size="small"
                                                        onClick={() => editClick(row.id || row.genre || row.language)}
                                                        color="primary"
                                                    >
                                                        <EditOutlinedIcon />
                                                    </IconButton>
                                                )}
                                                {deleteClick && (
                                                    <IconButton
                                                        aria-label="delete"
                                                        size="small"
                                                        onClick={() => deleteClick(row.id)}
                                                        color="secondary"
                                                    >
                                                        <DeleteOutlinedIcon />
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {count > 20 && (
                <TablePagination
                    rowsPerPageOptions={[20, 50, 100]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </>
    );
}

export default SectionsListComponent;
