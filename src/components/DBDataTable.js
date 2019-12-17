import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import ValueEditor from './ValueEditor';

const DBDataTable = (props) => {
    const { data, onChange } = props;
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
    ]
    return <Table columns={columns} dataSource={data} size="small" pagination={false} />

}

DBDataTable.propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
}

export default DBDataTable;
