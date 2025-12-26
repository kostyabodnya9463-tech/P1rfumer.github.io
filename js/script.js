// Общие функции для сайта

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Активация текущей страницы в навигации
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Инициализация галереи на странице "О компании"
    if (currentPage === 'about.html') {
        initGallery();
    }
});

// Инициализация галереи
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this.src, this.alt);
        });
    });
}

// Модальное окно для изображений
function openModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${src}" alt="${alt}">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие модального окна
    modal.querySelector('.close').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Добавление стилей для модального окна
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal {
        display: flex;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .modal-content img {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }
    
    .close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 35px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .close:hover {
        color: #ccc;
    }
`;

document.head.appendChild(modalStyles);