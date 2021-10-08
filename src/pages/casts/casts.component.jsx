import React from 'react';
import { PageHeader } from 'components';
import { Paper, Box, CircularProgress } from '@material-ui/core';
import { SectionsList } from 'components';

const CastsComponent = (props) => {
    const { pageData, loading, error, data } = props;
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
                            rows={data.searchArtists.data}
                            columns={props.columns}
                            onRowClick={() => undefined}
                            editClick={props.editClick}
                            deleteClick={props.deleteClick}
                            count={data.searchArtists.hits}
                            refetch={props.refetch}
                        />
                    )}
                </div>
            </div>
        </Paper>
    );
};

export default CastsComponent;
