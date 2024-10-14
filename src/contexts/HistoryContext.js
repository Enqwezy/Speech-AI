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

    return (
        <HistoryContext.Provider value={{ history, addToHistory, deleteFromHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};

