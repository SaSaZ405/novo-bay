/* ==========================================================
   NOVO-BAY INDEPENDENT AUDIO MODULE (C07-audio.js)
   Layer: C07-audio-module
   ========================================================== */
class C07AudioEngine {
    constructor() {
        this.tracks = ['trac1.mp3', 'trac2.mp3', 'trac3.mp3', 'trac4.mp3', 'trac5.mp3', 'trac6.mp3', 'trac7.mp3', 'trac8.mp3', 'trac9.mp3'];
        this.currentIndex = 0;
        this.player = new Audio(this.tracks[this.currentIndex]);
        this.player.loop = false;

        this.player.addEventListener('ended', () => {
            this.playNext();
        });
    }

    togglePlay() {
        if (this.player.paused) {
            this.player.play().catch(e => console.log("C07 Audio autoplay prevented:", e));
        } else {
            this.player.pause();
        }
    }

    playNext() {
        this.currentIndex = (this.currentIndex + 1) % this.tracks.length;
        this.player.src = this.tracks[this.currentIndex];
        this.player.play();
    }
}

// ایجاد نمونه مستقل از چرخ‌دنده صوتی C07
const c07Audio = new C07AudioEngine();
