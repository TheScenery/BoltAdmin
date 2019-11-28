import React from 'react';
import { Menu, Icon } from 'antd';
import './MenuPanel.scss';

const { SubMenu } = Menu;

const MenuPanel = () => {
    return (
        <div className="menu-panel-container">
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
            >
                <Menu.Item key="1">
                    <Icon type="cloud-server" />
                    <span>Bolt 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="cloud-server" />
                    <span>Bolt 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="cloud-server" />
                    <span>Bolt 3</span>
                </Menu.Item>
            </Menu>
        </div>
    );
}


export default MenuPanel;