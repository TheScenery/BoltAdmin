import React from 'react';
import PropTypes from 'prop-types';
import './DBDetail.scss';
import DBContent from './DBContent';

const DBDetail = (props) => {
    const { dbName } = props;
    return (
        <div className="db-detail-container">
            <div className="db-header">
                {dbName}
            </div>
            <div className="db-content-container">
                <DBContent dbName={dbName} />
            </div>
        </div>
    )
}

DBDetail.propTypes = {
    dbName: PropTypes.string,
}

export default DBDetail;
