import React from 'react';
import PropTypes from 'prop-types';
import DBBucket from './DBBucket';
import './DBContent.scss';

const DBContent = (props) => {
    const { dbName } = props;
    return (
        <div className="db-content">
            <DBBucket keys={[]} dbName={dbName} key={dbName}/>
        </div>
    )
}

DBContent.propTypes = {
    dbName: PropTypes.string,
}

export default DBContent;
