import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';

function PickerComponent(props) {
    const { handleChange, loading, options, setPickerId, type, inputValue } = props;
    return (
        <div>
            <Autocomplete
                id="showId"
                style={{ width: 300 }}
                getOptionLabel={(option) =>
                    typeof option === 'string'
                        ? option
                        : option?.title || option?.name || option?.genre || option?.language || option?.source
                }
                getOptionSelected={(option, value) =>
                    option?.title === value ||
                    option?.name === value ||
                    option?.genre === value ||
                    option?.language === value ||
                    option?.source === value
                }
                options={options}
                autoComplete
                loading={loading}
                value={inputValue}
                onChange={(event, newValue) => {
                    setPickerId('entryId', newValue?.id || newValue?.genre || newValue?.language || newValue?.source);
                    handleChange(
                        newValue?.title || newValue?.name || newValue?.genre || newValue?.language || newValue?.source
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={type}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
                renderOption={(option) => {
                    return (
                        <Grid container alignItems="center">
                            <Grid item xs>
                                {option?.title || option?.name || option?.genre || option?.language || option?.source}
                            </Grid>
                        </Grid>
                    );
                }}
            />
        </div>
    );
}

export default PickerComponent;
