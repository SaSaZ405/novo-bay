/* ==========================================================
   NOVO-BAY INDEPENDENT AUDIO MODULE (C07 / D07)
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
            this.audioElement.play().catch(e => console.log("Audio play restricted:", e));
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
}

const novoAudio = new NovoAudioPlayer();
