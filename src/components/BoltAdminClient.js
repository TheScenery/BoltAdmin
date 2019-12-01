import React, { useState } from 'react';
import './BoltAdminClient.scss';
import MenuPanel from './MenuPanel';
import DBDetail from './DBDetail';

const BoltAdminClient = () => {
    const [selectedDB, selectDB] = useState('');
    return (
        <div className="boltadmin-client-container">
            <MenuPanel onSelectDB={selectDB} />
            <DBDetail dbName={selectedDB} />
        </div>
    )
}

export default BoltAdminClient;