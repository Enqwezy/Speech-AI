import axios from 'axios';

const ASSEMBLY_API_URL = 'https://api.assemblyai.com/v2';
const API_KEY = 'c61da9ff9b3b4ec597a33acd9fce90d2'; // Замените на ваш ключ

// Загрузка файла на сервер AssemblyAI
export const uploadAudioFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${ASSEMBLY_API_URL}/upload`, formData, {
        headers: {
            authorization: API_KEY,
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.upload_url;
};

// Отправка запроса на транскрипцию
export const transcribeAudio = async (audioUrl) => {
    const response = await axios.post(
        `${ASSEMBLY_API_URL}/transcript`,
        { audio_url: audioUrl },
        {
            headers: {
                authorization: API_KEY,
            },
        }
    );

    return response.data;
};

// Получение результата транскрипции
export const checkTranscriptionStatus = async (transcriptionId) => {
    const response = await axios.get(
        `${ASSEMBLY_API_URL}/transcript/${transcriptionId}`,
        {
            headers: {
                authorization: API_KEY,
            },
        }
    );

    return response.data;
};
