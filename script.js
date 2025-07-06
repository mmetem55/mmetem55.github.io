const playlist = [
    {
        title: "Bombalar Hedef Bulur",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-bombalar-hedef-bulur.mp3",
        cover: "sarki-coverlari/seremoni-efendisi.webp",
        link: "https://open.spotify.com/intl-tr/track/5o0nTtYFdFSrXAmw4dS2cI?si=895c9f8480dc4d88"
    },
    {
        title: "Bench Press",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-bench-press.mp3",
        cover: "sarki-coverlari/bench-press.webp",
        link: "https://open.spotify.com/intl-tr/track/70thVzLyyitZtPKcI4RAzQ?si=dba5cc0c2b444716"
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
        cover: "sarki-coverlari/dum-taka-dum.webp",
        link: "https://open.spotify.com/intl-tr/track/27kzvdLZ24iFRntK1Sveoo?si=6dedec1900434421"
    },
    {
        title: "180km",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-180km.mp3",
        cover: "sarki-coverlari/180km.webp",
        link: "https://open.spotify.com/intl-tr/track/3zSH3vqxECDQMZdVuRiyG9?si=2d8d2ffb694749f8"
    },
    {
        title: "Ağır Roman",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-ağır-roman.mp3",
        cover: "sarki-coverlari/ağır-roman.webp",
        link: "https://open.spotify.com/intl-tr/track/4Q6TWuCGjt9qdZfXQyDOqd?si=93dac02657124d14"
    },
    {
        title: "Ne",
        artist: "Sansar Salvo",
        src: "sarkilar/sansar-salvo-ne.mp3",
        cover: "sarki-coverlari/ne.webp",
        link: "https://open.spotify.com/intl-tr/track/2UGtM5MB4yzrmGrqfvmTru?si=57db272239604a0d"
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
    if (track.link) {
        musicSong.innerHTML = `<a href="${track.link}" target="_blank" style="color: #ccc; text-decoration: none;">${track.title}</a>`;
    } else {
        musicSong.textContent = track.title;
    }
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
