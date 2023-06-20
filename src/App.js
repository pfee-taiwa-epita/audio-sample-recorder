import React from "react";

import SelectEntry from "./components/SelectLabel";
import ButtonRecord from "./components/ButtonRecord";
import AudioList from "./components/AudioList";
import NbSample from "./components/NbSample";

function App() {
  const [label, setLabel] = React.useState("Sapin");
  const [isRecording, setIsRecording] = React.useState(false);
  const [records, setRecords] = React.useState([]);
  const [nbSample, setNbSample] = React.useState(3);

  const [labelList, setLabelList] = React.useState([
    { id: 1, name: "Sapin", index: 0 },
    { id: 2, name: "Chene", index: 0 },
    { id: 3, name: "Bouleau", index: 0 },
]);


  const handleLabelChange = (value) => {
    setLabel(value);
    console.log("[APP.js] handleLabelChange -> label changed");
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    console.log("[APP.js] handleStartRecording -> start recording");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    console.log("[APP.js] handleStopRecording-> stop recording");
  };

  const updateLabelList = (label) => {
    const labelListCopy = [...labelList];
    const index = labelListCopy.findIndex((elt) => elt.name === label);
    labelListCopy[index].index += 1;
    setLabelList(labelListCopy);
  };

  const addRecords = async (audioList) => {
    console.log("[APP.js] addRecords -> new records")
    
    const recordsCopy = [...records];

    audioList.forEach((audioUrl) => {
      const tree_label = label;
      const file_name = label.toLowerCase() + "_" + labelList.find((elt) => elt.name === label).index;
      const id = new Date().getTime() * Math.random();
      const newRecord = {
        id, file_name, tree_label, audioUrl
      }
      recordsCopy.push(newRecord);
      updateLabelList(label);
    });

    setRecords(recordsCopy);
  };

  const deleteRecord = (id) => {
    console.log("[APP.js] deleteRecord -> delete record with id: " + id);
    const recordsCopy = [...records];

    const recordsCopyUpdated = recordsCopy.filter((row) => row.id !== id);
    setRecords(recordsCopyUpdated);
  };

  const printRecordList = () => {
      console.log(records)
      console.log(label)

      console.log(records.filter(row => row.tree_label === label))
  }




  return ( 
    <div className="appContainer">
      <h1 className="mainTitle">Audio Recorder</h1>
      
      <div className="rowContainer">
        <SelectEntry label={label} handleLabelChange={handleLabelChange} labelList={labelList} />
        <NbSample nbSample={nbSample} handleUpdateNbSample={(e) => setNbSample(e.target.value)} />
        <ButtonRecord handleStartRecording={handleStartRecording} handleStopRecording={handleStopRecording} isRecording={isRecording} addRecords={addRecords} nbSample={nbSample} />
      </div>
      
      <AudioList records={records} label={label} deleteRecord={deleteRecord} />
    </div>
  );
}
export default App;
