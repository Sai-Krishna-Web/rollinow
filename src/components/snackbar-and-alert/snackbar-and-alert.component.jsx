import React from 'react';
import { Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import style from './snackbar-and-alert.module.scss';

function SnackBarAndAlertComponent(props) {
    const { open, onClose, type, orangeColor } = props;

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
        >
            <Alert variant="filled" severity={type} className={orangeColor && style.alertMessage}>
                {props.children}{' '}
            </Alert>
        </Snackbar>
    );
}

SnackBarAndAlertComponent.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    message: PropTypes.string
};

export default SnackBarAndAlertComponent;
