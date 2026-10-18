// C07-audio-media-controller.js - کنترلر هوشمند پخش موسیقی نووبی

// لیست موزیک‌های بی‌کلام شاخص ایران و جهان (لینک‌های مستقیم نمونه)
const playlist = [
    { title: "روز برفی (مجید انتظامی)", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "شب‌های زاینده‌رود (بی‌کلام)", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Experience (Ludovico Einaudi)", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Nostalgia (Yanni)", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
];

let currentTrackIndex = 0;
const audioPlayer = new Audio(playlist[0].src);
audioPlayer.loop = true;

// تابع پخش و توقف
function toggleAudio() {
    const audioStatus = document.getElementById('audioStatus');
    const playIcon = document.getElementById('playIcon');

    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            if (audioStatus) audioStatus.innerText = "در حال پخش...";
            if (playIcon) playIcon.className = "fa-solid fa-pause text-amber-600";
        }).catch(err => console.log("خطای پخش موسیقی:", err));
    } else {
        audioPlayer.pause();
        if (audioStatus) audioStatus.innerText = "پخش موزیک";
        if (playIcon) playIcon.className = "fa-solid fa-play text-amber-600";
    }
}

// تغییر موزیک از لیست کشویی
function changeTrack(index) {
    currentTrackIndex = parseInt(index);
    const wasPlaying = !audioPlayer.paused;
    
    audioPlayer.src = playlist[currentTrackIndex].src;
    
    if (wasPlaying) {
        audioPlayer.play();
    }
}
