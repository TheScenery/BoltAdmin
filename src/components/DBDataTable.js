import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, Input } from 'antd';
import ValueEditor from './ValueEditor';

const DBDataTable = (props) => {
    const { data, onChange, onAdd } = props;
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
    const [addRowVisible, setAddEditorVisible] = useState(false);
    const [key, onKeyChange] = useState('');
    const [value, onValueChange] = useState('');
    return (
        <div>
            <Table columns={columns} dataSource={data} size="small" pagination={false} />
            <Button onClick={() => setAddEditorVisible(true)} type="primary" style={{ marginTop: 16 }}>
                Add a row
            </Button>
            <Modal
                title="New Row Editor"
                visible={addRowVisible}
                onOk={() => {
                    setAddEditorVisible(false);
                    onAdd(key, value);
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
        </div>
    )
}

DBDataTable.propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    onAdd: PropTypes.func,
}

export default DBDataTable;
