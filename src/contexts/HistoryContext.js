// src/contexts/HistoryContext.js
import React, { createContext, useState } from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);

    const addToHistory = (transcript) => {
        setHistory([...history, transcript]);
    };

    const deleteFromHistory = (index) => {
        setHistory(history.filter((_, i) => i !== index));
    };

    // Новая функция для редактирования элемента истории
    const editHistory = (index, updatedTranscript) => {
        setHistory(
            history.map((item, i) => (i === index ? updatedTranscript : item))
        );
    };

    return (
        <HistoryContext.Provider value={{ history, addToHistory, deleteFromHistory, editHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};
