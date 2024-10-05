// Adiciona evento de clique para adicionar à playlist
document.querySelectorAll('.add-to-playlist').forEach(function(element) { 
    element.addEventListener('click', function() {
        alert('Adicionado à playlist!'); 
    });
});

// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function() {
    const playButtons = document.querySelectorAll('.offline-play');

    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioSrc = button.getAttribute('data-audio');
            let audio = document.querySelector(`audio[data-audio="${audioSrc}"]`);

            if (!audio) {
                audio = document.createElement('audio');
                audio.src = audioSrc;
                audio.setAttribute('data-audio', audioSrc);
                document.body.appendChild(audio);

                const progressBar = button.parentElement.querySelector('.progress');

                audio.addEventListener('timeupdate', function() {
                    const progressPercent = (audio.currentTime / audio.duration) * 100;
                    progressBar.style.width = `${progressPercent}%`;
                });

                audio.addEventListener('ended', function() {
                    progressBar.style.width = '0%';
                    button.classList.remove('fa-pause-circle');
                    button.classList.add('fa-play-circle');
                });
            }

            if (audio.paused) {
                document.querySelectorAll('audio').forEach(a => {
                    if (a !== audio) {
                        a.pause();
                        a.currentTime = 0;
                        const otherButton = document.querySelector(`.offline-play[data-audio="${a.getAttribute('data-audio')}"]`);
                        if (otherButton) {
                            otherButton.classList.remove('fa-pause-circle');
                            otherButton.classList.add('fa-play-circle');
                        }
                    }
                });

                playButtons.forEach(btn => {
                    btn.classList.remove('fa-pause-circle');
                    btn.classList.add('fa-play-circle');
                });

                audio.play();
                button.classList.remove('fa-play-circle');
                button.classList.add('fa-pause-circle');
            } else {
                audio.pause();
                button.classList.remove('fa-pause-circle');
                button.classList.add('fa-play-circle');
            }
        });
    });

    const backButtons = document.querySelectorAll('.fa-backward-step');
    const forwardButtons = document.querySelectorAll('.fa-forward-step');

    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audio = document.querySelector('.fa-pause-circle');
            if (audio) {
                const currentAudio = document.querySelector(`audio[data-audio="${audio.getAttribute('data-audio')}"]`);
                currentAudio.currentTime = Math.max(0, currentAudio.currentTime - 10); // Retroceder 10 segundos
            }
        });
    });

    forwardButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audio = document.querySelector('.fa-pause-circle');
            if (audio) {
                const currentAudio = document.querySelector(`audio[data-audio="${audio.getAttribute('data-audio')}"]`);
                currentAudio.currentTime = Math.min(currentAudio.duration, currentAudio.currentTime + 10); // Avançar 10 segundos
            }
        });
    });

    // Função para adicionar/remover a classe 'transparent' ao navbar
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero-section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroSection.offsetHeight) {
            navbar.classList.add('transparent');
        } else {
            navbar.classList.remove('transparent');
        }
    });
});
