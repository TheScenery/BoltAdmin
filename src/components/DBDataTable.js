import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const DBDataTable = (props) => {
    const { data } = props;
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
        },
    ]
    return <Table columns={columns} dataSource={data} />

}

DBDataTable.propTypes = {
    data: PropTypes.array,
}

export default DBDataTable;
