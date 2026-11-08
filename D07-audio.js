/* ==========================================================
   NOVO-BAY AUTONOMOUS AUDIO MODULE (D07 - CLASSIC CONTROLLER & LOOP ALL)
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
        this.loopMode = localStorage.getItem('novo_loop_mode') || 'all'; // 'one', 'all', 'none'
        
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

        const styleFix = document.createElement('style');
        styleFix.innerHTML = `
            .ice-glass-overlay { pointer-events: auto !important; }
            .interactive-node { pointer-events: auto !important; }
        `;
        document.head.appendChild(styleFix);

        const currentTrack = this.tracks[this.currentTrackIndex];

        const htmlContent = `
            <!-- پلیر کلاسیک در پایین سمت چپ -->
            <div class="absolute bottom-4 left-4 interactive-node flex items-center">
                <div class="relative flex items-center gap-2 bg-gray-900/85 backdrop-blur-md text-amber-400 px-3 py-2 rounded-2xl border border-gray-700 shadow-2xl select-none">
                    
                    <!-- دکمه پخش / توقف سریع -->
                    <button id="D07_quickPlayBtn" class="w-8 h-8 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 flex items-center justify-center cursor-pointer transition border border-amber-500/40">
                        <i id="D07_quickPlayIcon" class="fa-solid ${this.audioElement.paused ? 'fa-play' : 'fa-pause'} text-xs"></i>
                    </button>

                    <!-- دکمه تراک بعدی -->
                    <button id="D07_quickNextBtn" class="w-7 h-7 rounded-lg hover:bg-gray-800 text-gray-300 flex items-center justify-center cursor-pointer transition">
                        <i class="fa-solid fa-forward-step text-xs"></i>
                    </button>

                    <!-- عنوان تراک و دکمه ورود به راهنما -->
                    <div id="D07_mainBtn" class="flex flex-col cursor-pointer border-r border-gray-700 pr-2.5 mr-1">
                        <span class="text-[9px] text-gray-400 font-bold">NOVO-AUDIO</span>
                        <span id="D07_trackTitleDisplay" class="text-[11px] font-bold text-amber-400 max-w-[90px] truncate">${currentTrack.name}</span>
                    </div>

                    <!-- معرفی کوچک -->
                    <div id="D07_tooltip" class="hidden absolute bottom-14 left-0 bg-white/90 backdrop-blur-md text-slate-900 border border-white text-[10px] font-bold py-1 px-2.5 rounded-xl whitespace-nowrap shadow-xl pointer-events-none">
                        آوای ملل 🎵 (ضربه بعدی: راهنمای جامع)
                    </div>
                </div>
            </div>

            <!-- تم توضیحات اصلی -->
            <div id="D07_mainModal" class="ice-glass-overlay">
                <div class="ice-glass-card text-xs leading-relaxed max-w-[420px] w-[90vw]">
                    <div class="flex items-center justify-between mb-3 border-b border-slate-300/80 pb-2">
                        <h3 class="text-xs text-slate-900 flex items-center gap-2 font-black">
                            <i class="fa-solid fa-music text-amber-600"></i>
                            راهنمای جامع پخش صوتی و آوای ملل (NOVO-BAY)
                        </h3>
                        <button id="D07_closeMain" class="text-slate-500 hover:text-slate-900 cursor-pointer text-sm font-bold p-1">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-2 text-[11px] text-slate-800 font-bold leading-relaxed">
                        <p>در این بخش، نواها و قطعات موسیقی شاخص از سرزمین‌های مختلف جهان طنین‌انداز می‌گردد.</p>
                        <p>شما آزادانه‌ می‌توانید نوایی خاص را به‌صورت مکرر بشنوید، اجازه دهید سلسله‌ای از نواها به‌نوبت نواخته شوند، یا جریان پخش صوتی را متوقف سازید.</p>
                        <p class="text-slate-700 bg-white/60 p-2 rounded-xl border border-white">هدف از ارائه‌ی این مجموعه‌ی گزیده، صرفاً معرفی اصالت‌های موسیقایی ملل گوناگون است.</p>
                    </div>

                    <div class="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-slate-300/80">
                        <button id="D07_openSugBtn" class="btn-ice-glass px-3 py-1.5 rounded-xl text-[11px]">
                            پیشنهاد موسیقی 💡
                        </button>
                        <div class="flex items-center gap-2">
                            <button id="D07_cancelMain" class="btn-ice-glass px-3 py-1.5 rounded-xl text-[11px]">
                                مرحله قبل
                            </button>
                            <button id="D07_okBtn" class="btn-ice-glass px-3.5 py-1.5 rounded-xl text-[11px]">
                                OK (ورود به لیست پخش)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- فرم پیشنهاد موسیقی -->
            <div id="D07_suggestionModal" class="ice-glass-overlay">
                <div class="ice-glass-card text-xs max-w-[380px] w-[90vw]">
                    <div class="flex items-center justify-between mb-2 border-b border-slate-300/80 pb-2">
                        <h3 class="text-xs text-slate-900 font-black">فرم پیشنهاد موسیقی اختصاصی</h3>
                        <button id="D07_closeSug" class="text-slate-500 hover:text-slate-900 cursor-pointer text-sm font-bold p-1">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    
                    <div class="text-[11px] text-slate-800 mb-2 font-bold leading-relaxed">
                        اطلاعات موسیقی پیشنهادی مانند اسم قطعه، خواننده یا نوازنده را وارد کنید.
                    </div>

                    <div class="space-y-2">
                        <input type="text" id="D07_sugInput" placeholder="نام موسیقی، خواننده و..." class="w-full bg-white/80 border border-slate-300 rounded-xl px-3 py-1.5 text-[11px] text-slate-900 outline-none font-bold shadow-inner">
                    </div>

                    <div class="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-slate-300/80">
                        <button id="D07_backSug" class="btn-ice-glass px-3 py-1.5 rounded-xl text-[11px]">
                            مرحله قبل
                        </button>
                        <button id="D07_submitSug" class="btn-ice-glass px-3.5 py-1.5 rounded-xl text-[11px]">
                            تایید و ارسال
                        </button>
                    </div>
                </div>
            </div>
        `;

        layer.innerHTML = htmlContent;
        this.bindEvents();
    }

    bindEvents() {
        const btn = document.getElementById('D07_mainBtn');
        const tooltip = document.getElementById('D07_tooltip');
        const mainModal = document.getElementById('D07_mainModal');
        const sugModal = document.getElementById('D07_suggestionModal');

        // دکمه پخش و توقف سریع روی پلیر اصلی
        document.getElementById('D07_quickPlayBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePlay();
        });

        // دکمه ترک بعدی روی پلیر اصلی
        document.getElementById('D07_quickNextBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.playNext();
        });

        // کلیک روی عنوان/بخش راهنما
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (tooltip.classList.contains('hidden')) {
                tooltip.classList.remove('hidden');
            } else {
                tooltip.classList.add('hidden');
                mainModal.classList.add('active');
            }
        });

        const closeModalFunc = () => {
            mainModal.classList.remove('active');
            tooltip.classList.add('hidden');
        };

        document.getElementById('D07_closeMain').addEventListener('click', closeModalFunc);
        document.getElementById('D07_cancelMain').addEventListener('click', closeModalFunc);

        document.getElementById('D07_okBtn').addEventListener('click', () => {
            closeModalFunc();
            this.openPlaylistUI();
        });

        document.getElementById('D07_openSugBtn').addEventListener('click', () => {
            mainModal.classList.remove('active');
            sugModal.classList.add('active');
        });

        document.getElementById('D07_closeSug').addEventListener('click', () => {
            sugModal.classList.remove('active');
            closeModalFunc();
        });
        document.getElementById('D07_backSug').addEventListener('click', () => {
            sugModal.classList.remove('active');
            mainModal.classList.add('active');
        });

        document.getElementById('D07_submitSug').addEventListener('click', () => {
            const val = document.getElementById('D07_sugInput').value;
            if(val.trim() !== "") {
                localStorage.setItem('novo_audio_suggestion', val);
                alert("پیشنهاد ارزشمند شما ثبت شد.");
                document.getElementById('D07_sugInput').value = "";
            }
            sugModal.classList.remove('active');
            tooltip.classList.add('hidden');
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
                        
                        <div class="space-y-2 max-h-[180px] overflow-y-auto mb-3 p-1" id="D07_trackContainer">
                            ${this.renderTrackList()}
                        </div>

                        <!-- تنظیمات تکرار (تکرار کل لیست / تکرار تک‌آهنگ) -->
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
            <div onclick="window.D07_instance.selectTrack(${idx})" class="track-item p-2 ${idx === this.currentTrackIndex ? 'bg-amber-100 border-amber-400' : 'bg-white/50'} hover:bg-white/90 rounded-xl cursor-pointer flex justify-between items-center text-[11px] font-bold border border-slate-200 transition">
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
            this.audioElement.play();
        }
        this.updateUI();
    }

    togglePlay() {
        if (this.audioElement.paused) {
            this.audioElement.play().catch(e => console.log("Audio deferred:", e));
        } else {
            this.audioElement.pause();
        }
        this.updateUI();
    }

    playNext() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        localStorage.setItem('novo_track_idx', this.currentTrackIndex);
        this.audioElement.src = this.tracks[this.currentTrackIndex].src;
        this.audioElement.play();
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
        // به‌روزرسانی دکمه و نام در کنترلر اصلی
        const playIcon = document.getElementById('D07_quickPlayIcon');
        if (playIcon) {
            playIcon.className = `fa-solid ${this.audioElement.paused ? 'fa-play' : 'fa-pause'} text-xs`;
        }

        const titleDisplay = document.getElementById('D07_trackTitleDisplay');
        if (titleDisplay) {
            titleDisplay.innerText = this.tracks[this.currentTrackIndex].name;
        }

        // به‌روزرسانی لیست پخش
        const container = document.getElementById('D07_trackContainer');
        if (container) {
            container.innerHTML = this.renderTrackList();
        }
    }
}

const novoAudio = new NovoAutonomousAudio();
