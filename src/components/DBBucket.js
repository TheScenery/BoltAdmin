import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Collapse } from 'antd';
import { getKeys } from '../request/api.js';
import DBDataTable from './DBDataTable.js';

const { Panel } = Collapse;

const updateValue = (dbName, parentKeys, key, value) => {
    console.log('setKeys', dbName, [...parentKeys, key].join('.'), value)
}

const DBBucket = (props) => {
    const { keys, dbName } = props;
    const [buckets, setBuckets] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (dbName) {
            getKeys(dbName, keys).then((result) => {
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
        // eslint-disable-next-line
    }, [dbName])

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
                    <DBDataTable data={data} onChange={(rowKey, colKey, value) => updateValue(dbName, keys, rowKey, value)} />
                </div>
            )
            }
        </div>
    )
}

DBBucket.propTypes = {
    keys: PropTypes.array,
    dbName: PropTypes.string,
}

export default DBBucket;
