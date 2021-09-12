import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';

function PickerComponent(props) {
    const { handleChange, loading, options, setPickerId, type } = props;
    return (
        <div>
            <Autocomplete
                id="showId"
                style={{ width: 300 }}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.title || option.name)}
                options={options}
                autoComplete
                loading={loading}
                onChange={(event, newValue) => setPickerId('entryId', newValue?.id)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={type}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={handleChange}
                    />
                )}
                renderOption={(option) => {
                    return (
                        <Grid container alignItems="center">
                            <Grid item xs>
                                {option.title || option.name}
                            </Grid>
                        </Grid>
                    );
                }}
            />
        </div>
    );
}

export default PickerComponent;