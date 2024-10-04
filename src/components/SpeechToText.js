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
        recognition.lang = 'ru-RU'; // Установи язык

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            setTranscript(speechResult);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Ошибка при распознавании речи: ", event.error);
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Speech-to-Text Преобразователь</h1>
            <button onClick={handleSpeechRecognition} disabled={isListening} style={{ padding: '10px', fontSize: '16px' }}>
                {isListening ? 'Прослушивание...' : 'Начать преобразование речи'}
            </button>
            <p style={{ opacity: transcript ? 1 : 0 }}>{transcript || 'Голосовое сообщение появится здесь...'}</p>
        </div>
    );
};

export default SpeechToText;
