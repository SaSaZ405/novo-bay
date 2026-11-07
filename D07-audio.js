/* ==========================================================
   NOVO-BAY AUDIO CONTROLLER MODULE (D07)
   ========================================================== */
class NovoAudioPlayer {
    constructor() {
        this.tracks = ['trac1.mp3', 'trac2.mp3', 'trac3.mp3', 'trac4.mp3', 'trac5.mp3', 'trac6.mp3', 'trac7.mp3', 'trac8.mp3', 'trac9.mp3'];
        this.currentTrackIndex = 0;
        this.audioElement = new Audio(this.tracks[this.currentTrackIndex]);
        this.audioElement.loop = false;
        
        this.audioElement.addEventListener('ended', () => {
            this.playNext();
        });
    }

    togglePlay() {
        if (this.audioElement.paused) {
            this.audioElement.play().catch(e => console.log("Audio autoplay restricted:", e));
            return true;
        } else {
            this.audioElement.pause();
            return false;
        }
    }

    playNext() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.audioElement.src = this.tracks[this.currentTrackIndex];
        this.audioElement.play();
    }

    setVolume(val) {
        this.audioElement.volume = val;
    }
}

// راه‌اندازی نمونه سراسری صوت
const novoAudio = new NovoAudioPlayer();

// تابع ثبت پیشنهاد موسیقی کاربر
function submitUserMusicSuggestion() {
    const inputField = document.getElementById('musicSuggestionInput');
    if (inputField && inputField.value.trim() !== "") {
        const suggestion = inputField.value.trim();
        // ذخیره موقت یا ارسال (در اینجا به عنوان نمونه ثبت در کانسول و تایید به کاربر)
        console.log("User Music Suggestion Registered:", suggestion);
        alert("پیشنهاد ارزشمند شما ثبت شد. از همراهی شما سپاسگزاریم! 🎶");
        inputField.value = "";
    } else {
        alert("لطفاً نام یا لینک موسیقی مورد نظر خود را وارد کنید.");
    }
}
