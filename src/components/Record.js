import React, { useState, useContext } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';

const Record = () => {
    const [transcript, setTranscript] = useState('');
    const [audioFile, setAudioFile] = useState(null);
    
    // Use addToHistory from context
    const { addToHistory } = useContext(HistoryContext);

    // Function to start voice recording using SpeechRecognition
    const handleSpeechRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Ваш браузер не поддерживает распознавание речи.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'ru-RU';

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            setTranscript(speechResult);
            addToHistory(speechResult); // Add to history
        };

        recognition.start();
    };

    // Function to handle audio file upload
    const handleAudioUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.includes('audio')) {
            setAudioFile(file);
        } else {
            alert("Пожалуйста, выберите аудиофайл.");
        }
    };

    // Function to process the uploaded audio file
    const handleAudioProcessing = () => {
        if (!audioFile) {
            alert("Загрузите аудиофайл перед преобразованием.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const audioData = event.target.result;
            console.log('Загруженные аудиоданные:', audioData);
            alert('Аудиофайл успешно загружен и готов к обработке.');
            // Mock audio-to-text conversion logic
            const mockText = 'Преобразованный текст из аудиофайла'; // Example
            setTranscript(mockText);
            addToHistory(mockText); // Add the result to history
        };

        reader.readAsArrayBuffer(audioFile);
    };

    return (
        <div className="record-container">
            <h1>Жазба жасау</h1>

            <div className="record-section">
                {/* Button to start recording speech */}
                <button className="record-button" onClick={handleSpeechRecognition}>Начать запись</button>
                <p className="transcript">{transcript}</p>
            </div>

            <div className="upload-section">
                <h2>Загрузить аудиофайл</h2>
                <input type="file" accept="audio/*" onChange={handleAudioUpload} className="upload-input" />
                <button className="process-button" onClick={handleAudioProcessing}>Преобразовать загруженный файл</button>
            </div>
        </div>
    );
};

export default Record;
