import React from 'react';
import SummaryComponent from './summary.component';
import { useAddShowFormContext } from 'contexts';

function Summary() {
    const { addShowForm } = useAddShowFormContext();
    return <SummaryComponent addShowForm={addShowForm} />;
}

export default Summary;
