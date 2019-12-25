import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import ValueEditor from './ValueEditor';

const DBDataTable = (props) => {
    const { data, onChange, onDelete } = props;
    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (text, record) => <ValueEditor value={text} onChange={value => onChange(record.key, 'value', value)} />
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (text, record) => (
                <span>
                    <a href onClick={() => onDelete(record.key)}>Delete</a>
                </span>
            ),
        },
    ]
    return (
        <div>
            <Table columns={columns} dataSource={data} size="small" pagination={false} />
        </div>
    )
}

DBDataTable.propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
}

export default DBDataTable;
