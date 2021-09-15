import React from 'react';
import { useLazyQuery } from '@apollo/client';
import PickerComponent from './picker.component';
import { sectionType, searchQueryType } from 'utilities/enums';

function Picker(props) {
    const { setPickerId, section, input } = props;
    const [inputValue, setInputValue] = React.useState(input);
    const [options, setOptions] = React.useState([]);
    const [, setOnError] = React.useState(false);
    const gqlQuery = searchQueryType[section.type];
    const getVariables = (value) => {
        let vars = {
            query: value
        };
        if (section.type === sectionType.MOVIE || section.type === sectionType.TV) {
            vars['type'] = section.type;
        }
        return vars;
    };
    const [searchShows, { loading }] = useLazyQuery(gqlQuery, {
        onCompleted: (result) => {
            const { data } = Object.values(result)[0];
            if (data) {
                setOptions(data);
            }
        },
        onError: () => {
            setOnError(true);
        }
    });

    const handleChange = async (event) => {
        setInputValue(event.target.value);
    };

    React.useEffect(() => {
        if (!inputValue) return;
        const vars = getVariables(inputValue);
        searchShows({
            variables: { ...vars }
        });
    }, [inputValue, searchShows]);

    return (
        <PickerComponent
            inputValue={inputValue}
            options={options}
            handleChange={handleChange}
            loading={loading}
            setPickerId={setPickerId}
            type={section.type}
        />
    );
}

export default Picker;
