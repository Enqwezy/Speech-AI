import React, { useState } from 'react';


const Record = () => {
    const [transcript, setTranscript] = useState('');
    const [audioFile, setAudioFile] = useState(null);

    // Функция для записи голоса с помощью SpeechRecognition
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
        };

        recognition.start();
    };

    // Функция для обработки загруженного аудиофайла
    const handleAudioUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.includes('audio')) {
            setAudioFile(file);
        } else {
            alert("Пожалуйста, выберите аудиофайл.");
        }
    };

    // Функция для обработки загруженного аудио
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
        };

        reader.readAsArrayBuffer(audioFile);
    };

    return (
        <div className="record-container">
            <h1>Жазба жасау</h1>

            <div className="record-section">
                {/* Кнопка для записи речи */}
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
