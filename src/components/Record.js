// Record.js
import React, { useState, useContext } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';


const Record = () => {
  const [transcript, setTranscript] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const { addToHistory } = useContext(HistoryContext);

  // Функция для распознавания речи через микрофон
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

  // Функция для загрузки аудиофайла
  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes('audio')) {
      setAudioFile(file);
    } else {
      alert("Пожалуйста, выберите аудиофайл.");
    }
  };

  // Функция для обработки аудиофайла
  // Функция для обработки аудиофайла
const handleAudioProcessing = () => {
  if (!audioFile) {
    alert("Загрузите аудиофайл перед преобразованием.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const audioData = event.target.result;

    // Используем audioData, например, выводим его в консоль
    console.log('Аудиоданные загружены:', audioData);

    const mockText = 'Преобразованный текст из аудиофайла';
    setTranscript(mockText);
    addToHistory(mockText);
  };

  reader.readAsArrayBuffer(audioFile);
};


  // Функция для обработки видео по ссылке
  const handleVideoLinkProcessing = () => {
    if (!videoLink) {
      alert("Введите ссылку на видео для преобразования.");
      return;
    }

    const mockVideoText = 'Преобразованный текст из видео по ссылке';
    setTranscript(mockVideoText);
    addToHistory(mockVideoText);
  };

  return (
    <div className="record-container">
      <h1>Запись и загрузка аудио</h1>

      {/* Секция для записи */}
      <div className="record-section">
        <button onClick={handleSpeechRecognition}>Начать запись</button>
        <p>{transcript}</p>
      </div>

      {/* Секция для загрузки аудиофайла */}
      <div className="upload-section">
        <input type="file" accept="audio/*" onChange={handleAudioUpload} />
        <button onClick={handleAudioProcessing}>Преобразовать файл</button>
      </div>

      {/* Секция для ввода ссылки на видео */}
      <div className="video-link-section">
        <input
          type="text"
          placeholder="Введите ссылку на видео (YouTube, TikTok, Instagram)"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        <button onClick={handleVideoLinkProcessing}>Преобразовать видео</button>
      </div>
    </div>
  );
};

export default Record;