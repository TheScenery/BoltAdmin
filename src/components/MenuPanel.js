import React, { useState, useEffect } from 'react';
import { Menu, Icon, Spin } from 'antd';
import { getAllDB } from '../request/api.js'
import './MenuPanel.scss';

const MenuPanel = () => {
    const [loaded, updateLoadStatus] = useState(false);
    const [dbs = [], updateAddDBs] = useState([]);

    useEffect(() => {
        if (!loaded) {
            getAllDB().then((result) => {
                console.log(result);
                updateLoadStatus(true);
                updateAddDBs(result && result.data && result.data.dbs);
            });
        }
    });

    return (
        <div className="menu-panel-container">
            <Spin spinning={!loaded}>
                <Menu
                    mode="inline"
                    theme="dark"
                >
                    {dbs.map((db, index) => (
                        <Menu.Item key={index}>
                            <Icon type="cloud-server" />
                            <span>{db}</span>
                        </Menu.Item>
                    ))}
                </Menu>
            </Spin>
        </div>
    );
}


export default MenuPanel;