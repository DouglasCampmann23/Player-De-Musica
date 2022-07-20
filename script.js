window.onload = () => {

    //Criando o array das músicas ================================
    let allMusics = [
    
        { mName: "That Was Just Your Life", artist: "Metallica", img: "./assets/image/capa_metalica.jpg", src: "./assets/musica/That Was Just Your Life.mp3" },
    
        { mName: "The End of the Line", artist: "Metallica", img: "./assets/image/capa_metalica.jpg", src: "./assets/musica/The End of the Line.mp3" },
    
        { mName: "Broken, Beat & Scarred", artist: "Metallica", img: "./assets/image/capa_metalica.jpg", src: "./assets/musica/Broken, Beat & Scarred.mp3" },
    
        { mName: "The Day That Never Comes", artist: "Metallica", img: "./assets/image/capa_metalica.jpg", src: "./assets/musica/The Day That Never Comes.mp3" }
    ];
    
    //Váriavel para controlar se a música está tocando ou não =======================
    let isPlaying = false;
    
    //Variável para manipular as músicas do array ===================================
    let musicIndex = 0;
    
    //Pegando o elemento para alterar as músicas ====================================
    let music = document.getElementById("music");
    
    //Pegando os elementos que irão mostrar informações da música ==========================
    let musicImg = document.getElementById("musicImg");
    let musicName = document.getElementById("name");
    let musicArtist = document.getElementById("artist");
    
    //Pegando os elementos span que mostram o tempo decorrido e o tempo de duração da música ======================
    let progressTime = document.getElementById("start");
    let musicDuration = document.getElementById("end");
    
    //Transformando os segundos da duração da música em minutos ==================================
    musicDuration.innerHTML = secondsToMinutes(Math.floor(music.duration));
    
    //Pegando a timeline da música e adicionando evento + função para fazer a interatividade =================================
    let timeline = document.getElementById("timeline");
    timeline.addEventListener("click", (e) => {
        let move_progress = e.offsetX / 263;
        music.currentTime = move_progress * music.duration;
    });
    
    //Pegando os botões para adicionar os eventos que farão suas funções =========================
    let btnPrevious = document.getElementById("previous");
    let btnPlay = document.getElementById("play");
    let btnPause = document.getElementById("pause");
    let btnNext = document.getElementById("next");
    
    //Adicionando os eventos ========================================
    music.addEventListener("timeupdate", progressUpdate);
    btnPlay.addEventListener("click", playMusic);
    btnPause.addEventListener("click", pauseMusic);
    
    btnPrevious.addEventListener("click", () => {
        musicIndex--;
        if (musicIndex < 0) {
            musicIndex = 3;
        }
        renderMusic(musicIndex);
    });
    
    btnNext.addEventListener("click", () => {
        musicIndex++;
        if (musicIndex > 3) {
            musicIndex = 0;
        }
        renderMusic(musicIndex);
    });
    
    //Chamo a função renderMusic para, literalmente, renderizar a música ==================================
    renderMusic(musicIndex);
    
    //Criando as funções dos botões ========================================================
    function renderMusic(index) {
        music.setAttribute("src", allMusics[index].src)
        music.addEventListener("loadeddata", () => {
            musicImg.setAttribute("src", allMusics[index].img);
            musicName.innerHTML = allMusics[index].mName;
            musicArtist.innerHTML = allMusics[index].artist;
            musicDuration.innerHTML = secondsToMinutes(Math.floor(music.duration));
    
            if(isPlaying == true) {
                playMusic();
            }
        });
    }
    
    function playMusic() {
        music.play();
        btnPlay.style.display = "none";
        btnPause.style.display = "block";
        isPlaying = true;
    }
    
    function pauseMusic() {
        music.pause();
        btnPause.style.display = "none";
        btnPlay.style.display = "block";
        isPlaying = false;
    }
    
    //Função para atualizar a barra de progresso da música e passar automaticamente pra outra música qnd acabar ==============================
    function progressUpdate() {
        let progressBar = document.getElementById("progressBar");
        progressBar.style.width = (music.currentTime / music.duration) * 100 + "%";
    
        progressTime.innerHTML = secondsToMinutes(Math.floor(music.currentTime));
    
        if(music.currentTime == music.duration) {
            musicIndex++;
            if(musicIndex > 3){
                musicIndex = 0;
            }
            renderMusic(musicIndex);
        }
    }
    
    //Função para converter segundos em minutos ===================================
    function secondsToMinutes(s) {
        let minutes = Math.floor(s / 60);
        let seconds = s % 60;
    
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
    
        return minutes + ":" + seconds;
    }
    }
    