window.onload = function () {
    const welcomeWindow = document.getElementById('welcomeWindow');
    const closeWelcomeBtn = document.getElementById('closeWelcome');
    const mainContent = document.getElementById('mainContent');
    const siBtn = document.getElementById('siBtn');
    const noBtn = document.getElementById('noBtn');
    const respuesta = document.getElementById('respuesta');
    const gifContainer = document.getElementById('gifContainer'); // El contenedor del GIF

    // Crear el iframe de YouTube con la URL proporcionada
    const musicFrame = document.createElement('iframe');
    musicFrame.width = '0';
    musicFrame.height = '0';
    musicFrame.src = 'https://www.youtube.com/embed/mvHNk1IBCv4?autoplay=1&mute=0'; // Cambiar al formato correcto
    musicFrame.frameborder = '0';
    musicFrame.allow = 'autoplay';

    // Esta función se llamará cuando el usuario haga clic en la página
    document.body.addEventListener('click', function () {
        // Añadir el iframe a la página solo cuando el usuario haga clic
        document.body.appendChild(musicFrame);
    });

    // Mostrar la ventana de bienvenida al cargar
    welcomeWindow.style.display = 'block';
    mainContent.style.display = 'none';

    // Cerrar la ventana de bienvenida y mostrar el contenido principal
    closeWelcomeBtn.onclick = function () {
        welcomeWindow.style.display = 'none';
        mainContent.style.display = 'block';
    };

    // Acción cuando se hace clic en el botón "¡Sí!"
    siBtn.addEventListener('click', function () {
        respuesta.textContent = 'Sabía que dirías que sí jajaja ❤️';
        respuesta.classList.add('animate__tada');

        // Mostrar el GIF debajo de la respuesta
        const gif = document.createElement('img');
        gif.src = 'gif_imagen.gif'; // Usamos el GIF local llamado "gif_imagen.gif"
        gif.alt = 'GIF de celebración';
        gif.style.maxWidth = '100%';
        gif.style.marginTop = '20px';
        gifContainer.appendChild(gif);

        // Mostrar el contenedor del GIF
        gifContainer.style.display = 'block';

        // Efecto de confeti
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });

        // Reproducir sonido de celebración (opcional)
        const audio = new Audio('celebration.mp3');
        audio.play();

        // Ocultar la ventana y mostrar el contenido principal
        welcomeWindow.style.display = 'none';
        mainContent.style.display = 'block';
    });

    // Acción cuando se intenta hacer clic en el botón "No"
    noBtn.addEventListener('mouseenter', function () {
        // Calcular posiciones aleatorias dentro de la ventana
        const maxX = window.innerWidth - noBtn.clientWidth - 20;
        const maxY = window.innerHeight - noBtn.clientHeight - 20;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = "absolute";
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    });
};

const toggleMusicBtn = document.getElementById('toggleMusic');
let isMusicPlaying = true;

toggleMusicBtn.addEventListener('click', function () {
    if (isMusicPlaying) {
        musicFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        toggleMusicBtn.textContent = "Reproducir música";
    } else {
        musicFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        toggleMusicBtn.textContent = "Pausar música";
    }
    isMusicPlaying = !isMusicPlaying;
});
