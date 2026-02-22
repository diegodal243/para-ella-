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
const clickIndicator = document.getElementById('clickIndicator');
const clickText = document.getElementById('clickText');
const progressFill = document.getElementById('progressFill');
const bgHeartsContainer = document.getElementById('bgHearts');

// Colores bonitos para los corazones
const heartColors = ['red', 'pink', 'light-pink', 'purple', 'orange', 'rose', 'salmon', 'coral', 'red-light', 'magenta', 'gold', 'hot-pink'];
const heartEmojis = ['💗', '💕', '❤️', '💖', '💝', '💘', '💓', '💞', '🩷'];

// Mensajes al hacer click
const clickMessages = [
    'Toca el sobre 💌',
    'Sigue tocando... 💕',
    '¡Casi! 💖',
    '¡Un poquito más! 💗',
    '¡Ya casi se abre! 💝'
];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    letterCard.addEventListener('click', handleCardClick);
    resetBtn.addEventListener('click', resetPage);

    // Iniciar efectos de fondo
    startBackgroundHearts();
    createSparkles();

    // Música al interactuar
    document.addEventListener('click', playMusicOnce, { once: true });
});

// Corazones flotantes de fondo continuo
function startBackgroundHearts() {
    function createBgHeart() {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const size = 15 + Math.random() * 30;
        heart.style.fontSize = size + 'px';
        heart.style.left = Math.random() * 100 + '%';

        const duration = 8 + Math.random() * 12;
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        // Drift horizontal
        const drift = (Math.random() - 0.5) * 150;
        heart.style.setProperty('--drift', drift + 'px');
        heart.style.setProperty('--rotation', (Math.random() * 360) + 'deg');

        bgHeartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), (duration + 3) * 1000);
    }

    // Crear corazones iniciales
    for (let i = 0; i < 8; i++) {
        setTimeout(createBgHeart, i * 400);
    }

    // Continuar creando corazones
    setInterval(createBgHeart, 1500);
}

// Crear partículas brillantes
function createSparkles() {
    const container = document.getElementById('sparkles');

    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.setProperty('--duration', (3 + Math.random() * 5) + 's');
        sparkle.style.animationDelay = Math.random() * 5 + 's';

        const size = 2 + Math.random() * 4;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';

        container.appendChild(sparkle);
    }
}

// Reproducir música
function playMusicOnce() {
    if (loveMusic.paused) {
        loveMusic.play().catch(() => {});
    }
}

// Manejar click en la carta
function handleCardClick(event) {
    if (clickCount >= MAX_CLICKS) return;

    clickCount++;

    // Actualizar indicador
    updateClickIndicator();

    // Crear efecto ripple
    createRipple(event);

    // Animación de la carta
    letterCard.classList.remove('clicked');
    void letterCard.offsetWidth;
    letterCard.classList.add('clicked');

    // Crear corazones
    createHearts(clickCount);

    // Música
    playMusicOnce();

    // Si alcanzó 5 clicks, abrir la carta
    if (clickCount === MAX_CLICKS) {
        setTimeout(openLetter, 1000);
    }
}

// Actualizar indicador de clicks
function updateClickIndicator() {
    // Actualizar texto
    if (clickCount < MAX_CLICKS) {
        clickText.textContent = clickMessages[clickCount];
    } else {
        clickText.textContent = '¡Abriendo tu carta! 💌✨';
    }

    // Actualizar barra de progreso
    progressFill.style.width = (clickCount / MAX_CLICKS * 100) + '%';

    // Actualizar corazones indicadores
    const hearts = document.querySelectorAll('.click-heart');
    for (let i = 0; i < clickCount; i++) {
        if (hearts[i]) {
            hearts[i].textContent = '❤️';
            hearts[i].classList.add('filled');
        }
    }
}

// Crear efecto ripple
function createRipple(event) {
    const rect = letterCard.getBoundingClientRect();

    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = (rect.left + rect.width / 2) + 'px';
    ripple.style.top = (rect.top + rect.height / 2) + 'px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(255, 105, 180, 0.6), rgba(255, 20, 147, 0.2), transparent)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleAnimation 0.8s ease-out';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.zIndex = '4';

    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
}

