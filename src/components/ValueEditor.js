import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ValueEditor.scss';

const ValueEditor = (props) => {
    const { value, onChange } = props;
    const [isEditing, updateEditingStatus] = useState(false);
    const [editingValue, onValueChange] = useState(value);

    return (
        <div className="value-editor-container">
            {!isEditing ?
                <div className="value-presenter" onDoubleClick={() => updateEditingStatus(true)}>
                    {editingValue}
                </div> :
                <input className="value-input" value={editingValue} autoFocus={true}
                    onChange={event => onValueChange(event.target.value)} onBlur={() => {
                        updateEditingStatus(false);
                        if (editingValue !== value) {
                            onChange(editingValue);
                        }
                    }} />}
        </div>
    )
}

ValueEditor.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default ValueEditor;
