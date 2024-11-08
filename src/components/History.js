// src/components/History.js
import React, { useContext, useState } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';

// Функция для форматирования даты
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Сегодня';
    if (date.toDateString() === yesterday.toDateString()) return 'Вчера';

    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
};

const HistoryPage = () => {
    const { history, deleteFromHistory, editHistory } = useContext(HistoryContext);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newTranscript, setNewTranscript] = useState('');

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewTranscript(history[index].text);
    };

    const handleSave = (index) => {
        editHistory(index, newTranscript);
        setEditingIndex(null);
        setNewTranscript('');
    };

    const groupedHistory = history.reduce((groups, item) => {
        const dateLabel = formatDate(item.date);
        if (!groups[dateLabel]) groups[dateLabel] = [];
        groups[dateLabel].push(item);
        return groups;
    }, {});

    return (
        <div style={{ padding: '20px' }}>
            <h1>Тарих беті</h1>
            <p>Список всех преобразованных текстов по дате:</p>
            {Object.keys(groupedHistory).map((dateLabel) => (
                <div key={dateLabel}>
                    <h3>{dateLabel}</h3>
                    <ul>
                        {groupedHistory[dateLabel].map((item, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={newTranscript}
                                        onChange={(e) => setNewTranscript(e.target.value)}
                                    />
                                ) : (
                                    <span>{item.text}</span>
                                )}
                                {editingIndex === index ? (
                                    <button onClick={() => handleSave(index)}>Сохранить</button>
                                ) : (
                                    <button onClick={() => handleEdit(index)}>Редактировать</button>
                                )}
                                <button onClick={() => deleteFromHistory(index)}>Удалить</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default HistoryPage;
