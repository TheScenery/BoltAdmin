import React, { useState, useEffect } from 'react';
import { Menu, Icon, Spin } from 'antd';
import PropTypes from 'prop-types';
import { getAllDB } from '../request/api.js'
import './MenuPanel.scss';

const MenuPanel = (props) => {
    const { onSelectDB } = props;
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
                    onSelect={({ key }) => {
                        console.log(dbs, key);
                        if (onSelectDB) {
                            onSelectDB(dbs[key])
                        }
                    }}
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

MenuPanel.propTypes = {
    onSelectDB: PropTypes.func,
}

export default MenuPanel;