import React from 'react';
import { Button, OutlinedInput, InputAdornment, Box, Typography, TextField, MenuItem } from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        padding: '16px'
    },
    searchControl: {
        paddingRight: '8px',
        paddingLeft: '16px'
    },
    startAdornment: {
        fontSize: '1rem',
        color: '#9e9e9e'
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    textField: {
        width: '16ch'
    }
}));

const PageHeader = (props) => {
    const { pageData } = props;
    const classes = useStyles();

    return (
        <div className={classes.headerContainer}>
            <Box>
                <Typography variant="h2">{pageData.title}</Typography>
            </Box>
            <Box className={classes.container}>
                {pageData.onSearch && (
                    <Box mx={2}>
                        <OutlinedInput
                            className={classes.searchControl}
                            id="input-search"
                            value={pageData.searchValue}
                            margin="dense"
                            onChange={(e) => pageData.setSearchValue(e.target.value)}
                            //onKeyDown={({ key }) => key === 'Enter' && console.log(pageData.searchValue)}
                            placeholder="Search..."
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon stroke={1.5} size="1.3rem" className={classes.startAdornment} />
                                </InputAdornment>
                            }
                            aria-describedby="search-helper-text"
                            inputProps={{
                                'aria-label': 'weight'
                            }}
                        />
                    </Box>
                )}
                {pageData.onAction && (
                    <Box>
                        <Button
                            startIcon={<AddOutlinedIcon />}
                            color="primary"
                            variant="outlined"
                            onClick={pageData.onAction}
                        >
                            {pageData.actionName}
                        </Button>
                    </Box>
                )}
                {pageData.date && (
                    <Box>
                        <TextField
                            type="date"
                            label="Date"
                            margin="dense"
                            variant="outlined"
                            name="requestsDate"
                            id="requestsDate"
                            value={pageData.date}
                            onChange={(e) => {
                                pageData.setDate(e.target.value);
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Box>
                )}
                {pageData.setStatusType && (
                    <Box pl={2}>
                        <TextField
                            label="Status Type"
                            margin="dense"
                            variant="outlined"
                            type="text"
                            name="statusType"
                            id="statusType"
                            value={pageData.statusType}
                            onChange={(e) => {
                                pageData.setStatusType(e.target.value);
                            }}
                            className={classes.textField}
                            select
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value={true}>Resolved</MenuItem>
                            <MenuItem value={false}>Unresolved</MenuItem>
                        </TextField>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default PageHeader;
