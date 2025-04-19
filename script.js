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

// Эффект падающих лепестков
function createPetals() {
    const petalsContainer = document.getElementById('petals');
    if (!petalsContainer) return;
    
    const petalCount = 15;
    const types = ['🌸', '💮', '🏵️', '🌹', '🌺'];
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.innerHTML = types[Math.floor(Math.random() * types.length)];
        petal.style.position = 'fixed';
        petal.style.fontSize = `${Math.random() * 20 + 10}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.top = '-50px';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        petal.style.zIndex = '-1';
        petal.style.userSelect = 'none';
        petal.style.pointerEvents = 'none';
        
        const animationDuration = Math.random() * 15 + 10;
        petal.style.animation = `fall ${animationDuration}s linear infinite`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        
        petalsContainer.appendChild(petal);
    }
}

// Отправка формы в Google Sheets
async function submitFormToGoogleSheets(formData) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxXM5Lr3TeOul0tL16IqbVO_3f62mQYM607wHIAGU1U68k8RQF50q0HxDY3irIPXIEf/exec';
    
    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('Ошибка сети');
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Обработка формы
document.getElementById('guestForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const messageEl = document.getElementById('formMessage');
    
    // Сбор данных формы
    const formData = {
        name: form.name.value,
        email: form.email.value,
        guests: form.guests.value,
        message: form.message.value,
        isAttending: form.isAttending.checked
    };
    
    // Блокировка кнопки во время отправки
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    messageEl.style.display = 'none';
    
    try {
        await submitFormToGoogleSheets(formData);
        
        // Успешная отправка
        messageEl.textContent = 'Спасибо! Ваш ответ сохранён. Мы с нетерпением ждём вас!';
        messageEl.style.color = '#4CAF50';
        messageEl.style.display = 'block';
        
        // Очистка формы
        form.reset();
    } catch (error) {
        // Ошибка отправки
        messageEl.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.';
        messageEl.style.color = '#f44336';
        messageEl.style.display = 'block';
    } finally {
        // Разблокировка кнопки
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить ответ';
    }
});