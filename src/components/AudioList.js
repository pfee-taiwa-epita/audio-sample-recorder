import React from "react";

export default function AudioList({ records, label, deleteRecord }) {

    return (
        <div>
            Audio List for {label}
            <ul>
                {records.filter(row => row.tree_label === label).map((elt) => { 
                 return (
                    <li key={elt.id}>
                        {elt.file_name} 
                        <audio controls src={elt.audioUrl}/>
                        <button onClick={() => deleteRecord(elt.id)}>X</button>
                    </li>
                 )
                })}
            </ul>
        </div>
    )
}