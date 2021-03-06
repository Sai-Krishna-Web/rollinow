import React from 'react';
import { PageHeader, Characters, WatchSources, Seasons } from 'components';
import SummaryComponent from 'components/summary/summary.component';
import { Box, CircularProgress, Paper } from '@material-ui/core';

const ShowDetailsComponent = (props) => {
    const { pageData, id, show, loading, error } = props;

    return (
        <Paper variant="outlined" style={{ margin: 'auto' }}>
            <PageHeader pageData={pageData} />
            <div style={{ minHeight: '600px' }}>
                <Box m={2}>
                    {loading ? (
                        <Box m={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        error.message
                    ) : (
                        <SummaryComponent addShowForm={show} id={id} />
                    )}
                </Box>
                <Box m={2}>
                    <Characters id={id} />
                </Box>
                <Box m={2}>
                    <WatchSources id={id} />
                </Box>
                {show?.type === 'TV' && (
                    <Box m={2}>
                        <Seasons id={id} />
                    </Box>
                )}
            </div>
        </Paper>
    );
};

export default ShowDetailsComponent;
