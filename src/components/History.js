import React, { useContext } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';

const HistoryPage = () => {
    const { history, deleteFromHistory } = useContext(HistoryContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Тарих беті</h1>
            <p>Список всех преобразованных текстов:</p>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => deleteFromHistory(index)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryPage;
