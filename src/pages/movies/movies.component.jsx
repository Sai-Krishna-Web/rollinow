import React from 'react';
import { PageHeader, SnackBarAndAlert } from 'components';
import { Box, CircularProgress } from '@material-ui/core';
import { SectionsList } from 'components';

const MoviesComponent = (props) => {
    const { pageData, loading, error, data } = props;
    return (
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
                        rows={data.searchShows.data}
                        columns={props.columns}
                        onRowClick={() => undefined}
                        editClick={props.editClick}
                        deleteClick={props.deleteClick}
                    />
                )}
            </div>
            {props.onSuccess && (
                <SnackBarAndAlert
                    open={props.onSuccess}
                    onClose={() => {
                        props.setOnSuccess(false);
                    }}
                    type="success"
                >
                    {props.message}
                </SnackBarAndAlert>
            )}
            {props.onError && (
                <SnackBarAndAlert
                    open={props.onError}
                    onClose={() => {
                        props.setOnError(false);
                    }}
                    type="error"
                >
                    {props.message}
                </SnackBarAndAlert>
            )}
        </div>
    );
};

export default MoviesComponent;
