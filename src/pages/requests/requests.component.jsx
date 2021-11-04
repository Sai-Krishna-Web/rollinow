import React from 'react';
import { PageHeader } from 'components';
import { Box, CircularProgress, Paper } from '@material-ui/core';
import { SectionsList } from 'components';

const RequestsComponent = (props) => {
    const { pageData, loading, error, data } = props;
    return (
        <Paper variant="outlined" style={{ margin: 'auto' }}>
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
                        rows={data.allRequests.data}
                        columns={props.columns}
                        onRowClick={() => undefined}
                        editClick={props.editClick}
                        deleteClick={props.deleteClick}
                        refetch={props.refetch}
                    />
                )}
            </div>
        </Paper>
    );
};

export default RequestsComponent;
