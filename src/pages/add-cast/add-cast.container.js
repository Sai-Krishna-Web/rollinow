import React, { useState } from 'react';
import AddCastComponent from './add-cast.component';
import { AddCastFormProvider } from '../../contexts/cast-form-context'
import { useMutation } from '@apollo/client';
import { ADD_CAST_URL } from '../../services/mutations';

function AddCast() {
    const [onError, setOnError] = useState(false);
    const [addCast, { data, error, loading }] = useMutation(ADD_CAST_URL, {
        onError: (error) => {
            setOnError(true);
            console.log(error);
        }
    });

    const pageData = {
        title: 'Create Cast'
    }

    const handleSubmit = (vars) => {
        addCast({
            variables: {
                Cast: vars
            },
        })
        if (data) {
            console.log(data);
        }
        if (error) {
            console.log(error);
        }
    };

    return (
        <AddCastFormProvider>
            <AddCastComponent pageData={pageData} handleSubmit={handleSubmit} loading={loading} data={data} error={error} onError={onError} setOnError={setOnError} />
        </AddCastFormProvider>
    );
}

export default AddCast;
