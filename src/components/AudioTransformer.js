import AudioList from './AudioList';
import AudioRecorder from './AudioRecorder'

//<AudioRecorder mediaRecorder = {mediaRecorder}></AudioRecorder>
const a = new AudioRecorder();

function apply_transfer(signal, transfer, interpolation = 'linear') 
{
  const constant = Array.from({ length: transfer.length }, (_, i) => -1 + (2 * i) / (transfer.length - 1));
  const interpolator = interp1d(constant, transfer, interpolation);
  return signal.map(interpolator);
}

// Function for hard limiting
function limiter(x, threshold = 0.8) 
{
  const transfer_len = 1000;
  const transfer = [
    ...Array(((1 - threshold) / 2) * transfer_len).fill(-1),
    ...Array(threshold * transfer_len).fill(-1).map((_, i) => -1 + (2 * i) / (threshold * transfer_len - 1)),
    ...Array(((1 - threshold) / 2) * transfer_len).fill(1),
  ];
  return apply_transfer(x, transfer);
}

function arctan_compressor(x, factor = 2) {
  const constant = Array.from({ length: 1000 }, (_, i) => -1 + (2 * i) / 999);
  const transfer = constant.map((c) => Math.atan(factor * c));
  const maxAbsValue = Math.max(...transfer.map(Math.abs));
  transfer.forEach((val, i) => (transfer[i] /= maxAbsValue));
  return apply_transfer(x, transfer);
}

// Sample usage with audio data
//const audio_data = "output_comp.wav"; // Replace with your audio file path
const audio_data = a;
const x = []; // Your audio data array (replace this with actual audio data)
const sr = 44100; // Sample rate (replace this with actual sample rate)

// Limiter
const x2 = limiter(x);
const x2Int16 = x2.map((sample) => Math.round(sample * 32767));
// Save the output
// Replace the following with code to write the audio data to a file in the desired format
// e.g., WAV or MP3
//writeAudioToFile("output_limit.wav", x2Int16, sr);
const fs = require('fs');
const wav = require('node-wav');

// Lire le fichier audio
const fileData = fs.readFileSync(audio_data);
const { sampleRate, channelData } = wav.decode(fileData);

// Traitement audio (appliquer des effets, filtrages, etc.)

// Exemple de sauvegarde du fichier audio traité
const newAudioData = wav.encode(channelData, { sampleRate, float: false });
fs.writeFileSync(audio_data, newAudioData);

// Arctan Compressor
const x3 = arctan_compressor(x);
const x3Int16 = x3.map((sample) => Math.round(sample * 32767));
// Save the output
// Replace the following with code to write the audio data to a file in the desired format
// e.g., WAV or MP3
// writeAudioToFile("output_comp.wav", x3Int16, sr);
const fileData2 = fs.readFileSync(audio_data);
const { sampleRate2, channelData2 } = wav.decode(fileData2);

// Traitement audio (appliquer des effets, filtrages, etc.)

// Exemple de sauvegarde du fichier audio traité
const newAudioData2 = wav.encode(channelData2, { sampleRate2, float: false });
fs.writeFileSync(audio_data, newAudioData2);

// Visualizing the audio data (Spectrogram and Zooming)
// The visualization part is not easily translatable to JavaScript as it requires
// dependencies such as matplotlib and librosa which are Python-specific libraries.
// To visualize audio data in JavaScript, you would need to use web audio APIs or
// audio visualization libraries for the web.

// Note: This JavaScript code only transcribes the audio processing functions.
// The audio file reading, writing, and visualization parts need to be handled differently in JavaScript.
// You may need to use appropriate libraries or APIs for those tasks.