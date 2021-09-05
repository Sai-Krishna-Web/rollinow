import React from 'react';
import { PageHeader } from 'components'

const ShowsComponent = (props) => {
    const { pageData } = props;
    return (
        <div style={{ margin: 'auto' }}>
            <PageHeader pageData={pageData} />
            <div style={{ height: '600px', textAlign: 'center' }}>
                <h4>shows goes here</h4>
            </div>
        </div>
    );
};

export default ShowsComponent;