window.onload = function () {
    const welcomeWindow = document.getElementById('welcomeWindow');
    const closeWelcomeBtn = document.getElementById('closeWelcome');
    const mainContent = document.getElementById('mainContent');
    const siBtn = document.getElementById('siBtn');
    const noBtn = document.getElementById('noBtn');
    const respuesta = document.getElementById('respuesta');
    const gifContainer = document.getElementById('gifContainer');
    const toggleMusicBtn = document.getElementById('toggleMusic');
    
    let isMusicPlaying = false;
    const audio = new Audio('background-music.mp3');
    audio.loop = true;

    // Reproducir música cuando el usuario interactúe con la página
    document.body.addEventListener('click', function () {
        if (!isMusicPlaying) {
            audio.play().catch(error => console.log("Error al reproducir audio: ", error));
            isMusicPlaying = true;
        }
    }, { once: true });

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
        respuesta.textContent = '¡Sabía que dirías que sí jajaja ❤️!';
        respuesta.classList.add('animate__tada');

        // Limpiar el contenedor del GIF antes de agregar otro
        gifContainer.innerHTML = "";

        // Crear y agregar el nuevo GIF
        const gif = document.createElement('img');
        gif.src = 'heart-happy.gif';
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
    });

    // Acción cuando se intenta hacer clic en el botón "No"
    noBtn.addEventListener('mouseenter', function () {
        const maxX = window.innerWidth - noBtn.clientWidth - 20;
        const maxY = window.innerHeight - noBtn.clientHeight - 20;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = "absolute";
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    });

    // Control de la música con el botón de reproducción/pausa
    if (toggleMusicBtn) {
        toggleMusicBtn.addEventListener('click', function () {
            if (isMusicPlaying) {
                audio.pause();
                toggleMusicBtn.textContent = "Reproducir música";
            } else {
                audio.play();
                toggleMusicBtn.textContent = "Pausar música";
            }
            isMusicPlaying = !isMusicPlaying;
        });
    }
};
