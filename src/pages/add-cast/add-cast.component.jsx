import React from "react";
import { PageHeader, LoadingScreen } from '../../components';
import { Button, makeStyles } from '@material-ui/core';
import { useAddCastFormContext } from '../../contexts/cast-form-context';
import SnackBarAndAlert from '../../components/snackbar-and-alert/snackbar-and-alert.container';
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    button: {
        marginRight: theme.spacing(2)
    },
    completed: {
        display: "inline-block"
    },
    container: {
        marginBottom: "50px",
    }

}));

const AddCastComponent = (props) => {
    const classes = useStyles();
    const { pageData, handleSubmit, loading, data, error } = props;
    const { addCastForm } = useAddCastFormContext();

    console.log(data, error);
    return (
        <>
            <div style={{ margin: "auto" }}>
                <PageHeader pageData={pageData} />
                <div style={{ minHeight: '600px', textAlign: 'center', padding: '20px' }}>
                    <div className={classes.container}>
                        <h1>form here</h1>
                    </div>
                    <div>
                        <Button
                            onClick={() => console.log("cancel")}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Cancel
                    </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={() => handleSubmit(addCastForm)}
                        >
                            Submit
                     </Button>
                    </div>
                </div>
                <LoadingScreen open={loading}></LoadingScreen>
            </div>
            {data && (
                <SnackBarAndAlert
                    open={Boolean(data)}
                    onClose={() => {
                        console.log("closed")
                    }}
                    type="success"
                >
                    Cast added successfully.
                </SnackBarAndAlert>
            )}
            {props.onError && (
                <SnackBarAndAlert
                    open={Boolean(error)}
                    onClose={() => {
                        props.setOnError(false);
                    }}
                    type="error"
                >
                    {`Failed:  ${error?.message}`}
                </SnackBarAndAlert>
            )}
        </>
    );
};

export default AddCastComponent;
