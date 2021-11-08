import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import RequestsComponent from './requests.component';
import { getRequestsListGQL } from 'services/queries';
import { formatDateTimeByFormatString } from 'utilities/helper';
import { setRoute } from 'utilities';
import { entityTypePath } from 'utilities/enums';

function Requests(props) {
    const { location } = props;
    const requestType = location.pathname === '/missingRequests' ? 'DATA_MISSING' : 'CONTENT_REQUEST';
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [statusType, setStatusType] = useState('All');
    const { data, loading, error, refetch } = useQuery(getRequestsListGQL, {
        variables: { date: date, requestType: requestType, resolved: statusType === 'All' ? null : statusType }
    });

    const editClick = (id) => {
        const request = data?.allRequests.data.find((row) => {
            return row.id === id;
        });
        const type = requestType === 'DATA_MISSING' ? 'edit' : 'add';
        const entityId = request.showId || request.castId;
        const entityPath = entityTypePath[request.entity];
        requestType === 'DATA_MISSING'
            ? setRoute(`/${entityPath}/${type}/${entityId}`)
            : setRoute(`/${entityPath}/${type}`);
    };
    const pageData = {
        title: requestType === 'DATA_MISSING' ? 'Missing Requests' : 'New Requests',
        date: date,
        statusType: statusType,
        setDate: setDate,
        setStatusType: setStatusType
    };

    const columns = [
        {
            id: 'title',
            label: 'Title',
            minWidth: 100
        },
        { id: 'entity', label: 'Entity', minWidth: 100 },
        requestType === 'DATA_MISSING' && {
            id: 'fields',
            label: 'Fields',
            minWidth: 180,
            format: (value) => value.join(', ')
        },
        {
            id: 'createdAt',
            label: 'Created At',
            minWidth: 100,
            format: (value) => value && formatDateTimeByFormatString(value, 'YYYY-MM-DD', false, true)
        }
    ];

    return (
        <RequestsComponent
            pageData={pageData}
            data={data}
            loading={loading}
            error={error}
            refetch={refetch}
            columns={columns}
            editClick={editClick}
        />
    );
}

export default Requests;
