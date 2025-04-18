// Управление музыкой
const music = document.getElementById('bgMusic');
music.volume = 0.3;  // Уменьшаем громкость

function toggleMusic() {
    if (music.paused) {
        music.play();
        document.getElementById('musicToggle').textContent = '🔊 Выключить музыку';
    } else {
        music.pause();
        document.getElementById('musicToggle').textContent = '🔊 Включить музыку';
    }
}

// Отправка формы
document.getElementById('guestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        isAttending: this.querySelector('input[type="checkbox"]').checked
    };

    // Отправляем данные в Google Sheets (как в предыдущей инструкции)
    fetch('Вhttps://script.google.com/macros/s/AKfycbxYIlCInkiJlM7EWTobygt_rRBZdVhIMXkxiVDocCue_oKIxO3FA2lnmHkbQHz8_bB8/exec', {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(() => alert('Спасибо! Ваши данные сохранены.'))
    .catch(err => alert('Ошибка: ' + err));
});