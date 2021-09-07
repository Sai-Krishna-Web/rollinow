import React, { useState } from 'react';
const AddSectionFormContext = React.createContext();

function AddSectionFormProvider(props) {
    const initialState = {
        title: '',
        description: '',
        type: '',
        sequence: null,
        place: '',
        shown: false,
        startTime: '',
        endTime: '',
        remark: ''
    };

    const [addSectionForm, setAddSectionForm] = useState(initialState);

    return (
        <AddSectionFormContext.Provider
            value={{
                addSectionForm,
                setAddSectionForm
            }}
        >
            {props.children}
        </AddSectionFormContext.Provider>
    );
}

function useAddSectionFormContext() {
    const addSectionFormContext = React.useContext(AddSectionFormContext);
    if (!addSectionFormContext) {
        throw new Error('useAddSectionFormContext must be used within a AddSectionFormProvider');
    }
    return addSectionFormContext;
}

export { AddSectionFormProvider, useAddSectionFormContext };
