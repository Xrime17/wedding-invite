document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initMusicPlayer();
    createPetals();
    setupFormSubmission();
    initScrollAnimations();
    setupSmoothScrolling();

    // Анимация появления элементов при загрузке
    animateElementsOnLoad();
});

// 1. Управление музыкальным плеером
function initMusicPlayer() {
    const music = document.getElementById('music');
    const musicBtn = document.getElementById('musicBtn');
    
    if (!music || !musicBtn) return;

    // Проверка автовоспроизведения (многие браузеры блокируют)
    music.volume = 0.3; // Уменьшаем громкость
    
    musicBtn.addEventListener('click', function() {
        if (music.paused) {
            music.play()
                .then(() => {
                    musicBtn.textContent = '♫';
                    musicBtn.setAttribute('aria-label', 'Выключить музыку');
                })
                .catch(error => {
                    console.error("Ошибка воспроизведения:", error);
                    // Показываем уведомление, если авто-воспроизведение заблокировано
                    alert('Нажмите "Разрешить", чтобы включить музыку');
                });
        } else {
            music.pause();
            musicBtn.textContent = '♪';
            musicBtn.setAttribute('aria-label', 'Включить музыку');
        }
    });
}

// 2. Создание анимации падающих лепестков
function createPetals() {
    const petalsContainer = document.getElementById('petals');
    if (!petalsContainer) return;
    
    // Очищаем контейнер на случай повторного вызова
    petalsContainer.innerHTML = '';
    
    const petalCount = 20;
    const types = ['🌸', '💮', '🏵️', '🌹', '🌺', '🌻'];
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = types[Math.floor(Math.random() * types.length)];
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.top = `-50px`;
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        petal.style.fontSize = `${Math.random() * 20 + 10}px`;
        
        // Случайная продолжительность и задержка анимации
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        petal.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        
        petalsContainer.appendChild(petal);
    }
}

// 3. Настройка плавной прокрутки
function setupSmoothScrolling() {
    // Обработка кликов по якорным ссылкам
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 4. Анимации при скролле
function initScrollAnimations() {
    // Показываем элементы при их появлении в viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.couple, .timeline-item, .gallery-item, .detail-card'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('show');
            }
        });
    };
    
    // Запускаем при загрузке и при скролле
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

// 5. Анимация элементов при загрузке
function animateElementsOnLoad() {
    // Добавляем классы для плавного появления
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) heroContent.style.opacity = '1';
    }, 300);
}

// 6. Обработка формы RSVP
function setupFormSubmission() {
    const form = document.getElementById('guestForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const messageEl = document.getElementById('formMessage');
        
        // Валидация формы
        if (!validateForm(form)) return;
        
        // Сбор данных формы
        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            guests: form.guests.value,
            message: form.message.value.trim(),
            isAttending: form.isAttending.checked,
            timestamp: new Date().toISOString()
        };
        
        // Блокировка кнопки во время отправки
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        if (messageEl) messageEl.style.display = 'none';
        
        try {
            const response = await submitToGoogleSheets(formData);
            
            // Успешная отправка
            showFormMessage('Спасибо! Ваш ответ сохранён. Мы с нетерпением ждём вас!', 'success');
            form.reset();
        } catch (error) {
            // Ошибка отправки
            console.error('Ошибка:', error);
            showFormMessage('Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.', 'error');
        } finally {
            // Разблокировка кнопки
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить ответ';
        }
    });
}

// 7. Валидация формы
function validateForm(form) {
    let isValid = true;
    const nameInput = form.name;
    const emailInput = form.email;
    
    // Валидация имени
    if (!nameInput.value.trim()) {
        setInputError(nameInput, 'Пожалуйста, введите ваше имя');
        isValid = false;
    } else {
        setInputSuccess(nameInput);
    }
    
    // Валидация email
    if (!emailInput.value.trim()) {
        setInputError(emailInput, 'Пожалуйста, введите ваш email');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        setInputError(emailInput, 'Пожалуйста, введите корректный email');
        isValid = false;
    } else {
        setInputSuccess(emailInput);
    }
    
    return isValid;
}

function setInputError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.add('error');
    let errorEl = formGroup.querySelector('.error-message');
    
    if (!errorEl) {
        errorEl = document.createElement('small');
        errorEl.className = 'error-message';
        formGroup.appendChild(errorEl);
    }
    
    errorEl.textContent = message;
}

function setInputSuccess(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.remove('error');
    const errorEl = formGroup.querySelector('.error-message');
    if (errorEl) errorEl.remove();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 8. Отправка данных в Google Sheets
async function submitToGoogleSheets(formData) {
    // ЗАМЕНИТЕ НА ВАШ URL Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxXM5Lr3TeOul0tL16IqbVO_3f62mQYM607wHIAGU1U68k8RQF50q0HxDY3irIPXIEf/exec';
    
    const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// 9. Показ сообщения формы
function showFormMessage(message, type) {
    const messageEl = document.getElementById('formMessage');
    if (!messageEl) return;
    
    messageEl.textContent = message;
    messageEl.style.display = 'block';
    messageEl.style.color = type === 'success' ? '#4CAF50' : '#f44336';
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}