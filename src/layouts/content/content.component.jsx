import React from 'react';
//import styles from './content.module.scss';
import { Switch, Route } from 'react-router-dom';
import { Home, Shows, Movies, AddShow, Casts, AddCast, Sections, AddSection, SectionDetails } from 'pages';

function ContentComponent() {
    return (
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/shows" exact={true} component={Shows} />
            <Route path="/movies" exact={true} component={Movies} />
            <Route path="/addShow" exact={true} component={AddShow} />
            <Route path="/casts" exact={true} component={Casts} />
            <Route path="/addCast" exact={true} component={AddCast} />
            <Route path="/sections" exact={true} component={Sections} />
            <Route path="/addSection" exact={true} component={AddSection} />
            <Route path="/sectionDetails:id" exact={true} component={SectionDetails} />
        </Switch>
    );
}

export default ContentComponent;
