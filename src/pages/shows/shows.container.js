import React from 'react';
import ShowsComponent from './shows.component';
import { setRoute } from '../../utilities';


function Shows() {

    const AddShow = () => {
        setRoute('/addShow');
    }
    const pageData = {
        title: 'Shows',
        actionName: 'Add show',
        onAction: AddShow
    }
    return <ShowsComponent pageData={pageData} />;
}

export default Shows;
