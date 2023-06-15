import React from "react";

export default function LabelEntry({ label, handleLabelChange, labelList}) {
    

    return (
        <div>
            <h3>Label Selector</h3>
            <select onChange={handleLabelChange} value={label}>
                {labelList.map((elt) => {
                    return <option key={elt.id}>{elt.name}</option>
                })}
            </select>
        </div>
    );

}