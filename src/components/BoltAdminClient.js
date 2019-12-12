import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './BoltAdminClient.scss';
import MenuPanel from './MenuPanel';
import DBDetail from './DBDetail';

const BoltAdminClient = () => {
    const history = useHistory();
    const location = useLocation();
    const pathName = location.pathname;
    const dbName = pathName.substr(1);
    return (
        <div className="boltadmin-client-container">
            <MenuPanel dbName={dbName} onSelectDB={(db) => history.push(`/${db}`)} />
            <DBDetail dbName={dbName} />
        </div>
    )
}

export default BoltAdminClient;