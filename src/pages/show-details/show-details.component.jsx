import React from 'react';
import { PageHeader, Characters } from 'components';
import SummaryComponent from 'components/summary/summary.component';
import { Box, CircularProgress } from '@material-ui/core';

const ShowDetailsComponent = (props) => {
    const { pageData, id, show, loading, error } = props;

    return (
        <div style={{ margin: 'auto' }}>
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
                        <SummaryComponent addShowForm={show} />
                    )}
                </Box>
                <Box m={2}>
                    <Characters id={id} />
                </Box>
            </div>

            {/* {open && (
                <AddshowEntry
                    open={open}
                    setOpen={setOpen}
                    show={show}
                    showEntry={props.showEntry}
                    setshowEntry={props.setshowEntry}
                    refetch={props.refetch}
                />
            )} */}
        </div>
    );
};

export default ShowDetailsComponent;
