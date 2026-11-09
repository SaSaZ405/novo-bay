/* ==========================================================
   NOVO-BAY AUTONOMOUS AUDIO MODULE (D07 - FINAL STABLE)
   ========================================================== */
class NovoAutonomousAudio {
    constructor() {
        if (window.D07_instance) return window.D07_instance;
        
        this.tracks = [
            { name: "آوای ملل ۱", src: "trac1.mp3" },
            { name: "آوای ملل ۲", src: "trac2.mp3" },
            { name: "آوای ملل ۳", src: "trac3.mp3" },
            { name: "آوای ملل ۴", src: "trac4.mp3" },
            { name: "آوای ملل ۵", src: "trac5.mp3" },
            { name: "آوای ملل ۶", src: "trac6.mp3" },
            { name: "آوای ملل ۷", src: "trac7.mp3" },
            { name: "آوای ملل ۸", src: "trac8.mp3" },
            { name: "آوای ملل ۹", src: "trac9.mp3" }
        ];
        
        this.currentTrackIndex = parseInt(localStorage.getItem('novo_track_idx') || '0');
        this.loopMode = localStorage.getItem('novo_loop_mode') || 'all';
        
        this.audioElement = new Audio(this.tracks[this.currentTrackIndex].src);
        this.audioElement.volume = parseFloat(localStorage.getItem('novo_vol_state') || '0.8');

        this.audioElement.addEventListener('ended', () => {
            if (this.loopMode === 'one') {
                this.audioElement.play();
            } else if (this.loopMode === 'all') {
                this.playNext();
            }
        });

        window.D07_instance = this;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectComponent());
        } else {
            this.injectComponent();
        }
    }

    injectComponent() {
        const layer = document.getElementById('layer-D07');
        if (!layer) return;

        const currentTrack = this.tracks[this.currentTrackIndex];

        const htmlContent = `
            <!-- پلیر کلاسیک در پایین سمت چپ با بالاترین سطح تعامل -->
            <div class="absolute bottom-4 left-4 interactive-node flex items-center z-50">
                <div class="relative flex items-center gap-2 bg-gray-900/90 backdrop-blur-md text-amber-400 px-3 py-2 rounded-2xl border border-gray-700 shadow-2xl select-none">
                    
                    <!-- دکمه پخش / توقف سریع -->
                    <button id="D07_quickPlayBtn" class="w-8 h-8 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 flex items-center justify-center cursor-pointer transition border border-amber-500/40">
                        <i id="D07_quickPlayIcon" class="fa-solid ${this.audioElement.paused ? 'fa-play' : 'fa-pause'} text-xs"></i>
                    </button>

                    <!-- دکمه ترک بعدی -->
                    <button id="D07_quickNextBtn" class="w-7 h-7 rounded-lg hover:bg-gray-800 text-gray-300 flex items-center justify-center cursor-pointer transition">
                        <i class="fa-solid fa-forward-step text-xs"></i>
                    </button>

                    <!-- عنوان تراک و دکمه ورود به لیست پخش -->
                    <div id="D07_mainBtn" class="flex flex-col cursor-pointer border-r border-gray-700 pr-2.5 mr-1">
                        <span class="text-[9px] text-gray-400 font-bold">NOVO-AUDIO</span>
                        <span id="D07_trackTitleDisplay" class="text-[11px] font-bold text-amber-400 max-w-[90px] truncate">${currentTrack.name}</span>
                    </div>
                </div>
            </div>
        `;

        layer.innerHTML = htmlContent;
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('D07_quickPlayBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePlay();
        });

        document.getElementById('D07_quickNextBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.playNext();
        });

        // کلیک روی بخش عنوان، مستقیماً پنجره لیست پخش را باز می‌کند
        document.getElementById('D07_mainBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.openPlaylistUI();
        });
    }

    openPlaylistUI() {
        let plModal = document.getElementById('D07_playlistModal');
        if (!plModal) {
            const modalHTML = `
                <div id="D07_playlistModal" class="ice-glass-overlay active">
                    <div class="ice-glass-card max-w-[400px] w-[90vw] text-xs">
                        <div class="flex items-center justify-between mb-3 border-b border-slate-300/80 pb-2">
                            <h3 class="text-xs text-slate-900 font-black flex items-center gap-2">
                                <i class="fa-solid fa-list-music text-amber-600"></i> لیست پخش و تنظیمات صوتی
                            </h3>
                            <button onclick="document.getElementById('D07_playlistModal').classList.remove('active')" class="text-slate-500 hover:text-slate-900 cursor-pointer text-sm font-bold p-1">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        
                        <div class="space-y-1.5 max-h-[180px] overflow-y-auto mb-3 p-1" id="D07_trackContainer">
                            ${this.renderTrackList()}
                        </div>

                        <div class="pt-3 border-t border-slate-300/80 space-y-2.5 text-[11px] font-bold text-slate-800">
                            <div class="flex items-center justify-between">
                                <span>حالت تکرار پخش:</span>
                                <select id="D07_loopSelect" onchange="window.D07_instance.changeLoopMode(this.value)" class="bg-white/80 border border-slate-300 rounded-xl px-2.5 py-1 text-[10px] font-bold outline-none text-slate-900 cursor-pointer">
                                    <option value="all" ${this.loopMode === 'all' ? 'selected' : ''}>🔁 تکرار همه آهنگ‌ها</option>
                                    <option value="one" ${this.loopMode === 'one' ? 'selected' : ''}>🔂 تکرار همین آهنگ</option>
                                    <option value="none" ${this.loopMode === 'none' ? 'selected' : ''}>➡️ پخش ترتیبی (بدون تکرار)</option>
                                </select>
                            </div>
                            <div class="flex items-center justify-between gap-2">
                                <span>تنظیم صدا:</span>
                                <input type="range" min="0" max="1" step="0.1" value="${this.audioElement.volume}" oninput="window.D07_instance.setVolume(this.value)" class="w-28 accent-amber-500 cursor-pointer">
                            </div>
                        </div>

                        <div class="mt-4 flex justify-end">
                            <button onclick="document.getElementById('D07_playlistModal').classList.remove('active');" class="btn-ice-glass px-4 py-2 rounded-xl text-[11px]">
                                بستن پنجره
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        } else {
            plModal.classList.add('active');
        }
    }

    renderTrackList() {
        return this.tracks.map((tr, idx) => `
            <div onclick="window.D07_instance.selectTrack(${idx})" class="p-2.5 ${idx === this.currentTrackIndex ? 'bg-amber-100 border-amber-400' : 'bg-white/50'} hover:bg-white/90 rounded-xl cursor-pointer flex justify-between items-center text-[11px] font-bold border border-slate-200 transition">
                <span>${idx + 1}. ${tr.name}</span>
                <i class="fa-solid ${idx === this.currentTrackIndex && !this.audioElement.paused ? 'fa-pause text-amber-600' : 'fa-play text-amber-600'} text-[10px]"></i>
            </div>
        `).join('');
    }

    selectTrack(idx) {
        if (this.currentTrackIndex === idx) {
            this.togglePlay();
        } else {
            this.currentTrackIndex = idx;
            localStorage.setItem('novo_track_idx', idx);
            this.audioElement.src = this.tracks[idx].src;
            this.audioElement.play().catch(e => console.log(e));
        }
        this.updateUI();
    }

    togglePlay() {
        if (this.audioElement.paused) {
            this.audioElement.play().catch(e => console.log(e));
        } else {
            this.audioElement.pause();
        }
        this.updateUI();
    }

    playNext() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        localStorage.setItem('novo_track_idx', this.currentTrackIndex);
        this.audioElement.src = this.tracks[this.currentTrackIndex].src;
        this.audioElement.play().catch(e => console.log(e));
        this.updateUI();
    }

    changeLoopMode(val) {
        this.loopMode = val;
        localStorage.setItem('novo_loop_mode', val);
    }

    setVolume(val) {
        this.audioElement.volume = val;
        localStorage.setItem('novo_vol_state', val);
    }

    updateUI() {
        const playIcon = document.getElementById('D07_quickPlayIcon');
        if (playIcon) {
            playIcon.className = `fa-solid ${this.audioElement.paused ? 'fa-play' : 'fa-pause'} text-xs`;
        }

        const titleDisplay = document.getElementById('D07_trackTitleDisplay');
        if (titleDisplay) {
            titleDisplay.innerText = this.tracks[this.currentTrackIndex].name;
        }

        const container = document.getElementById('D07_trackContainer');
        if (container) {
            container.innerHTML = this.renderTrackList();
        }
    }
}

const novoAudio = new NovoAutonomousAudio();
