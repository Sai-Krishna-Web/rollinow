import React from 'react';
import { PageHeader } from 'components';
import { Box, CircularProgress } from '@material-ui/core';
import { SectionsList } from 'components';

const CastsComponent = (props) => {
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
                        rows={data.searchArtists.data}
                        columns={props.columns}
                        onRowClick={() => undefined}
                        editClick={props.editClick}
                        deleteClick={props.deleteClick}
                    />
                )}
            </div>
        </div>
    );
};

export default CastsComponent;
