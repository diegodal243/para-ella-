// Variables globales
let clickCount = 0;
const MAX_CLICKS = 5;
const letterCard = document.getElementById('letterCard');
const sealContainer = document.getElementById('sealContainer');
const letterContent = document.getElementById('letterContent');
const heartsContainer = document.getElementById('heartsContainer');
const letterHearts = document.getElementById('letterHearts');
const resetBtn = document.getElementById('resetBtn');
const loveMusic = document.getElementById('loveMusic');

// Colores bonitos para los corazones
const heartColors = ['red', 'pink', 'light-pink', 'purple', 'orange', 'rose', 'salmon', 'coral', 'red-light', 'magenta'];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    letterCard.addEventListener('click', handleCardClick);
    resetBtn.addEventListener('click', resetPage);
    
    // Iniciar la música al hacer interacción (debido a políticas de navegadores)
    document.addEventListener('click', playMusicOnce, { once: true });
});

// Reproducir música una sola vez
function playMusicOnce() {
    if (loveMusic.paused) {
        loveMusic.play().catch(err => console.log('No se pudo reproducir la música:', err));
    }
}

// Manejar click en la carta
function handleCardClick(event) {
    if (clickCount >= MAX_CLICKS) return;
    
    clickCount++;
    
    // Crear efecto ripple
    createRipple(event);
    
    // Animación de la carta
    letterCard.classList.remove('clicked');
    void letterCard.offsetWidth; // Trigger reflow
    letterCard.classList.add('clicked');
    
    // Crear corazones que salen de la carta
    createHearts(clickCount);
    
    // Reproducir música
    playMusicOnce();
    
    // Si alcanzó 5 clicks, abrir la carta
    if (clickCount === MAX_CLICKS) {
        setTimeout(openLetter, 800);
    }
}

// Crear efecto ripple en el click
function createRipple(event) {
    const rect = letterCard.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = (rect.left + rect.width / 2) + 'px';
    ripple.style.top = (rect.top + rect.height / 2) + 'px';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(233, 30, 99, 0.5), transparent)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleAnimation 0.6s ease-out';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.zIndex = '4';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}


// Crear corazones que salen de la carta
function createHearts(clickNumber) {
    const heartCount = 5 + (clickNumber * 2); // Más corazones con cada click
    const sizeClass = `size-${Math.min(clickNumber, 10)}`; // Tamaño aumenta por click
    
    for (let i = 0; i < heartCount; i++) {
        const heart = createHeartElement('💗', sizeClass);
        heartsContainer.appendChild(heart);
        
        // Remover el corazón después de su animación
        const duration = parseFloat(window.getComputedStyle(heart).animationDuration) * 1000;
        setTimeout(() => {
            heart.remove();
        }, duration);
    }
}

// Crear elemento de corazón
function createHeartElement(emoji, sizeClass) {
    const heart = document.createElement('div');
    
    // Color aleatorio
    const colorClass = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.className = `heart ${sizeClass} ${colorClass}`;
    heart.textContent = emoji;
    
    // Posición inicial centrada en el contenedor de corazones (50%, 50%)
    heart.style.left = '50%';
    heart.style.top = '50%';
    
    // Dirección y distancia aleatorias
    const angle = Math.random() * Math.PI * 2;
    const distance = 200 + Math.random() * 250; // 200-450px
    
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');
    
    return heart;
}

// Abrir la carta
function openLetter() {
    // Ocultar el sello
    sealContainer.classList.add('hidden');
    
    // Mostrar la carta
    letterContent.classList.remove('hidden');
    
    // Crear corazones adicionales dentro de la carta
    createLetterHearts();
    
    // Reproducir música
    playMusicOnce();
    
    // Mostrar botón de reinicio
    setTimeout(() => {
        resetBtn.classList.remove('hidden');
    }, 600);
}

// Crear corazones flotando dentro de la carta
function createLetterHearts() {
    const heartEmojis = ['💗', '💕', '❤️', '💖', '💝'];
    
    for (let i = 0; i < 15; i++) {
        const letterHeart = document.createElement('div');
        letterHeart.className = 'letter-heart';
        letterHeart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Posición aleatoria dentro de la carta
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        letterHeart.style.left = x + '%';
        letterHeart.style.top = y + '%';
        
        // Dirección de salida aleatoria
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 300;
        
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        letterHeart.style.setProperty('--tx', tx + 'px');
        letterHeart.style.setProperty('--ty', ty + 'px');
        
        // Delay aleatorio para efecto escalonado
        letterHeart.style.animationDelay = Math.random() * 0.5 + 's';
        
        letterHearts.appendChild(letterHeart);
        
        // Remover después de la animación
        const duration = parseFloat(window.getComputedStyle(letterHeart).animationDuration) * 1000;
        setTimeout(() => {
            letterHeart.remove();
        }, duration + (parseFloat(letterHeart.style.animationDelay) * 1000));
    }
}

// Reiniciar la página
function resetPage() {
    clickCount = 0;
    
    // Ocultar carta
    letterContent.classList.add('hidden');
    
    // Mostrar sello
    sealContainer.classList.remove('hidden');
    
    // Ocultar botón reinicio
    resetBtn.classList.add('hidden');
    
    // Limpiar corazones
    while (heartsContainer.firstChild) {
        heartsContainer.removeChild(heartsContainer.firstChild);
    }
    while (letterHearts.firstChild) {
        letterHearts.removeChild(letterHearts.firstChild);
    }
}

// Permitir reproducir música cuando el usuario interactúe con la página
document.addEventListener('click', () => {
    if (loveMusic.paused) {
        loveMusic.play().catch(err => {
            console.log('La música se reproducirá después de la interacción del usuario');
        });
    }
});
