import React from 'react';
import { PageHeader, AddSectionEntry } from 'components';
import { Typography, Grid, Box } from '@material-ui/core';

const SectionDetailsComponent = (props) => {
    const { pageData, open, setOpen } = props;
    const { section } = props.location.state;
    return (
        <div style={{ margin: 'auto' }}>
            <PageHeader pageData={pageData} />
            <div style={{ height: '600px' }}>
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h6">
                                {section.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="subtitle1">
                                Place: {section.place}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">
                                Type: {section.type}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">
                                Start Date: {section.startTime || 'NA'}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">
                                End Time: {section.endTime || 'NA'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </div>

            {open && <AddSectionEntry open={open} setOpen={setOpen} section={section} />}
        </div>
    );
};

export default SectionDetailsComponent;
