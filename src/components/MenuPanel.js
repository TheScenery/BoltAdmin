import React, { useState, useEffect } from 'react';
import { Menu, Icon, Spin } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { getAllDB } from '../request/api.js'
import './MenuPanel.scss';

const MenuPanel = (props) => {
    const { dbName, onSelectDB } = props;
    const [loaded, updateLoadStatus] = useState(false);
    const [dbs = [], updateAddDBs] = useState([]);

    useEffect(() => {
        if (!loaded) {
            getAllDB().then((result) => {
                updateLoadStatus(true);
                updateAddDBs(_.get(result, 'data.dbs', []));
            });
        }
    });
    const selectedIndex = dbs.findIndex(db => db === dbName)
    const selectedKeys = [selectedIndex];
    return (
        <div className="menu-panel-container">
            <Spin spinning={!loaded}>
                <Menu
                    mode="inline"
                    theme="dark"
                    onSelect={({ key }) => {
                        if (onSelectDB) {
                            onSelectDB(dbs[key])
                        }
                    }}
                    selectedKeys={selectedKeys}
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
    dbName: PropTypes.string,
    onSelectDB: PropTypes.func,
}

export default MenuPanel;