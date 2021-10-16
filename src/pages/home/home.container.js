import React from 'react';
import { useQuery } from '@apollo/client';
import HomeComponent from './home.component';
import { userContext } from '../../contexts/auth';
import { topPlatformsGQL, topLanguagesGQL, topGenresGQL } from 'services/queries';

function Home() {
    const user = userContext();
    const { data: topPlatforms, loading: topPlatformsLoading, error: topPlatformsError } = useQuery(topPlatformsGQL);
    const { data: topLanguages, loading: topLanguagesLoading, error: topLanguagesError } = useQuery(topLanguagesGQL);
    const { data: topGenres, loading: topGenresLoading, error: topGenresError } = useQuery(topGenresGQL);

    return (
        <HomeComponent
            user={user}
            topPlatforms={topPlatforms}
            topPlatformsError={topPlatformsError}
            topPlatformsLoading={topPlatformsLoading}
            topLanguages={topLanguages}
            topLanguagesError={topLanguagesError}
            topLanguagesLoading={topLanguagesLoading}
            topGenres={topGenres}
            topGenresError={topGenresError}
            topGenresLoading={topGenresLoading}
        />
    );
}

export default Home;
