import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { getLanguageListGQL } from '../services/queries';
const AddShowFormContext = React.createContext();


function AddShowFormProvider(props) {
    const { data } = useQuery(getLanguageListGQL)
    const [languageList, setLanguageList] = useState([]);

    const initialState = {
        title: '',
        entityId: '',
        description: '',
        releaseDate: '',
        keywords: [],
        languageId: '',
        backdropUrl: '',
        thumbnailUrl: '',
        trailerUrl: '',
        duration: '',
        tagline: '',
        isIndianOTT: false,
        inFavorites: false,
        type: '',

    };

    const [addShowForm, setAddShowForm] = useState(initialState);

    useEffect(() => {
        data && setLanguageList(data.getLanguagesList)
    }, [data]);

    return (
        <AddShowFormContext.Provider
            value={{
                addShowForm,
                setAddShowForm,
                languageList,
            }}
        >
            {props.children}
        </AddShowFormContext.Provider>
    );
}

function useAddShowFormContext() {
    const addShowFormContext = React.useContext(AddShowFormContext);
    if (!addShowFormContext) {
        throw new Error('useAddShowFormContext must be used within a AddShowFormProvider');
    }
    return addShowFormContext;
}

export { AddShowFormProvider, useAddShowFormContext };
