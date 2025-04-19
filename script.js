// Управление музыкой
const music = document.getElementById('music');

function toggleMusic() {
    if (music.paused) {
        music.play()
            .then(() => {
                document.getElementById('musicBtn').textContent = '♫';
            })
            .catch(error => {
                console.error("Ошибка воспроизведения:", error);
            });
    } else {
        music.pause();
        document.getElementById('musicBtn').textContent = '♪';
    }
}

// Инициализация после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // Установка громкости музыки
    if (music) {
        music.volume = 0.3;
    }
    
    // Анимация при скролле
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Плавный скролл для кнопки "вниз"
    document.querySelector('.scroll-down').addEventListener('click', () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Обработка формы RSVP
    const guestForm = document.getElementById('guestForm');
    if (guestForm) {
        guestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                guests: this.querySelector('select').value,
                message: this.querySelector('textarea').value,
                isAttending: this.querySelector('input[type="checkbox"]').checked
            };
            
            // Здесь можно добавить отправку данных на сервер
            console.log('Данные формы:', formData);
            
            // Показываем сообщение об успехе
            alert('Спасибо! Ваш ответ сохранён. Мы с нетерпением ждём вас!');
            
            // Сброс формы
            this.reset();
        });
    }
    
    // Плавная прокрутка для всех внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});