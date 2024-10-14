// components/Record.js
import React, { useState, useContext } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';


const Record = () => {
  const [transcript, setTranscript] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const { addToHistory } = useContext(HistoryContext);

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
      addToHistory(speechResult);
    };

    recognition.start();
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes('audio')) {
      setAudioFile(file);
    } else {
      alert("Пожалуйста, выберите аудиофайл.");
    }
  };

const handleAudioProcessing = () => {
  if (!audioFile) {
    alert("Загрузите аудиофайл перед преобразованием.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const audioData = event.target.result;
    console.log(audioData); // Вывод данных аудиофайла в консоль для проверки

    const mockText = 'Преобразованный текст из аудиофайла';
    setTranscript(mockText);
    addToHistory(mockText);
  };

  reader.readAsArrayBuffer(audioFile);
};


  return (
    <div className="record-container">
      <h1>Запись и загрузка аудио</h1>
      <div className="record-section">
        <button onClick={handleSpeechRecognition}>Начать запись</button>
        <p>{transcript}</p>
      </div>
      <div className="upload-section">
        <input type="file" accept="audio/*" onChange={handleAudioUpload} />
        <button onClick={handleAudioProcessing}>Преобразовать файл</button>
      </div>
    </div>
  );
};

export default Record;
