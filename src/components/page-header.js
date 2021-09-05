import React from 'react';
import { Button } from '@material-ui/core';
import styles from './page-header.module.scss';

const PageHeader = (props) => {
    const { pageData } = props;
    return (
        <div className={styles.headerContainer}>
            <div>
                <h2>{pageData.title}</h2>
            </div>
            {pageData.onAction &&
                <div>
                    <Button color='primary' variant="outlined" size="small" onClick={pageData.onAction}>{pageData.actionName}</Button>
                </div>}
        </div>
    );
};

export default PageHeader;