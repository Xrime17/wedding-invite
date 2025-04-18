// Управление музыкой
const music = document.getElementById('bgMusic');
music.volume = 0.3;  // Уменьшаем громкость

function toggleMusic() {
    const music = document.getElementById('music');
    if (!music) {
      console.error("Аудио-элемент не найден!");
      return;
    }
    
    if (music.paused) {
      music.play()
        .then(() => {
          document.getElementById('musicBtn').textContent = '🔊 Выключить';
        })
        .catch(error => {
          console.error("Ошибка воспроизведения:", error);
        });
    } else {
      music.pause();
      document.getElementById('musicBtn').textContent = '🔊 Включить';
    }
  }
  
  // Инициализация после загрузки страницы
  document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('music');
    if (music) {
      music.volume = 0.3; // Установка громкости
    }
  });
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