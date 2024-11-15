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

  // Функция для добавления нового отзыва
  const handleSubmit = (e) => {
    e.preventDefault();
    // Создаем новый отзыв
    const newFeedback = { name, feedback, id: Date.now() };
    const updatedFeedbackList = [...feedbackList, newFeedback];
    setFeedbackList(updatedFeedbackList);

    // Сохраняем обновленный список отзывов в localStorage
    localStorage.setItem('feedbackList', JSON.stringify(updatedFeedbackList));

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
        {feedbackList.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feedback;
