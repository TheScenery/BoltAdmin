import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Collapse } from 'antd';
import './DBContent.scss';
import { getKeys } from '../request/api.js';

const { Panel } = Collapse;

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
            <Collapse
                expandIconPosition='left'
            >
                {treeData.map((data) => {
                    return (
                        <Panel header={data.title} key={data.key}>
                            <div>hahaha</div>
                        </Panel>
                    )
                })}
            </Collapse>
        </div>
    )
}

DBContent.propTypes = {
    dbName: PropTypes.string,
}

export default DBContent;
