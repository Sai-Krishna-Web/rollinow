import React from 'react';
import CastsComponent from './casts.component';
import { setRoute } from '../../utilities';

function Casts() {
    const AddCast = () => {
        setRoute('/addCast')
    }
    const pageData = {
        title: 'Casts',
        actionName: 'Add Cast',
        onAction: AddCast
    }
    return <CastsComponent pageData={pageData} />;
}

export default Casts;
