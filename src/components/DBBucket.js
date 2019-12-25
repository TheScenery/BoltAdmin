import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Collapse, Button, Modal, Input } from 'antd';
import { getKey, setKey, deleteKey } from '../request/api.js';
import DBDataTable from './DBDataTable.js';

const { Panel } = Collapse;

const updateValue = (dbName, parentKeys, key, value) => {
    setKey(dbName, [...parentKeys, key], value).then((result) => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    })
}

const deleteValue = (dbName, parentKeys, key) => {
    deleteKey(dbName, [...parentKeys, key]).then((result) => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    })
}

const loadKey = (dbName, keys, setBuckets, setData) => {
    getKey(dbName, keys).then((result) => {
        const dbData = _.get(result, 'data.result');
        const buckets = [];
        const data = [];
        dbData.forEach((d) => {
            if (d.isBucket) {
                buckets.push(d);
            } else {
                data.push(d);
            }
        });
        setBuckets(buckets);
        setData(data);
    }).catch((error) => {
        console.log(error);
    })
}

const DBBucket = (props) => {
    const { keys, dbName } = props;
    const [buckets, setBuckets] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (dbName) {
            loadKey(dbName, keys, setBuckets, setData);
        }
        // eslint-disable-next-line
    }, [dbName])

    const [addRowVisible, setAddEditorVisible] = useState(false);
    const [key, onKeyChange] = useState('');
    const [value, onValueChange] = useState('');
    const [addBucketVisible, setBucketEditorVisible] = useState(false);
    const [bucketName, onBucketNameChange] = useState('');

    return (
        <div className='bucket-container'>
            {buckets.length > 0 && <Collapse>
                {buckets.map((bucket) => {
                    return (
                        <Panel header={bucket.key} key={bucket.key}>
                            <DBBucket keys={[...keys, bucket.key]} dbName={dbName} />
                        </Panel>
                    )
                })}
            </Collapse>}
            {data.length > 0 && (
                <div className='bucket-data-container'>
                    <DBDataTable data={data} onChange={(rowKey, colKey, value) => updateValue(dbName, keys, rowKey, value)}
                        onDelete={(key) => {
                            deleteValue(dbName, keys, key);
                            loadKey(dbName, keys, setBuckets, setData);
                        }} />
                </div>
            )}
            <Button onClick={() => setBucketEditorVisible(true)} type="primary" style={{ marginTop: 16, marginLeft: 16 }}>
                Create Bucket
            </Button>
            {keys.length > 0 && <Button onClick={() => setAddEditorVisible(true)} type="primary" style={{ marginTop: 16, marginLeft: 16 }}>
                Add a row
            </Button>}
            <Modal
                title="New Row Editor"
                visible={addRowVisible}
                onOk={() => {
                    setAddEditorVisible(false);
                    updateValue(dbName, keys, key, value);
                    loadKey(dbName, keys, setBuckets, setData);
                    onKeyChange('');
                    onValueChange('');
                }}
                onCancel={() => setAddEditorVisible(false)}
            >
                <div style={{ marginBottom: 16 }}>
                    <Input placeholder="Key" value={key} onChange={({ target }) => onKeyChange(target.value)} />
                </div>
                <div>
                    <Input placeholder="Value" value={value} onChange={({ target }) => onValueChange(target.value)} />
                </div>
            </Modal>
            <Modal
                title="New Bucket Editor"
                visible={addBucketVisible}
                onOk={() => {
                    setBucketEditorVisible(false);
                    onBucketNameChange('');
                }}
                onCancel={() => setBucketEditorVisible(false)}
            >
                <div style={{ marginBottom: 16 }}>
                    <Input placeholder="BucketName" value={bucketName} onChange={({ target }) => onBucketNameChange(target.value)} />
                </div>
            </Modal>
        </div>
    )
}

DBBucket.propTypes = {
    keys: PropTypes.array,
    dbName: PropTypes.string,
}

export default DBBucket;
