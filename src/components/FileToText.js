// src/components/AudioFileToText.js
import React, { useState, useContext, useEffect } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';

const AudioFileToText = () => {
  const [transcript, setTranscript] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToHistory } = useContext(HistoryContext);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = 'ru-RU';
      recognitionInstance.continuous = true; // Позволяет продолжить запись без остановки
      recognitionInstance.interimResults = true;
      setRecognition(recognitionInstance);

      recognitionInstance.onresult = (event) => {
        const speechResult = event.results[event.resultIndex][0].transcript;
        setTranscript(speechResult);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Ошибка при распознавании речи:', event.error);
        setIsProcessing(false);
      };

      recognitionInstance.onend = () => {
        setIsProcessing(false);
      };
    }
  }, []);

  // Обработчик загрузки аудиофайла
  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes('audio')) {
      setAudioFile(file);
    } else {
      alert('Пожалуйста, выберите корректный аудиофайл.');
    }
  };

  // Функция для обработки аудиофайла
  const handleAudioProcessing = () => {
    if (!audioFile) {
      alert('Загрузите аудиофайл перед преобразованием.');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const audioData = event.target.result;
      console.log('Аудиофайл загружен:', audioData);

      // Имитируем процесс преобразования текста
      const mockText = 'Преобразованный текст из аудиофайла (пример)';
      setTranscript(mockText);
      addToHistory(mockText);
      setIsProcessing(false);
    };

    reader.readAsArrayBuffer(audioFile);
  };

  // Обработчик остановки распознавания
  const handleStopProcessing = () => {
    if (recognition && isProcessing) {
      recognition.stop();
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Преобразование аудиофайла в текст</h1>
      <input type="file" accept="audio/*" onChange={handleAudioUpload} />
      <button onClick={handleAudioProcessing} disabled={isProcessing}>
        {isProcessing ? 'Идет преобразование...' : 'Преобразовать файл'}
      </button>
      <button onClick={handleStopProcessing} disabled={!isProcessing} style={{ marginLeft: '10px' }}>
        Стоп
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default AudioFileToText;
