// Логика страницы обратной связи

document.addEventListener('DOMContentLoaded', function() {
    loadFeedback();
    
    // Обработка формы отзыва
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitFeedback();
        });
    }
});

// Загрузка отзывов
function loadFeedback() {
    const feedbackItems = document.getElementById('feedbackItems');
    if (!feedbackItems) return;
    
    // В реальном приложении здесь будет запрос к серверу
    // Для демонстрации используем тестовые данные
    const testFeedback = [
        {
            id: 1,
            username: "Иван_Петров",
            date: "10.10.2023",
            rating: 5,
            subject: "Качество обслуживания",
            message: "Отличный сервис, комфортабельный автобус, вежливый водитель. Буду пользоваться услугами компании снова.",
            approved: true
        },
        {
            id: 2,
            username: "Мария_Сидорова",
            date: "08.10.2023",
            rating: 4,
            subject: "Соблюдение расписания",
            message: "Рейс прибыл вовремя, автобус чистый и уютный. Не хватило только розетки для зарядки телефона.",
            approved: true
        },
        {
            id: 3,
            username: "Алексей_Кузнецов",
            date: "05.10.2023",
            rating: 3,
            subject: "Комфорт в автобусе",
            message: "В целом поездка прошла нормально, но кондиционер работал слишком сильно. В следующий раз возьму с собой плед.",
            approved: true
        }
    ];
    
    // Очищаем контейнер
    feedbackItems.innerHTML = '';
    
    // Добавляем отзывы
    testFeedback.forEach(feedback => {
        if (feedback.approved) {
            const feedbackElement = createFeedbackElement(feedback);
            feedbackItems.appendChild(feedbackElement);
        }
    });
    
    // Если нет отзывов, показываем сообщение
    if (feedbackItems.children.length === 0) {
        feedbackItems.innerHTML = '<p class="no-feedback">Пока нет отзывов. Будьте первым!</p>';
    }
}

// Создание элемента отзыва
function createFeedbackElement(feedback) {
    const div = document.createElement('div');
    div.className = 'feedback-item';
    
    // Создаем звездочки для рейтинга
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= feedback.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    
    div.innerHTML = `
        <div class="feedback-header">
            <span class="feedback-user"><strong>${feedback.username}</strong></span>
            <span class="feedback-date">${feedback.date}</span>
            <span class="feedback-rating">${stars}</span>
            <span class="feedback-topic">${feedback.subject}</span>
        </div>
        <div class="feedback-text">
            <p>${feedback.message}</p>
        </div>
    `;
    
    return div;
}

// Отправка отзыва
function submitFeedback() {
    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);
    
    // Проверка заполнения полей
    const username = formData.get('username');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const rating = formData.get('rating');
    const agree = formData.get('agree');
    
    if (!username || !email || !subject || !message || !agree) {
        showMessage('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Введите корректный email адрес', 'error');
        return;
    }
    
    // В реальном приложении здесь будет отправка данных на сервер
    // Для демонстрации имитируем отправку
    
    showMessage('Ваш отзыв отправлен на модерацию. После проверки он будет опубликован.', 'success');
    
    // Очищаем форму
    form.reset();
    
    // Сбрасываем рейтинг
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(input => input.checked = false);
    
    // Обновляем список отзывов (в реальном приложении после модерации)
    setTimeout(() => {
        loadFeedback();
    }, 1000);
}

// Показать сообщение
function showMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    
    // Автоматически скрыть сообщение через 5 секунд
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';
    }, 5000);
}

// Добавление стилей для сообщений
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    .form-message {
        padding: 15px;
        margin: 20px 0;
        border-radius: 5px;
        font-weight: 500;
    }
    
    .form-message.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .form-message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .no-feedback {
        text-align: center;
        padding: 30px;
        color: #777;
        font-style: italic;
    }
    
    .loading {
        text-align: center;
        padding: 30px;
        color: #777;
    }
`;

document.head.appendChild(messageStyles);