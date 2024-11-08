// HistoryContext.js
import React, { createContext, useState, useEffect } from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children, currentUser }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadUserHistory = () => {
      if (currentUser) {
        const userHistory = JSON.parse(localStorage.getItem(`history_${currentUser.name}`)) || [];
        setHistory(userHistory);
      }
    };
    loadUserHistory();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`history_${currentUser.name}`, JSON.stringify(history));
    }
  }, [history, currentUser]);

  const addToHistory = (result) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Форматируем дату как "yyyy-mm-dd"
    setHistory((prevHistory) => [...prevHistory, { text: result, date: currentDate }]);
  };

  const deleteFromHistory = (index) => {
    setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
  };

  const editHistory = (index, newTranscript) => {
    setHistory((prevHistory) =>
      prevHistory.map((item, i) => (i === index ? { ...item, text: newTranscript } : item))
    );
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, deleteFromHistory, editHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
