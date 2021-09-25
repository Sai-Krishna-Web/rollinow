import React from 'react';
import { Button, OutlinedInput, InputAdornment, Box, Typography } from '@material-ui/core';
import styles from './page-header.module.scss';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
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
    }
}));

const PageHeader = (props) => {
    const { pageData } = props;
    const classes = useStyles();

    return (
        <div className={styles.headerContainer}>
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
            </Box>
        </div>
    );
};

export default PageHeader;
