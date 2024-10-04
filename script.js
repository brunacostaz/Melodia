document.querySelectorAll('.add-to-playlist').forEach(function(element) {
    element.addEventListener('click', function() {
        alert('Adicionado à playlist!'); 
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const playButtons = document.querySelectorAll('.offline-play');

    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioSrc = button.getAttribute('data-audio');
            let audio = document.querySelector(`audio[data-audio="${audioSrc}"]`);

            // Se o elemento de áudio não existir, crie um novo
            if (!audio) {
                audio = document.createElement('audio');
                audio.src = audioSrc;
                audio.setAttribute('data-audio', audioSrc);
                document.body.appendChild(audio);

                // Atualiza a barra de progresso
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

            // Controle da reprodução do áudio
            if (audio.paused) {
                // Pausar todos os outros áudios
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

                // Atualizar ícones de todos os botões para "play"
                playButtons.forEach(btn => {
                    btn.classList.remove('fa-pause-circle');
                    btn.classList.add('fa-play-circle');
                });

                // Tocar o áudio atual e atualizar o ícone para "pause"
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
});

