/* ==========================================================
   NOVO-BAY AUDIO ENGINE (D07 - Clean & Optimized)
   ========================================================== */

class NovoAudioEngine {
    constructor() {
        this.tracks = ['trac1.mp3', 'trac2.mp3', 'trac3.mp3', 'trac4.mp3', 'trac5.mp3', 'trac6.mp3', 'trac7.mp3', 'trac8.mp3', 'trac9.mp3'];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        
        this.audioElement = document.getElementById('novoPlayerAudio');
        if (!this.audioElement) {
            this.audioElement = document.createElement('audio');
            this.audioElement.id = 'novoPlayerAudio';
            this.audioElement.preload = 'auto';
            this.audioElement.loop = false;
            document.body.appendChild(this.audioElement);
        }

        document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => this.init()) : this.init();
    }

    init() {
        window.novoAudioEngine = this;
        this.injectStyles();
        this.renderPlayer();
        this.renderModals();
        this.audioElement.onended = () => this.nextTrack();
    }

    injectStyles() {
        if (document.getElementById('novo-audio-styles')) return;
        const style = document.createElement('style');
        style.id = 'novo-audio-styles';
        style.innerHTML = `
            .classic-mini-player {
                position: fixed; bottom: 55px; left: 15px; z-index: 99998;
                background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(14px);
                border: 1px solid rgba(245, 158, 11, 0.5); border-radius: 9999px;
                padding: 6px 14px; display: flex; align-items: center; gap: 10px;
                color: #f8fafc; font-size: 11px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.6); direction: ltr;
            }
            .classic-mini-player button {
                background: none; border: none; color: #f59e0b; cursor: pointer;
                font-size: 13px; padding: 2px 5px; transition: transform 0.2s, color 0.2s;
            }
            .classic-mini-player button:hover { transform: scale(1.15); color: #fff; }
            .audio-info-btn {
                background: rgba(245, 158, 11, 0.15) !important; border: 1px solid rgba(245, 158, 11, 0.4) !important;
                border-radius: 50% !important; width: 22px; height: 22px; display: flex;
                align-items: center; justify-content: center; font-size: 10px !important; font-weight: bold;
            }
            .audio-glass-modal {
                position: fixed; inset: 0; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(12px);
                z-index: 100000; display: flex; align-items: center; justify-content: center;
                opacity: 0; visibility: hidden; transition: all 0.3s ease;
            }
            .audio-glass-modal.active { opacity: 1; visibility: visible; }
            .audio-glass-card {
                background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);
                border-radius: 1.5rem; color: #0f172a; width: 90%; max-width: 440px;
                padding: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.35); direction: rtl; text-align: right;
            }
            .modal-control-btn {
                width: 28px; height: 28px; border-radius: 50%; display: flex;
                align-items: center; justify-content: center; background: rgba(0,0,0,0.05);
                color: #64748b; transition: all 0.2s;
            }
            .modal-control-btn:hover { background: rgba(245, 158, 11, 0.2); color: #0f172a; }
            .novo-input-field {
                width: 100%; background: rgba(241, 245, 249, 0.8);
                border: 1px solid rgba(203, 213, 225, 0.8); border-radius: 0.75rem;
                padding: 0.5rem 0.75rem; font-size: 11px; color: #0f172a; outline: none; transition: border-color 0.2s;
            }
            .novo-input-field:focus { border-color: #f59e0b; background: #fff; }
        `;
        document.head.appendChild(style);
    }

    renderPlayer() {
        if (document.getElementById('classicMiniPlayer')) return;
        const div = document.createElement('div');
        div.id = 'classicMiniPlayer';
        div.className = 'classic-mini-player';
        div.innerHTML = `
            <button id="audioInfoBtn" class="audio-info-btn" title="راهنمای صوتی">i</button>
            <button id="audioPrevBtn" title="آهنگ قبلی"><i class="fas fa-backward-step"></i></button>
            <button id="audioPlayToggleBtn" title="پخش / توقف"><i class="fas fa-play" id="audioPlayIcon"></i></button>
            <button id="audioNextBtn" title="آهنگ بعدی"><i class="fas fa-forward-step"></i></button>
            <span id="audioTrackTitle" class="font-mono text-[10px] text-amber-300 max-w-[100px] truncate">Track 1 / 9</span>
        `;
        document.body.appendChild(div);

        document.getElementById('audioPlayToggleBtn').onclick = () => this.togglePlay();
        document.getElementById('audioNextBtn').onclick = () => this.nextTrack();
        document.getElementById('audioPrevBtn').onclick = () => this.prevTrack();
        document.getElementById('audioInfoBtn').onclick = () => this.openInfoModal();
    }

    renderModals() {
        if (!document.getElementById('audioInfoModal')) {
            const infoDiv = document.createElement('div');
            infoDiv.id = 'audioInfoModal';
            infoDiv.className = 'audio-glass-modal';
            infoDiv.innerHTML = `
                <div class="audio-glass-card relative">
                    <div class="absolute top-4 left-4 flex items-center gap-1.5">
                        <button onclick="window.novoAudioEngine.closeInfoModal()" class="modal-control-btn" title="بستن">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>
                    <h3 class="text-sm font-bold mb-3 text-slate-900 flex items-center gap-2 pl-12">
                        <i class="fas fa-music text-amber-500"></i> راهنمای آوای ملل (پلیر اختصاصی)
                    </h3>
                    <p class="text-[11px] text-slate-700 mb-3 leading-relaxed">
                        این بخش مختص پخش قطعات گزیده از سراسر جهان است. می‌توانید ترک‌ها را به دلخواه عوض کنید و در طول حضور در پلتفرم بشنوید.
                    </p>
                    <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
                        <button onclick="window.novoAudioEngine.openSuggestionModal()" class="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-xl text-[11px] font-semibold hover:bg-amber-200 transition">
                            💡 پیشنهاد موسیقی
                        </button>
                        <button onclick="window.novoAudioEngine.closeInfoModal()" class="px-4 py-1.5 bg-amber-500 text-white rounded-xl text-[11px] font-bold shadow hover:bg-amber-600 transition">
                            متوجه شدم
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(infoDiv);
        }

        if (!document.getElementById('audioSuggestionModal')) {
            const sugDiv = document.createElement('div');
            sugDiv.id = 'audioSuggestionModal';
            sugDiv.className = 'audio-glass-modal';
            sugDiv.innerHTML = `
                <div class="audio-glass-card relative">
                    <div class="absolute top-4 left-4 flex items-center gap-1.5">
                        <button onclick="window.novoAudioEngine.openInfoModal()" class="modal-control-btn" title="بازگشت به راهنما">
                            <i class="fas fa-arrow-right text-xs"></i>
                        </button>
                        <button onclick="window.novoAudioEngine.closeSuggestionModal()" class="modal-control-btn" title="بستن">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>
                    <h3 class="text-sm font-bold mb-2 text-slate-900 flex items-center gap-2 pl-16">
                        <i class="fas fa-lightbulb text-amber-500"></i> ثبت پیشنهاد قطعه موسیقی
                    </h3>
                    <div class="space-y-2.5 my-3">
                        <div>
                            <label class="block text-[10px] font-semibold text-slate-700 mb-1">نام قطعه:</label>
                            <input type="text" id="sugTrackName" class="novo-input-field" placeholder="نام قطعه...">
                        </div>
                        <div>
                            <label class="block text-[10px] font-semibold text-slate-700 mb-1">خواننده / گروه:</label>
                            <input type="text" id="sugArtistName" class="novo-input-field" placeholder="نام هنرمند...">
                        </div>
                    </div>
                    <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                        <button onclick="window.novoAudioEngine.closeSuggestionModal()" class="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-xl text-[11px]">انصراف</button>
                        <button onclick="window.novoAudioEngine.submitSuggestion()" class="px-4 py-1.5 bg-amber-500 text-white rounded-xl text-[11px] font-bold shadow">ارسال پیشنهاد</button>
                    </div>
                </div>
            `;
            document.body.appendChild(sugDiv);
        }
    }

    openInfoModal() {
        document.getElementById('audioSuggestionModal')?.classList.remove('active');
        document.getElementById('audioInfoModal')?.classList.add('active');
    }

    closeInfoModal() {
        document.getElementById('audioInfoModal')?.classList.remove('active');
    }

    openSuggestionModal() {
        document.getElementById('audioInfoModal')?.classList.remove('active');
        document.getElementById('audioSuggestionModal')?.classList.add('active');
    }

    closeSuggestionModal() {
        document.getElementById('audioSuggestionModal')?.classList.remove('active');
    }

    submitSuggestion() {
        const name = document.getElementById('sugTrackName').value.trim();
        if (!name) { alert('لطفاً نام قطعه را وارد کنید.'); return; }
        alert(`پیشنهاد "${name}" با موفقیت ثبت شد.`);
        document.getElementById('sugTrackName').value = '';
        document.getElementById('sugArtistName').value = '';
        this.closeSuggestionModal();
    }

    togglePlay() {
        if (this.audioElement.paused) {
            if (!this.audioElement.src || this.audioElement.src.endsWith('/')) {
                this.audioElement.src = this.tracks[this.currentTrackIndex];
            }
            this.audioElement.play().then(() => {
                this.isPlaying = true;
                this.updateUI();
            }).catch(e => console.log(e));
        } else {
            this.audioElement.pause();
            this.isPlaying = false;
            this.updateUI();
        }
    }

    nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.playCurrent();
    }

    prevTrack() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        this.playCurrent();
    }

    playCurrent() {
        this.audioElement.src = this.tracks[this.currentTrackIndex];
        this.audioElement.play().then(() => {
            this.isPlaying = true;
            this.updateUI();
        }).catch(e => console.log(e));
    }

    updateUI() {
        const icon = document.getElementById('audioPlayIcon');
        const title = document.getElementById('audioTrackTitle');
        if (icon) icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        if (title) title.innerText = `Track ${this.currentTrackIndex + 1} / 9`;
    }
}

const novoAudioEngine = new NovoAudioEngine();
