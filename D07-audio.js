/* ==========================================================
   NOVO-BAY AUDIO MANAGEMENT ENGINE (D07)
   GLOBAL BACKGROUND AUDIO EDITION
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
        
        // نام عمومی تگ صوت پس‌زمینه
        this.audioElement = document.getElementById('novoBgAudio');

        if (!this.audioElement) {
            this.audioElement = document.createElement('audio');
            this.audioElement.id = 'novoBgAudio';
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
        window.novoAudioEngine = this;
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
            .audio-glass-modal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.65);
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
                background: rgba(255, 255, 255, 0.94);
                backdrop-filter: blur(20px);
                border-radius: 1.5rem;
                color: #0f172a;
                width: 90%;
                max-width: 440px;
                padding: 1.5rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.35);
                direction: rtl;
                text-align: right;
            }
            .modal-control-btn {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0,0,0,0.05);
                color: #64748b;
                transition: all 0.2s;
            }
            .modal-control-btn:hover {
                background: rgba(245, 158, 11, 0.2);
                color: #0f172a;
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
            <button id="audioInfoBtn" class="audio-info-btn" title="راهنمای صوتی">i</button>
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
                <!-- دکمه‌های کنترلی بالای مودال: برگشت به مرحله قبل + بستن -->
                <div class="absolute top-4 left-4 flex items-center gap-1.5">
                    <button onclick="window.novoAudioEngine.goBackStep()" class="modal-control-btn" title="بازگشت به مرحله قبل">
                        <i class="fas fa-arrow-right text-xs"></i>
                    </button>
                    <button onclick="window.novoAudioEngine.closeInfoModal()" class="modal-control-btn" title="بستن">
                        <i class="fas fa-times text-xs"></i>
                    </button>
                </div>

                <h3 class="text-sm font-bold mb-3 text-slate-900 flex items-center gap-2 pl-16">
                    <i class="fas fa-music text-amber-500"></i> راهنمای جامع پخش صوتی و آوای ملل (NOVO-BAY)
                </h3>
                <p class="text-[11px] text-slate-700 mb-2.5 leading-relaxed">
                    در این بخش، نواها و قطعات موسیقی شاخص از سرزمین‌های مختلف جهان — که زبان‌های آن مناطق در این پلتفرم پشتیبانی می‌شوند — طنین‌انداز می‌گردد.
                </p>
                <p class="text-[11px] text-slate-700 mb-2.5 leading-relaxed">
                    شما آزادانه می‌توانید نوایی خاص را به صورت مکرر بشنوید، اجازه دهید سلسله‌ای از نواها به نوبت نواخته شوند، یا جریان پخش صوتی را در بدو ورود به پلتفرم و یا در هر بخش دلخواه دیگر متوقف سازید.
                </p>
                <p class="text-[11px] text-slate-600 mb-4 leading-relaxed">
                    هدف از ارائه این مجموعه گزیده، صرفاً معرفی اصالت‌های موسیقیایی ملل گوناگون است. چنانچه پیشنهاد ارزنده‌ای در خصوص قطعه‌ای خاص مدنظر دارید، با ما به اشتراک بگذارید؛ در صورت استقبال و فزونی درخواست‌ها، آن را به لیست پخش سراسری اضافه خواهیم کرد.
                </p>
                <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
                    <button onclick="alert('پیشنهاد موسیقی شما ثبت شد. با تشکر!'); window.novoAudioEngine.closeInfoModal();" class="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-xl text-[11px] font-semibold flex items-center gap-1 hover:bg-amber-200 transition">
                        💡 پیشنهاد موسیقی
                    </button>
                    <div class="flex items-center gap-2">
                        <button onclick="window.novoAudioEngine.closeInfoModal()" class="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-xl text-[11px] font-medium hover:bg-slate-300 transition">
                            انصراف
                        </button>
                        <button onclick="window.novoAudioEngine.closeInfoModal()" class="px-4 py-1.5 bg-amber-500 text-white rounded-xl text-[11px] font-bold shadow hover:bg-amber-600 transition">
                            OK (ورود به لیست پخش)
                        </button>
                    </div>
                </div>
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

    goBackStep() {
        // بازگشت به مرحله قبل (بستن مودال و برگشت به پلیر)
        this.closeInfoModal();
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
        const classicIcon = document.getElementById('audioPlayIcon');
        const title = document.getElementById('audioTrackTitle');
        if (classicIcon) {
            classicIcon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
        if (title) {
            title.innerText = `Track ${this.currentTrackIndex + 1} / 9`;
        }

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
