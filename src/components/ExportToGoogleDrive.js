import React, { useState } from "react";
import { GoogleAuth, Drive } from "google-auth-library";


const App = () => {
  const [audioFiles, setAudioFiles] = useState([]);

  const handleUploadAudio = async (audioFile) => {
    const googleAuth = new GoogleAuth();
    const drive = new Drive(googleAuth);

    try {
      const file = await drive.files.create({
        name: audioFile.name,
        parents: ["1zgEmTOgLitdvCgzVMo3W3Rp2oIknQ7Tz"],
        content: audioFile.data,
      });

      setAudioFiles([...audioFiles, file]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportToGoogleDrive = async () => {
    const googleAuth = new GoogleAuth({
        client_id: process.env.REACT_APP_CLIENT_ID,
        project_id: process.env.REACT_APP_PROJECT_ID,
        auth_uri: process.env.REACT_APP_AUTH_URI,
        token_uri: process.env.REACT_APP_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.REACT_APP_AUTH_PROVIDER_X509_CERT_URL,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        redirect_uris: process.env.REACT_APP_REDIRECT_URIS,
      });
      const drive = new Drive(googleAuth);
  
      try {
        const files = await Promise.all(
          audioFiles.map((audioFile) => drive.files.create({
            name: audioFile.name,
            parents: ["1zgEmTOgLitdvCgzVMo3W3Rp2oIknQ7Tz"],
            content: audioFile.data,
          }))
        );
  
        console.log("Successfully exported audio files to Google Drive.");
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div>
      <h1>Audio Recorder</h1>
      <AudioList audioFiles={audioFiles} />
      <button onClick={() => handleUploadAudio()}>Upload Audio</button>
      <button onClick={() => handleExportToGoogleDrive()}>Export To Google Drive</button>
    </div>
  );
};

export default App;