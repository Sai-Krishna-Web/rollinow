import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import LanguagesComponent from './languages.component';
import { searchLanguageListGQL } from 'services/queries';
import Avatar from '@material-ui/core/Avatar';

function Languages() {
    const [searchValue, setSearchValue] = React.useState('');
    const { data, loading, error, refetch } = useQuery(searchLanguageListGQL, {
        variables: {
            query: searchValue
        }
    });
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState('');
    const [onError, setOnError] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const pageData = {
        title: 'Languages',
        onSearch: true,
        searchValue: searchValue,
        setSearchValue: setSearchValue
    };

    const imageComponet = (value) => <Avatar alt="Language" className="circular--portrait" src={value}></Avatar>;
    const columns = [
        {
            id: 'image',
            label: '',
            minWidth: 40,
            width: 50,
            format: imageComponet
        },
        { id: 'language', label: 'Language', minWidth: 150 }
    ];

    const editClick = (id) => {
        const row = data?.searchLanguages.data.find((row) => {
            return row.language === id;
        });
        const { language, image } = row;
        setLanguage({ language, image });
        setOpen(true);
    };

    return (
        <LanguagesComponent
            pageData={pageData}
            data={data}
            loading={loading}
            error={error}
            refetch={refetch}
            columns={columns}
            open={open}
            setOpen={setOpen}
            onError={onError}
            onSuccess={onSuccess}
            message={message}
            setOnError={setOnError}
            setOnSuccess={setOnSuccess}
            setMessage={setMessage}
            editClick={editClick}
            language={language}
            setLanguage={setLanguage}
        />
    );
}

export default Languages;
