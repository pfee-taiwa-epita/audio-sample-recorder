import React from "react";

export default function NbSample({nbSample, handleUpdateNbSample}){
    return (
        <div>
            Number of Sample
            <input type="number" min="1" max="20" step="1" value={nbSample} onChange={handleUpdateNbSample}/>
        </div>
    )
}