import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Tree } from 'antd';
import './DBContent.scss';
import { getKeys } from '../request/api.js';

const { TreeNode } = Tree;

const onLoadData = (treeNode, treeData, dbName, updateTreeData) =>
    new Promise(resolve => {
        if (treeNode.props.children) {
            resolve();
            return;
        }
        const parentPath = _.get(treeNode, 'props.dataRef.path', []);
        getKeys(dbName, parentPath).then((result) => {
            const dbData = _.get(result, 'data.result');
            const children = dbData.map((d) => {
                const path = [...parentPath, d.key];
                return { title: d.key, key: path.join(String.fromCharCode(0)), isLeaf: !d.isBucket, path, value: d.value };
            });
            treeNode.props.dataRef.children = children;
            updateTreeData([...treeData])
            resolve();
        }).catch((error) => {
            console.log(error);
        })
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
        return <TreeNode key={item.key} {...item} title={`${item.key}${item.value ? ':' + item.value: ''}`} dataRef={item} />;
    });

const DBContent = (props) => {
    const { dbName } = props;
    const [treeData, updateTreeData] = useState([]);
    const [loaded, loadedData] = useState(false);
    useEffect(() => {
        if (!loaded && dbName) {
            getKeys(dbName, []).then((result) => {
                const dbData = _.get(result, 'data.result');
                updateTreeData(dbData.map((d) => {
                    const path = [d.key];
                    return { title: d.key, key: path.join(String.fromCharCode(0)), isLeaf: !d.isBucket, path, value: d.value };
                }))
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                loadedData(true);
            })
        }
    })
    return (
        <div className="db-content">
            <Tree loadData={(treeNode) => onLoadData(treeNode, treeData, dbName, updateTreeData)}>
                {renderTreeNodes(treeData)}
            </Tree>
        </div>
    )
}

DBContent.propTypes = {
    dbName: PropTypes.string,
}

export default DBContent;
