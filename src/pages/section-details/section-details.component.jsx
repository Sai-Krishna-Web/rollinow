import React from 'react';
import { PageHeader, AddSectionEntry, SectionsList } from 'components';
import { Typography, Grid, Box, makeStyles, Paper, CircularProgress } from '@material-ui/core';
import { formatDateTimeByFormatString } from 'utilities/helper';

const useStyles = makeStyles({
    statusLabel: {
        margin: '5px',
        fontSize: '12px',
        border: '1px solid #158a82',
        borderRadius: '8px',
        padding: '0px 8px',
        color: '#777777'
    }
});

const SectionDetailsComponent = (props) => {
    const { pageData, open, setOpen, section, rows, loading, error } = props;

    const classes = useStyles();
    return (
        <Paper variant="outlined" style={{ margin: 'auto' }}>
            <PageHeader pageData={pageData} />
            <div style={{ height: '600px' }}>
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h3" color="textPrimary">
                                {section.title}
                                <span
                                    className={classes.statusLabel}
                                    style={{
                                        backgroundColor: section.shown ? '#d4fbf4' : '#F2F2F2'
                                    }}
                                >
                                    Active
                                </span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" color="textSecondary">
                                Place: {section.place}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Type: {section.type}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Start time:{' '}
                                {section.startTime
                                    ? formatDateTimeByFormatString(section.startTime, 'YYYY-MM-DD hh:mm A')
                                    : 'NA'}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                End time:{' '}
                                {section.endTime
                                    ? formatDateTimeByFormatString(section.endTime, 'YYYY-MM-DD hh:mm A')
                                    : 'NA'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" color="textPrimary">
                                Section entries:
                            </Typography>
                            <Paper variant="outlined" style={{ minHeight: '50px', textAlign: 'center' }}>
                                {rows.length > 0 ? (
                                    <SectionsList
                                        rows={rows}
                                        columns={props.columns}
                                        onRowClick={() => undefined}
                                        deleteClick={props.deleteClick}
                                        editClick={props.editClick}
                                    />
                                ) : (
                                    <Box m={3}>
                                        {loading ? (
                                            <CircularProgress />
                                        ) : error ? (
                                            error.message
                                        ) : (
                                            rows.length === 0 && 'No entries yet!'
                                        )}
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </div>

            {open && (
                <AddSectionEntry
                    open={open}
                    setOpen={setOpen}
                    section={section}
                    sectionEntry={props.sectionEntry}
                    setSectionEntry={props.setSectionEntry}
                    refetch={props.refetch}
                />
            )}
        </Paper>
    );
};

export default SectionDetailsComponent;
