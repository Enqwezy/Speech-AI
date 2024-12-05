import React, { useState, useContext } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';
import { uploadAudioFile, transcribeAudio, checkTranscriptionStatus } from '../contexts/assemblyAI';

const Record = () => {
  const [transcript, setTranscript] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [loading, setLoading] = useState(false);
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
    if (file) {
      setAudioFile(file);
    } else {
      alert("Пожалуйста, выберите аудиофайл.");
    }
  };

  // Функция для обработки аудиофайла
  const handleAudioProcessing = async () => {
    if (!audioFile) {
      alert("Загрузите аудиофайл перед преобразованием.");
      return;
    }

    setLoading(true);

    try {
      // Загрузка файла
      const audioUrl = await uploadAudioFile(audioFile);

      // Запуск транскрипции
      const transcription = await transcribeAudio(audioUrl);

      // Проверка статуса
      let transcriptionData;
      do {
        transcriptionData = await checkTranscriptionStatus(transcription.id);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Ждем 5 секунд перед повторной проверкой
      } while (transcriptionData.status !== 'completed');

      // Успешная обработка
      setTranscript(transcriptionData.text);
      addToHistory(transcriptionData.text);

    } catch (error) {
      console.error("Ошибка при обработке аудиофайла:", error);
      alert("Произошла ошибка при преобразовании аудио.");
    } finally {
      setLoading(false);
    }
  };

  // Функция для обработки видео по ссылке
  const handleVideoLinkProcessing = () => {
    if (!videoLink) {
      alert("Введите ссылку на видео для преобразования.");
      return;
    }

    // Симуляция преобразования текста
    const mockVideoText = 'Преобразованный текст из видео по ссылке';
    setTranscript(mockVideoText);
    addToHistory(mockVideoText);
  };

  return (
    <div className="record-container">
      <h1>Запись и преобразование</h1>

      {/* Секция записи речи */}
      <div className="record-section">
        <h3>Распознавание речи</h3>
        <button onClick={handleSpeechRecognition}>Начать запись</button>
      </div>

      {/* Секция загрузки аудиофайла */}
      <div className="upload-section">
        <h3>Загрузка аудиофайла</h3>
        <input type="file" accept="audio/*" onChange={handleAudioUpload} />
        <button onClick={handleAudioProcessing} disabled={loading}>
          {loading ? 'Обработка...' : 'Преобразовать файл'}
        </button>
      </div>

      {/* Секция обработки видео по ссылке */}
      <div className="video-link-section">
        <h3>Обработка видео</h3>
        <input
          type="text"
          placeholder="Введите ссылку на видео (YouTube, TikTok, Instagram)"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        <button onClick={handleVideoLinkProcessing}>Преобразовать видео</button>
      </div>

      {/* Секция результата */}
      {transcript && (
        <div className="result-section">
          <h3>Преобразованный текст:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default Record;
