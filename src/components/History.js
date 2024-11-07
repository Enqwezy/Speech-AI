// src/components/History.js
import React, { useContext, useState } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';

const HistoryPage = () => {
    const { history, deleteFromHistory, editHistory } = useContext(HistoryContext);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newTranscript, setNewTranscript] = useState('');

    // Включить режим редактирования для конкретного элемента
    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewTranscript(history[index]);
    };

    // Сохранить изменения
    const handleSave = (index) => {
        editHistory(index, newTranscript);
        setEditingIndex(null);
        setNewTranscript('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Тарих беті</h1>
            <p>Список всех преобразованных текстов:</p>
            <ul>
                {history.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={newTranscript}
                                onChange={(e) => setNewTranscript(e.target.value)}
                            />
                        ) : (
                            <span>{item}</span>
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
    );
};

export default HistoryPage;
