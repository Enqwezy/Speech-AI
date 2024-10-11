// src/components/SpeechToText.js
import React, { useState } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Ваш браузер не поддерживает распознавание речи.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      setTranscript(event.results[0][0].transcript);
    };

    recognition.onerror = (event) => {
      console.error('Ошибка:', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Преобразование голоса в текст</h1>
      <button onClick={handleSpeechRecognition} disabled={isListening}>
        {isListening ? 'Запись...' : 'Начать запись'}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