// Crear corazones que salen de la carta
function createHearts(clickNumber) {
    const heartCount = 8 + (clickNumber * 3);
    const sizeClass = `size-${Math.min(clickNumber * 2, 10)}`;

    for (let i = 0; i < heartCount; i++) {
        const heart = createHeartElement(
            heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
            sizeClass
        );
        heartsContainer.appendChild(heart);

        const duration = parseFloat(window.getComputedStyle(heart).animationDuration) * 1000;
        setTimeout(() => heart.remove(), duration + 200);
    }
}

// Crear elemento de corazón
function createHeartElement(emoji, sizeClass) {
    const heart = document.createElement('div');
    const colorClass = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.className = `heart ${sizeClass} ${colorClass}`;
    heart.textContent = emoji;

    heart.style.left = '50%';
    heart.style.top = '50%';

    const angle = Math.random() * Math.PI * 2;
    const distance = 200 + Math.random() * 350;

    heart.style.setProperty('--tx', (Math.cos(angle) * distance) + 'px');
    heart.style.setProperty('--ty', (Math.sin(angle) * distance) + 'px');
    heart.style.setProperty('--rotation', (Math.random() * 360 - 180) + 'deg');

    return heart;
}

// Abrir la carta
function openLetter() {
    // Ocultar indicador
    clickIndicator.style.opacity = '0';
    clickIndicator.style.transform = 'translateX(-50%) translateY(-30px)';
    clickIndicator.style.transition = 'all 0.6s ease-out';

    // Ocultar el sello
    sealContainer.classList.add('hidden');

    // Mostrar la carta
    setTimeout(() => {
        letterContent.classList.remove('hidden');

        // Crear corazones flotando dentro de la carta
        createLetterHearts();

        // Crear oleadas de corazones
        setTimeout(() => createLetterHearts(), 2000);
        setTimeout(() => createLetterHearts(), 4000);
    }, 400);

    // Mostrar botón de reinicio
    setTimeout(() => {
        resetBtn.classList.remove('hidden');
    }, 800);

    // Música
    playMusicOnce();
}

// Crear corazones flotando dentro de la carta
function createLetterHearts() {
    for (let i = 0; i < 20; i++) {
        const letterHeart = document.createElement('div');
        letterHeart.className = 'letter-heart';
        letterHeart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const size = 16 + Math.random() * 22;
        letterHeart.style.fontSize = size + 'px';

        const x = 10 + Math.random() * 80;
        const y = 10 + Math.random() * 80;
        letterHeart.style.left = x + '%';
        letterHeart.style.top = y + '%';

        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 250;

        letterHeart.style.setProperty('--tx', (Math.cos(angle) * distance) + 'px');
        letterHeart.style.setProperty('--ty', (Math.sin(angle) * distance) + 'px');
        letterHeart.style.setProperty('--rotation', (Math.random() * 90 - 45) + 'deg');

        const floatDuration = 3 + Math.random() * 3;
        letterHeart.style.setProperty('--float-duration', floatDuration + 's');
        letterHeart.style.animationDelay = (Math.random() * 1.5) + 's';

        letterHearts.appendChild(letterHeart);

        setTimeout(() => letterHeart.remove(), (floatDuration + 2) * 1000);
    }
}

// Reiniciar la página
function resetPage() {
    clickCount = 0;

    // Ocultar carta
    letterContent.classList.add('hidden');

    // Mostrar sello
    sealContainer.classList.remove('hidden');

    // Ocultar botón
    resetBtn.classList.add('hidden');

    // Restaurar indicador
    clickIndicator.style.opacity = '1';
    clickIndicator.style.transform = 'translateX(-50%) translateY(0)';
    clickText.textContent = clickMessages[0];
    progressFill.style.width = '0%';

    // Restaurar corazones indicadores
    document.querySelectorAll('.click-heart').forEach(h => {
        h.textContent = '🤍';
        h.classList.remove('filled');
    });

    // Limpiar corazones
    while (heartsContainer.firstChild) heartsContainer.removeChild(heartsContainer.firstChild);
    while (letterHearts.firstChild) letterHearts.removeChild(letterHearts.firstChild);
}

// Permitir música en cualquier interacción
document.addEventListener('click', () => {
    if (loveMusic.paused) {
        loveMusic.play().catch(() => {});
    }
});
