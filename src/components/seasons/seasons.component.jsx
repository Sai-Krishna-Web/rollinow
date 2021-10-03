import React from 'react';
import { makeStyles, CircularProgress, Box, Button, Paper } from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { SectionsList, AddSeason, SnackBarAndAlert } from 'components';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    },
    paper: {
        padding: theme.spacing(3),
        margin: 'auto',
        minWidth: 300,
        border: '1px solid #ddd',
        boxShadow: 'none',
        maxWidth: 'fit-content'
    },
    media: {
        height: '100%',
        minWidth: 200,
        backgroundColor: '#171717',
        backgroundSize: 'contain'
    }
}));

const SeasonsComponent = (props) => {
    const { columns, seasons, loading, error, open, addShowSeason, onSuccess, onError, message } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h4>Seasons</h4>
                </div>
                <div>
                    <Button startIcon={<AddOutlinedIcon />} color="primary" variant="outlined" onClick={addShowSeason}>
                        Season
                    </Button>
                </div>
            </Box>

            {loading ? (
                <Box m={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                error.message
            ) : (
                <Paper variant="outlined">
                    <SectionsList
                        columns={columns}
                        rows={seasons}
                        onRowClick={() => undefined}
                        //deleteClick={props.deleteClick}
                        editClick={props.editClick}
                    />
                </Paper>
            )}
            {open && (
                <AddSeason
                    open={open}
                    setOpen={props.setOpen}
                    seasonData={props.season}
                    setSeason={props.setSeason}
                    refetch={props.refetch}
                    showId={props.id}
                    setOnSuccess={props.setOnSuccess}
                    setOnError={props.setOnError}
                    setMessage={props.setMessage}
                />
            )}
            {onSuccess && (
                <SnackBarAndAlert
                    open={onSuccess}
                    onClose={() => {
                        props.setOnSuccess(false);
                        props.handleClose();
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
    );
};

export default SeasonsComponent;
