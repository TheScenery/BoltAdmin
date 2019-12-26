import React from 'react';
import PropTypes from 'prop-types';
import './DBDetail.scss';
import DBContent from './DBContent';
import logo from '../asserts/boltAdmin.png'

const DBDetail = (props) => {
    const { dbName } = props;
    if (!dbName) {
        return (
            <div className="db-detail-empty-container">
                <img src={logo} alt="logo"/>
            </div>
        );
    }
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
