import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import GenresComponent from './genres.component';
import { UPDATE_GENRES_URL } from 'services/mutations';
import { getGenresListGQL } from 'services/queries';

function Genres(props) {
    const { showGenres, id } = props;
    const [genres, setGenres] = useState([]);
    const [genresSource, setGenresSource] = useState([]);
    const { data } = useQuery(getGenresListGQL);
    const [updateGenres] = useMutation(UPDATE_GENRES_URL);

    const handleGenre = async (values, action) => {
        let genre;
        let remove = false;
        if (action === 'remove-option') {
            genre = genres.filter((x) => values.indexOf(x) === -1).toString();
            remove = true;
        } else {
            genre = values.slice(-1).toString();
        }
        await updateGenres({
            variables: {
                remove,
                showId: id,
                genre: genre
            }
        });

        setGenres(values);
    };

    useEffect(() => {
        const genresList = showGenres.map((item) => item.genre);
        setGenres(genresList);
    }, []);

    useEffect(() => {
        data && setGenresSource(data.getGenresList.map((item) => item.genre));
    }, [data]);

    return <GenresComponent genres={genres} handleGenre={handleGenre} genresSource={genresSource} />;
}

export default Genres;
