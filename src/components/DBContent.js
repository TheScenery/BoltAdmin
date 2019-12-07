import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Tree } from 'antd';
import './DBContent.scss';
import { getKeys } from '../request/api.js';

const { TreeNode } = Tree;

const onLoadData = (treeNode, treeData, updateTreeData) =>
    new Promise(resolve => {
        if (treeNode.props.children) {
            resolve();
            return;
        }
        setTimeout(() => {
            treeNode.props.dataRef.children = [
                { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
                { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
            ];
            updateTreeData([...treeData])
            resolve();
        }, 1000);
    });


const renderTreeNodes = data =>
    data.map(item => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode key={item.key} {...item} dataRef={item} />;
    });

const DBContent = (props) => {
    const { dbName } = props;
    const [treeData, updateTreeData] = useState([]);
    const [loaded, loadedData] = useState(false);
    useEffect(() => {
        if (!loaded && dbName) {
            getKeys(dbName, []).then((result) => {
                const dbData = _.get(result, 'data.result');
                updateTreeData(dbData.map((d, index) => ({ title: d.key, key: index, isLeaf: !d.isBucket })))
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                loadedData(true);
            })
        }
    })
    return (
        <div className="db-content">
            <Tree loadData={(treeNode) => onLoadData(treeNode, treeData, updateTreeData)}>
                {renderTreeNodes(treeData)}
            </Tree>
        </div>
    )
}

DBContent.propTypes = {
    dbName: PropTypes.string,
}

export default DBContent;
