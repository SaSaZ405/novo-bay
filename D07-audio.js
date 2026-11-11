/* ==========================================================
   NOVO-BAY AUDIO MANAGEMENT ENGINE (D07)
   ========================================================== */

class NovoAudioEngine {
    constructor() {
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
        window.novoAudioEngine = this; // ثبت سراسری برای ارتباط با هدر
        this.injectAudioStyles();
        this.renderMiniClassicPlayer();
        this.renderInfoModal();
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
                background: rgba(15, 23, 42, 0.9);
                backdrop-filter: blur(14px);
                border: 1px solid rgba(245, 158, 11, 0.5);
                border-radius: 9999px;
                padding: 6px 14px;
                display: flex;
                align-items: center;
                gap: 10px;
                color: #f8fafc;
                font-size: 11px;
                box-shadow: 0 10px 25px -5px rgba(0,0,0,0.6);
                direction: ltr;
            }
            .classic-mini-player button {
                background: none;
                border: none;
                color: #f59e0b;
                cursor: pointer;
                font-size: 13px;
                padding: 2px 5px;
                transition: transform 0.2s, color 0.2s;
            }
            .classic-mini-player button:hover {
                transform: scale(1.15);
                color: #fff;
            }
            .audio-info-btn {
                background: rgba(245, 158, 11, 0.15) !important;
                border: 1px solid rgba(245, 158, 11, 0.4) !important;
                border-radius: 50% !important;
                width: 22px;
                height: 22px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px !important;
                font-weight: bold;
            }
            /* مودال شیشه‌ای اطلاعات */
            .audio-glass-modal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(12px);
                z-index: 100000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .audio-glass-modal.active {
                opacity: 1;
                visibility: visible;
            }
            .audio-glass-card {
                background: rgba(255, 255, 255, 0.92);
                backdrop-filter: blur(20px);
                border-radius: 1.5rem;
                color: #0f172a;
                width: 90%;
                max-width: 420px;
                padding: 1.5rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                direction: rtl;
                text-align: right;
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
            <button id="audioInfoBtn" class="audio-info-btn" title="اطلاعات و جزئیات پلیر">i</button>
            <button id="audioPrevBtn" title="آهنگ قبلی"><i class="fas fa-backward-step"></i></button>
            <button id="audioPlayToggleBtn" title="پخش / توقف"><i class="fas fa-play" id="audioPlayIcon"></i></button>
            <button id="audioNextBtn" title="آهنگ بعدی"><i class="fas fa-forward-step"></i></button>
            <span id="audioTrackTitle" class="font-mono text-[10px] text-amber-300 max-w-[100px] truncate">Track 1 / 9</span>
        `;
        document.body.appendChild(playerDiv);

        document.getElementById('audioPlayToggleBtn').onclick = () => this.togglePlay();
        document.getElementById('audioNextBtn').onclick = () => this.nextTrack();
        document.getElementById('audioPrevBtn').onclick = () => this.prevTrack();
        document.getElementById('audioInfoBtn').onclick = () => this.openInfoModal();
    }

    renderInfoModal() {
        if (document.getElementById('audioInfoModal')) return;

        const modalDiv = document.createElement('div');
        modalDiv.id = 'audioInfoModal';
        modalDiv.className = 'audio-glass-modal';
        modalDiv.innerHTML = `
            <div class="audio-glass-card relative">
                <button onclick="window.novoAudioEngine.closeInfoModal()" class="absolute top-4 left-4 text-slate-400 hover:text-slate-800">
                    <i class="fas fa-times text-lg"></i>
                </button>
                <h3 class="text-base font-bold mb-2 text-slate-900 flex items-center gap-2">
                    <i class="fas fa-compact-disc text-amber-500"></i> راهنمای صوتی نوو-بی (Audio Matrix)
                </h3>
                <p class="text-xs text-slate-600 mb-3 leading-relaxed">
                    <strong>توضیحات کوتاه:</strong> این پلیر به صورت کاملاً مستقل و شناور در تمامی بخش‌های ماتریکس فعال است و مدیریت ۹ ترک صوتی فستیوال زمستانی را بر عهده دارد.
                </p>
                <div class="bg-slate-100 p-2.5 rounded-xl text-[11px] text-slate-700 mb-4 leading-relaxed border border-slate-200">
                    <strong>توضیحات مفصل:</strong> با استفاده از دکمه‌های کنترل جلو و عقب، می‌توانید بین ۹ ترک صوتی جابجا شوید. همچنین دکمه مستقل هدر و پلیر کلاسیک پایین صفحه به صورت دوطرفه با یکدیگر همگام شده‌اند تا وضعیت پخش صدا در هر نقطه از پلتفرم به سادگی کنترل شود.
                </div>
                <button onclick="window.novoAudioEngine.closeInfoModal()" class="w-full py-2 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md hover:bg-amber-600 transition">
                    متوجه شدم
                </button>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }

    openInfoModal() {
        const modal = document.getElementById('audioInfoModal');
        if (modal) modal.classList.add('active');
    }

    closeInfoModal() {
        const modal = document.getElementById('audioInfoModal');
        if (modal) modal.classList.remove('active');
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
        // به‌روزرسانی آیکون پلیر کلاسیک پایین
        const classicIcon = document.getElementById('audioPlayIcon');
        const title = document.getElementById('audioTrackTitle');
        if (classicIcon) {
            classicIcon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
        if (title) {
            title.innerText = `Track ${this.currentTrackIndex + 1} / 9`;
        }

        // به‌روزرسانی آیکون مستقل هدر
        const headerIcon = document.getElementById('headerPlayIcon');
        if (headerIcon) {
            headerIcon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }

    bindEvents() {
        this.audioElement.onended = () => this.nextTrack();
    }
}

const novoAudioEngine = new NovoAudioEngine();
