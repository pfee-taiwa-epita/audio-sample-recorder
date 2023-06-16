import React from "react";

import { Input } from 'antd';

export default function NbSample({nbSample, handleUpdateNbSample}){
    return (
        <div className="containerSample">
            <div className="textSample"> Sample </div>
            <Input className="inputSample" size="small" type="number" min="1" max="99" step="1" value={nbSample} onChange={handleUpdateNbSample} />
        </div>
    )
}