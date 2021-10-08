import React from 'react';
import { AddGenre, PageHeader } from 'components';
import { Box, CircularProgress, Paper } from '@material-ui/core';
import { SectionsList, SnackBarAndAlert } from 'components';

const GenresComponent = (props) => {
    const { pageData, loading, error, data, open, setOpen, onSuccess, onError, message } = props;
    return (
        <Paper variant="outlined">
            <div style={{ margin: 'auto' }}>
                <PageHeader pageData={pageData} />
                <div style={{ height: '600px', textAlign: 'center' }}>
                    {loading ? (
                        <Box textAlign="center" py={5}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Box textAlign="center" py={5}>
                            An error occurred, please try reloading your browser.
                        </Box>
                    ) : (
                        <SectionsList
                            rows={data.getGenresList}
                            columns={props.columns}
                            onRowClick={() => undefined}
                            editClick={props.editClick}
                            deleteClick={props.deleteClick}
                            refetch={props.refetch}
                        />
                    )}
                    {open && (
                        <AddGenre
                            open={open}
                            setOpen={setOpen}
                            refetch={props.refetch}
                            setOnSuccess={props.setOnSuccess}
                            setOnError={props.setOnError}
                            setMessage={props.setMessage}
                            genreData={props.genre}
                            setGenre={props.setGenre}
                        />
                    )}
                    {onSuccess && (
                        <SnackBarAndAlert
                            open={onSuccess}
                            onClose={() => {
                                props.setOnSuccess(false);
                                setOpen(false);
                            }}
                            type="success"
                        >
                            {message}
                        </SnackBarAndAlert>
                    )}
                    {onError && (
                        <SnackBarAndAlert
                            open={onError}
                            onClose={() => {
                                props.setOnError(false);
                            }}
                            type="error"
                        >
                            {`Failed:  ${message}`}
                        </SnackBarAndAlert>
                    )}
                </div>
            </div>
        </Paper>
    );
};

export default GenresComponent;
