const firebaseConfig = {
    apiKey: "AIzaSyBxeojTNCiYrye6uLNAAODwCmbSlAwk24o",
    authDomain: "mmetem-site.firebaseapp.com",
    databaseURL: "https://mmetem-site-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mmetem-site",
    storageBucket: "mmetem-site.firebasestorage.app",
    messagingSenderId: ""776758318533",
    appId: "1:776758318533:web:705e4428be09137348e7ac"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

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
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');

function updateVolumeIcon(vol) {
    if (vol == 0) {
        volumeIcon.textContent = "🔇";
    } else if (vol < 75) {
        volumeIcon.textContent = "🔉";
    } else {
        volumeIcon.textContent = "🔊";
    }
}

function updateSliderBackground(vol, isActive = false) {
    const slider = volumeSlider;
    const percent = vol;

    // Dolan kısım renkleri
    // normal hover değilken beyaz
    // aktif (basılıyken) kırmızı
    const fillColor = isActive ? "red" : "white";

    // CSS linear-gradient ile dolan kısım belirleniyor
    slider.style.background = `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${percent}%, #555 ${percent}%, #555 100%)`;
}

volumeSlider.addEventListener('input', function() {
    const vol = parseInt(this.value, 10);
    music.volume = vol / 100;
    updateVolumeIcon(vol);
    updateSliderBackground(vol, false);
});

// Mouse basılı tutma olayları
volumeSlider.addEventListener('mousedown', function() {
    updateSliderBackground(parseInt(this.value, 10), true);
});
volumeSlider.addEventListener('mouseup', function() {
    updateSliderBackground(parseInt(this.value, 10), false);
});

// Fare slider dışına çıkarsa da aktifliği kaldırmak için:
volumeSlider.addEventListener('mouseleave', function() {
    updateSliderBackground(parseInt(this.value, 10), false);
});

// Başlangıç ayarları
const initialVol = parseInt(volumeSlider.value, 10);
music.volume = initialVol / 100;
updateVolumeIcon(initialVol);
updateSliderBackground(initialVol, false);



let visitorID = localStorage.getItem("visitor_id");
if (!visitorID) {
  visitorID = "user-" + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("visitor_id", visitorID);
}

let visitCount = parseInt(localStorage.getItem("visit_count")) || 0;
visitCount++;
localStorage.setItem("visit_count", visitCount);

const lastVisit = new Date().toISOString();
localStorage.setItem("last_visit", lastVisit);

const userAgent = navigator.userAgent;

let browserName = "Bilinmiyor";
if (userAgent.includes("Chrome")) browserName = "Chrome";
else if (userAgent.includes("Firefox")) browserName = "Firefox";
else if (userAgent.includes("Safari")) browserName = "Safari";
else if (userAgent.includes("Edge")) browserName = "Edge";

let os = "Bilinmiyor";
if (userAgent.includes("Windows")) os = "Windows";
else if (userAgent.includes("Android")) os = "Android";
else if (userAgent.includes("iPhone")) os = "iOS";
else if (userAgent.includes("Mac OS")) os = "Mac OS";

let deviceType = "Masaüstü";
if (/Mobi|Android/i.test(userAgent)) deviceType = "Mobil";

const deviceData = {
  id: visitorID,
  visits: visitCount,
  lastVisit: lastVisit,
  browser: browserName,
  os: os,
  deviceType: deviceType,
  screen: screen.width + "x" + screen.height,
  language: navigator.language,
  timestamp: new Date().toISOString()
};

db.ref("visitors/" + visitorID + "_" + Date.now()).set(deviceData);
