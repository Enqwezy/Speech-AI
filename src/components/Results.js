import React, { useState, useContext } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';
import { uploadAudioFile, transcribeAudio, checkTranscriptionStatus } from '../contexts/assemblyAI';

const Record = () => {
  const [transcript, setTranscript] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToHistory } = useContext(HistoryContext);

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
    } else {
      alert("Пожалуйста, выберите аудиофайл.");
    }
  };

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

  return (
    <div className="record-container">
      <h1>Загрузка аудиофайла</h1>

      {/* Секция загрузки файла */}
      <div className="upload-section">
        <input type="file" accept="audio/*" onChange={handleAudioUpload} />
        <button onClick={handleAudioProcessing} disabled={loading}>
          {loading ? 'Обработка...' : 'Преобразовать файл'}
        </button>
      </div>

      {/* Отображение результата */}
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
