import React, { useState } from 'react';
const AddCastFormContext = React.createContext();


function AddCastFormProvider(props) {

    const initialState = {
        name: '',
        entityId: '',
        biography: '',
        thumbnail: '',

    };

    const [addCastForm, setAddCastForm] = useState(initialState);

    return (
        <AddCastFormContext.Provider
            value={{
                addCastForm,
                setAddCastForm,
            }}
        >
            {props.children}
        </AddCastFormContext.Provider>
    );
}

function useAddCastFormContext() {
    const addCastFormContext = React.useContext(AddCastFormContext);
    if (!addCastFormContext) {
        throw new Error('useAddCastFormContext must be used within a AddCastFormProvider');
    }
    return addCastFormContext;
}

export { AddCastFormProvider, useAddCastFormContext };
