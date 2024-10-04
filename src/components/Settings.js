import React, { useState } from 'react';

const Settings = () => {
    const [language, setLanguage] = useState('ru-RU');
    const [theme, setTheme] = useState('light');

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div>
            <h1>Параметрлер беті</h1>
            <label>
                Выбор языка:
                <select value={language} onChange={handleLanguageChange}>
                    <option value="ru-RU">Русский</option>
                    <option value="en-US">Английский</option>
                </select>
            </label>
            <br />
            <button onClick={handleThemeChange}>
                Переключить тему на {theme === 'light' ? 'тёмную' : 'светлую'}
            </button>
        </div>
    );
};

export default Settings;
