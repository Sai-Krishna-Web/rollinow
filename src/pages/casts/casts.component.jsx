import React from "react";
import { PageHeader } from '../../components'

const CastsComponent = (props) => {
    const { pageData } = props;
    return (
        <div style={{ margin: "auto" }}>
            <PageHeader pageData={pageData} />
            <div style={{ height: '600px', textAlign: 'center' }}>
                <h4>Casts goes here</h4>
            </div>
        </div>
    );
};

export default CastsComponent;