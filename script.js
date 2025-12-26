// Навигация по страницам
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Функция переключения страницы
    function switchPage(pageId) {
        // Убираем активный класс у всех страниц
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Убираем активный класс у всех ссылок
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Добавляем активный класс выбранной странице
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
        }
        
        // Добавляем активный класс выбранной ссылке
        const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Обновляем URL в адресной строке
        window.history.pushState(null, null, `#${pageId}`);
    }
    
    // Обработка кликов по ссылкам навигации
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });
    
    // Обработка изменения хэша в URL
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1); // Убираем #
        if (hash && ['home', 'info', 'feedback'].includes(hash)) {
            switchPage(hash);
        }
    });
    
    // При загрузке страницы проверяем хэш
    const initialHash = window.location.hash.substring(1);
    if (initialHash && ['home', 'info', 'feedback'].includes(initialHash)) {
        switchPage(initialHash);
    } else {
        // Если хэша нет, показываем главную страницу
        switchPage('home');
    }
    
    // Инициализация пользователя из localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showUserSection(currentUser);
    }
    
    // Обработка формы авторизации
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const login = document.getElementById('login').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (!login || !email) {
                alert('Пожалуйста, заполните логин и email');
                return;
            }
            
            // Сохраняем пользователя
            const user = {
                login: login,
                email: email,
                phone: phone,
                avatar: login.charAt(0).toUpperCase()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Показываем секцию пользователя
            showUserSection(user);
            
            // Очищаем форму
            loginForm.reset();
            
            alert('Вы успешно авторизованы! Теперь вы можете оставлять комментарии.');
        });
    }
    
    // Обработка выхода
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            document.getElementById('auth-form').classList.remove('hidden');
            document.getElementById('user-section').classList.add('hidden');
            document.getElementById('login-message').classList.remove('hidden');
            alert('Вы вышли из системы.');
        });
    }
    
    // Обработка формы комментария
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const commentText = document.getElementById('comment-text').value.trim();
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser) {
                alert('Пожалуйста, авторизуйтесь для оставления комментариев.');
                return;
            }
            
            if (!commentText) {
                alert('Пожалуйста, введите текст отзыва.');
                return;
            }
            
            // Создаем новый комментарий
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            
            const now = new Date();
            const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth()+1).toString().padStart(2, '0')}.${now.getFullYear()}`;
            
            commentDiv.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${currentUser.login}</span>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-text">${commentText}</div>
            `;
            
            // Добавляем комментарий в начало списка
            document.getElementById('comments-list').prepend(commentDiv);
            
            // Очищаем форму
            commentForm.reset();
            
            alert('Ваш отзыв успешно опубликован!');
        });
    }
    
    // Функция показа секции пользователя
    function showUserSection(user) {
        document.getElementById('auth-form').classList.add('hidden');
        document.getElementById('user-section').classList.remove('hidden');
        document.getElementById('login-message').classList.add('hidden');
        
        document.getElementById('user-name').textContent = user.login;
        document.getElementById('user-avatar').textContent = user.avatar;
        document.getElementById('user-contact').textContent = user.email || user.phone || 'Контакт не указан';
    }
});