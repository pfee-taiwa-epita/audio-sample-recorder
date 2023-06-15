import React from "react";

export default function ButtonRecord({handleStartRecording, handleStopRecording, isRecording, addRecords, nbSample}){
    const [index, setIndex] = React.useState(0);


    let mediaRecorder = null;
    let audioChunks = [];
    let fullAudioChunks = [];

    const recordAudio = async () => {
        handleStartRecording();

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
    
        mediaRecorder.addEventListener('dataavailable', (event) => {
            audioChunks.push(event.data);
        });
    
        mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const newRecording = URL.createObjectURL(audioBlob);
            fullAudioChunks.push(newRecording)
            audioChunks = [];
        });
    
        await new Promise((resolve) => {
            setTimeout(() => {
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
                mediaRecorder.stream.getTracks().forEach((track) => track.stop());
                mediaRecorder = null;
            }
            resolve();
        }, 2000);
        });
    }; 

    const multipleRecordAudio = async () => {
        handleStartRecording();
        for (let i = 0; i < nbSample; i++) {
            setIndex(i+1);
            await recordAudio();
        }

        await new Promise((resolve) => {
            setTimeout(() => {
                handleStopRecording();
                addRecords(fullAudioChunks);
                fullAudioChunks = [];
                setIndex(0);
            resolve();
        }, 1000);
        });
    }

    return (
        <div>
            <button onClick={multipleRecordAudio} disabled={isRecording}>Start Recording</button>
            {isRecording ? (
                <div>{index} / {nbSample}</div>
            ) : null}
        </div>
    );
}