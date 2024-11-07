// components/Feedback.js
import React, { useState, useEffect } from 'react';

function Feedback() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  
  // Загружаем отзывы из localStorage при первом рендере
  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem('feedbackList')) || [];
    setFeedbackList(storedFeedback);
  }, []);

  // Сохраняем отзывы в localStorage при каждом обновлении списка
  useEffect(() => {
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
  }, [feedbackList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Создаём новый отзыв и добавляем его в список
    const newFeedback = { name, feedback };
    setFeedbackList([...feedbackList, newFeedback]);
    // Очищаем поля формы после отправки
    setName('');
    setFeedback('');
  };

  return (
    <div className="feedback-section">
      <h2>Обратная связь</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Оставьте ваш отзыв..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button type="submit">Отправить</button>
      </form>
      
      <h3>Отзывы пользователей</h3>
      <ul>
        {feedbackList.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong>: {item.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feedback;
