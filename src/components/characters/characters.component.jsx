import React from 'react';
import { makeStyles, CircularProgress, Box } from '@material-ui/core';
import { SectionsList, AddSectionEntry } from 'components';
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

const CharactersComponent = (props) => {
    const { columns, characters, loading, error, open } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h4>Cast and crew</h4>
            {loading ? (
                <Box m={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                error.message
            ) : (
                <SectionsList
                    columns={columns}
                    rows={characters}
                    onRowClick={() => undefined}
                    deleteClick={props.deleteClick}
                    editClick={props.editClick}
                />
            )}
            {open && (
                <AddSectionEntry
                    open={open}
                    setOpen={props.setOpen}
                    character={props.character}
                    setCharacter={props.setCharacter}
                    refetch={props.refetch}
                    section={{ type: 'CAST' }}
                />
            )}
        </div>
    );
};

export default CharactersComponent;
