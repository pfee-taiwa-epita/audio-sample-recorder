import React from "react";

import { Select } from 'antd';



export default function LabelEntry({ label, handleLabelChange, labelList}) {
    return (
        <div>
            <Select className="selectLabel" onChange={handleLabelChange} value={label}  >
                {labelList.map((elt, index) => {
                    return <Select.Option key={elt.id} value={elt.name}>{elt.name}</Select.Option>
                })}
            </Select>
        </div>
    );

}