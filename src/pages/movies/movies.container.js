import React from 'react';
import MoviesComponent from './movies.component';
import { setRoute } from '../../utilities';

function Movies() {
    const AddMovie = () => {
        setRoute('/addShow');
    }
    const pageData = {
        title: 'Movies',
        actionName: 'Add Movie',
        onAction: AddMovie
    }
    return <MoviesComponent pageData={pageData} />;
}

export default Movies;
