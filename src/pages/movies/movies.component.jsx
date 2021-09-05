import React from 'react';
import { PageHeader } from 'components'

const MoviesComponent = (props) => {
    const { pageData } = props;
    return (
        <div style={{ margin: 'auto' }}>
            <PageHeader pageData={pageData} />
            <div style={{ height: '600px', textAlign: 'center' }}>
                <h4>Movies goes here</h4>
            </div>
        </div>
    );
};

export default MoviesComponent;