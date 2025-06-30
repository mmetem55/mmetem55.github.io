const playlist = [
    {
        title: "Bombalar Hedef Bulur",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-bombalar-hedef-bulur.mp3",
        cover: "sarki-coverlari/seremoni-efendisi.webp"
    },
    {
        title: "Bench Press",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-bench-press.mp3",
        cover: "sarki-coverlari/bench-press.webp"
    },
    {
        title: "34 Dramı x Auditorium",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-34-dramı-x-auditorium.mp3",
        cover: "sarki-coverlari/34-dramı-x-auditorium.webp"
    },
    {
        title: "Dum Taka Dum",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-dum-taka-dum.mp3",
        cover: "sarki-coverlari/dum-taka-dum.webp"
    },
    {
        title: "180km",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-180km.mp3",
        cover: "sarki-coverlari/180km.webp"
    },
    {
        title: "Ağır Roman",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-ağır-roman.mp3",
        cover: "sarki-coverlari/ağır-roman.webp"
    },
    {
        title: "Ne",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-ne.mp3",
        cover: "sarki-coverlari/ne.webp"
    }
];

let currentTrack = 0;
let isPlaying = true;

const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.querySelector('.music-icon');
const musicTitle = document.querySelector('.music-title');
const musicSong = document.querySelector('.music-song');

function loadTrack(index) {
    const track = playlist[index];
    music.src = track.src;
    musicIcon.src = track.cover;
    musicTitle.textContent = track.artist;
    musicSong.textContent = track.title;
    music.play();
    isPlaying = true;
    musicBtn.textContent = '⏸';
}

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicBtn.textContent = '▶︎';
    } else {
        music.play();
        musicBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

function nextSong() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
}

function prevSong() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
}

function startSite() {
    document.querySelector('.overlay').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('bgVideo').play();
    document.getElementById('musicBtn').addEventListener('click', toggleMusic);
    document.getElementById('prevBtn').addEventListener('click', prevSong);
    document.getElementById('nextBtn').addEventListener('click', nextSong);
    music.volume = 0.8;
    loadTrack(currentTrack);
}

music.addEventListener('ended', nextSong);

// Space tuşu ile oynat/duraklat kontrolü
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        e.preventDefault();
        toggleMusic();
    }
});
