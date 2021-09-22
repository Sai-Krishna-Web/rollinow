import React from 'react';
import SummaryComponent from './summary.component';
import { useAddShowFormContext } from 'contexts';

function Summary(props) {
    const { addShowForm } = useAddShowFormContext();
    return <SummaryComponent addShowForm={addShowForm} {...props} />;
}

export default Summary;
