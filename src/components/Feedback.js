// components/Feedback.js
import React, { useState } from 'react';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="feedback-section">
      <h2>Обратная связь</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Оставьте ваш отзыв..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <button type="submit">Отправить</button>
        </form>
      ) : (
        <p>Спасибо за ваш отзыв!</p>
      )}
    </div>
  );
}

export default Feedback;
