import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <header className="header-section">
                <h1>Басты бет</h1>
                <p>Платформа Speech AI позволяет преобразовывать голос в текст с использованием передовых технологий искусственного интеллекта.</p>
                <div className="button-group">
                    <Link to="/record">
                        <button className="primary-btn">Начать запись</button>
                    </Link>
                    <Link to="/upload">
                        <button className="secondary-btn">Загрузить аудио</button>
                    </Link>
                </div>
            </header>

            <section className="features-section">
                <h2>Основные возможности</h2>
                <div className="features-list">
                    <div className="feature-item">
                        <i className="fas fa-microphone-alt feature-icon"></i>
                        <h3>Распознавание речи</h3>
                        <p>Записывайте голосовые сообщения и мгновенно превращайте их в текст.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-file-audio feature-icon"></i>
                        <h3>Загрузка файлов</h3>
                        <p>Загружайте аудиофайлы и преобразуйте их в текстовые документы.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-cog feature-icon"></i>
                        <h3>Настройка параметров</h3>
                        <p>Гибкие параметры для улучшения качества распознавания речи.</p>
                    </div>
                </div>
            </section>

            <section className="testimonial-section">
                <h2>Отзывы пользователей</h2>
                <div className="testimonial-item">
                    <p>"Платформа Speech AI помогла мне упростить рабочие процессы и сэкономить время!"</p>
                    <p><strong>— Айжан, журналист</strong></p>
                </div>
            </section>

            <footer className="footer-section">
                <p>© 2024 Speech AI Platform. Все права защищены.</p>
            </footer>
        </div>
    );
};

export default Home;
