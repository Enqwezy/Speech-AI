// Record.js
import React, { useState, useContext } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';

const Record = () => {
  const [transcript, setTranscript] = useState('');
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
      handleAudioProcessing(file); // автоматическое преобразование после загрузки
    } else {
      alert("Пожалуйста, выберите аудиофайл.");
    }
  };

  // Функция для обработки аудиофайла
  const handleAudioProcessing = (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const audioData = event.target.result;
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        await audioContext.decodeAudioData(audioData);

        // Используем mockText для отображения результата
        const mockText = 'Преобразованный текст из аудиофайла';
        setTranscript(mockText);
        addToHistory(mockText);
      } catch (error) {
        console.error("Ошибка обработки аудио:", error);
        alert("Произошла ошибка при обработке аудио.");
      }
    };

    reader.readAsArrayBuffer(file);
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

      <p>{transcript}</p>
    </div>
  );
};

export default Record;
