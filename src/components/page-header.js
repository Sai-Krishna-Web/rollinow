import React from 'react';
import { Button } from '@material-ui/core';
import styles from './page-header.module.scss';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

const PageHeader = (props) => {
    const { pageData } = props;
    return (
        <div className={styles.headerContainer}>
            <div>
                <h2>{pageData.title}</h2>
            </div>
            {pageData.onAction && (
                <div>
                    <Button
                        startIcon={<AddOutlinedIcon />}
                        color="primary"
                        variant="outlined"
                        onClick={pageData.onAction}
                    >
                        {pageData.actionName}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PageHeader;
