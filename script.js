// Управление музыкой
const music = document.getElementById('music');
music.volume = 0.3; // Уменьшаем громкость

function toggleMusic() {
    if (music.paused) {
        music.play();
        document.getElementById('musicBtn').textContent = '🔊 Выключить';
    } else {
        music.pause();
        document.getElementById('musicBtn').textContent = '🔊 Включить';
    }
}

// Отправка формы
document.getElementById('inviteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        attending: this.querySelector('input[type="checkbox"]').checked,
        wishes: this.querySelector('textarea').value,
        date: new Date().toLocaleString()
    };

    // Отправка в Google Таблицы (замените URL на ваш)
    fetch('https://script.google.com/macros/s/AKfycbxYIlCInkiJlM7EWTobygt_rRBZdVhIMXkxiVDocCue_oKIxO3FA2lnmHkbQHz8_bB8/exec', {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(() => alert('Спасибо! Ваш ответ сохранён.'))
    .catch(err => alert('Ошибка: ' + err));
});