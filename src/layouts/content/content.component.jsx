import React from 'react';
//import styles from './content.module.scss';
import { Switch, Route } from 'react-router-dom';
import {
    Home,
    Shows,
    Movies,
    AddShow,
    Casts,
    AddCast,
    Sections,
    AddSection,
    SectionDetails,
    ShowDetails,
    Platforms,
    Genres,
    Languages,
    Requests,
    CastDetails,
    Banners
} from 'pages';

function ContentComponent() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movies" exact={true} component={Movies} />
            <Route path="/movies/add" exact={true} component={AddShow} />
            <Route path="/movies/edit/:id" component={AddShow} />
            <Route path="/movies/details/:id" component={ShowDetails} />
            <Route path="/shows" exact={true} component={Shows} />
            <Route path="/shows/add" exact={true} component={AddShow} />
            <Route path="/shows/edit/:id" component={AddShow} />
            <Route path="/shows/details/:id" component={ShowDetails} />
            <Route path="/casts" exact={true} component={Casts} />
            <Route path="/casts/add" exact={true} component={AddCast} />
            <Route path="/casts/edit/:id" component={AddCast} />
            <Route path="/sections" exact={true} component={Sections} />
            <Route path="/sections/add" exact={true} component={AddSection} />
            <Route path="/sections/edit/:id" component={AddSection} />
            <Route path="/sections/details/:id" component={SectionDetails} />
            <Route path="/platforms" exact={true} component={Platforms} />
            <Route path="/genres" exact={true} component={Genres} />
            <Route path="/languages" exact={true} component={Languages} />
            <Route path="/missingRequests" exact={true} component={Requests} />
            <Route path="/newRequests" exact={true} component={Requests} />
            <Route path="/casts/details/:id" component={CastDetails} />
            <Route path="/banners" exact={true} component={Banners} />
        </Switch>
    );
}

export default ContentComponent;
