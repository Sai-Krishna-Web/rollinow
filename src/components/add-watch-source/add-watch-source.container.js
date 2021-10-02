import React, { useState } from 'react';
import AddWatchSourceComponent from './add-watch-source.component';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_WATCH_SOURCE_URL, UPDATE_WATCH_SOURCE_URL } from 'services/mutations';
import { getPlatformsListGQL } from 'services/queries';

function AddWatchSource(props) {
    const state = {
        type: '',
        link: '',
        source: '',
        price: '',
        quality: ''
    };
    const { data: sourcesData } = useQuery(getPlatformsListGQL);

    const { showId, open, setOpen, watchSourceData, setOnSuccess, setOnError, setMessage, refetch } = props;
    const URL = watchSourceData ? UPDATE_WATCH_SOURCE_URL : ADD_WATCH_SOURCE_URL;
    const [initialState, setState] = useState(watchSourceData ? watchSourceData : state);
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [sources, setSources] = useState([]);

    React.useEffect(() => {
        sourcesData && setSources(sourcesData.getPlatformsList);
    }, [sourcesData]);

    const [addWatchSource, { loading }] = useMutation(URL, {
        onCompleted: (data) => {
            if (data?.updateWatch) {
                setMessage('Watch Source updated successfully');
            }
            if (data?.addWatch) {
                setMessage('Watch Source added successfully');
            }
            setOpen(false);
            setOnSuccess(true);
            refetch();
        },
        onError: (error) => {
            setOnError(true);
            setMessage(error.message);
        }
    });

    const handleAddWatchSource = (id, value) => {
        setState({ ...initialState, [id]: value });
    };

    const validate = (values) => {
        let errors = {};

        if (!initialState.source) {
            errors.source = 'Source is required';
        }
        if (initialState.source && values.link && values.type) {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }

        if (!values.link) {
            errors.link = 'Link is required';
        }
        if (!values.type) {
            errors.type = 'Please select a type';
        }

        return errors;
    };

    const handleSubmit = () => {
        const { type, link, source, price, quality } = initialState;
        let vars = {
            showId,
            watch: { type, link, source, price, quality }
        };
        if (watchSourceData) vars['id'] = watchSourceData.id;
        addWatchSource({
            variables: vars
        });
    };
    return (
        <AddWatchSourceComponent
            open={open}
            handleClose={() => setOpen(false)}
            handleAddWatchSource={handleAddWatchSource}
            handleSubmit={handleSubmit}
            initialState={initialState}
            enableSubmit={enableSubmit}
            validate={validate}
            loading={loading}
            sources={sources}
        />
    );
}

export default AddWatchSource;
