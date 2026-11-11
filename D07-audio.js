/* ==========================================================
   NOVO-BAY AUDIO MANAGEMENT ENGINE (D07)
   ========================================================== */

class NovoAudioEngine {
    constructor() {
        // لیست کامل ۹ ترک صوتی پروژه
        this.tracks = [
            'trac1.mp3', 'trac2.mp3', 'trac3.mp3', 
            'trac4.mp3', 'trac5.mp3', 'trac6.mp3', 
            'trac7.mp3', 'trac8.mp3', 'trac9.mp3'
        ];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.audioElement = document.getElementById('christmasBgAudio');

        if (!this.audioElement) {
            this.audioElement = document.createElement('audio');
            this.audioElement.id = 'christmasBgAudio';
            this.audioElement.loop = true;
            document.body.appendChild(this.audioElement);
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.injectAudioStyles();
        this.renderMiniClassicPlayer();
        this.bindEvents();
    }

    injectAudioStyles() {
        if (document.getElementById('novo-audio-styles')) return;
        const style = document.createElement('style');
        style.id = 'novo-audio-styles';
        style.innerHTML = `
            .classic-mini-player {
                position: fixed;
                bottom: 55px;
                left: 15px;
                z-index: 99998;
                background: rgba(15, 23, 42, 0.88);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(245, 158, 11, 0.4);
                border-radius: 9999px;
                padding: 6px 14px;
                display: flex;
                align-items: center;
                gap: 10px;
                color: #f8fafc;
                font-size: 11px;
                box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
                direction: ltr;
            }
            .classic-mini-player button {
                background: none;
                border: none;
                color: #f59e0b;
                cursor: pointer;
                font-size: 13px;
                padding: 2px 4px;
                transition: transform 0.2s;
            }
            .classic-mini-player button:hover {
                transform: scale(1.15);
                color: #fff;
            }
        `;
        document.head.appendChild(style);
    }

    renderMiniClassicPlayer() {
        if (document.getElementById('classicMiniPlayer')) return;

        const playerDiv = document.createElement('div');
        playerDiv.id = 'classicMiniPlayer';
        playerDiv.className = 'classic-mini-player';
        playerDiv.innerHTML = `
            <button id="audioPrevBtn" title="آهنگ قبلی"><i class="fas fa-backward-step"></i></button>
            <button id="audioPlayToggleBtn" title="پخش / توقف"><i class="fas fa-play" id="audioPlayIcon"></i></button>
            <button id="audioNextBtn" title="آهنگ بعدی"><i class="fas fa-forward-step"></i></button>
            <span id="audioTrackTitle" class="font-mono text-[10px] text-amber-300 max-w-[110px] truncate">Track 1 / 9</span>
        `;
        document.body.appendChild(playerDiv);

        document.getElementById('audioPlayToggleBtn').onclick = () => this.togglePlay();
        document.getElementById('audioNextBtn').onclick = () => this.nextTrack();
        document.getElementById('audioPrevBtn').onclick = () => this.prevTrack();
    }

    togglePlay() {
        if (this.audioElement.paused) {
            if (!this.audioElement.src || this.audioElement.src === '') {
                this.audioElement.src = this.tracks[this.currentTrackIndex];
            }
            this.audioElement.play().then(() => {
                this.isPlaying = true;
                this.updateUIState();
            }).catch(e => console.log(e));
        } else {
            this.audioElement.pause();
            this.isPlaying = false;
            this.updateUIState();
        }
    }

    nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.playCurrentTrack();
    }

    prevTrack() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        this.playCurrentTrack();
    }

    playCurrentTrack() {
        this.audioElement.src = this.tracks[this.currentTrackIndex];
        this.audioElement.play().then(() => {
            this.isPlaying = true;
            this.updateUIState();
        }).catch(e => console.log(e));
    }

    updateUIState() {
        const icon = document.getElementById('audioPlayIcon');
        const title = document.getElementById('audioTrackTitle');
        if (icon) {
            icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
        if (title) {
            title.innerText = `Track ${this.currentTrackIndex + 1} / 9`;
        }

        const headerAudioBtn = document.getElementById('headerAudioToggleBtn');
        if (headerAudioBtn) {
            headerAudioBtn.innerHTML = this.isPlaying ? '<i class="fas fa-volume-high text-emerald-400"></i>' : '<i class="fas fa-volume-xmark text-red-400"></i>';
        }
    }

    bindEvents() {
        this.audioElement.onended = () => this.nextTrack();
    }
}

const novoAudioEngine = new NovoAudioEngine();
