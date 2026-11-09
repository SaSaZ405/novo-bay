class NovoAutonomousAudio {
    constructor() {
        this.tracks = [
            { title: "آوای ملل ۱ - نوای باستانی", src: "audio1.mp3" },
            { title: "آوای ملل ۲ - امواج دیپلماسی", src: "audio2.mp3" },
            { title: "آوای ملل ۳ - افق‌های نوین", src: "audio3.mp3" },
            { title: "آوای ملل ۴ - همگرایی جهانی", src: "audio4.mp3" }
        ];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.audioElement = new Audio(this.tracks[this.currentTrackIndex].src);
        
        this.initDOM();
        this.initEvents();
    }

    initDOM() {
        const layerD07 = document.getElementById('layer-D07');
        if (!layerD07) return;

        // استقرار دقیق در سلول R20:C10
        layerD07.style.gridRow = "20";
        layerD07.style.gridColumn = "10";

        const balloon = layerD07.querySelector('.balloon-element') || document.createElement('div');
        balloon.className = 'balloon-element';
        balloon.style.cssText = "bottom: 2px; left: 2px;";

        // آیکون کلاسیک و مینیمال موسیقی در سلول R20:C10
        balloon.innerHTML = `
            <div id="audioIconTrigger" title="آوای ملل (NOVO-AUDIO)" style="
                width: 32px;
                height: 32px;
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(245, 158, 11, 0.4);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.25s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            ">
                <i class="fas fa-music text-amber-400 text-xs"></i>
            </div>

            <!-- مودال راهنمای جامع صوتی (مطابق تصویر مدنظر شما) -->
            <div id="audioGuideModal" class="hidden" style="
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.45);
                backdrop-filter: blur(14px);
                -webkit-backdrop-filter: blur(14px);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                direction: rtl;
            ">
                <div style="
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.95);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    border-radius: 1.5rem;
                    color: #0f172a;
                    width: 440px;
                    max-width: 90vw;
                    padding: 1.5rem;
                    text-align: right;
                    position: relative;
                ">
                    <button id="closeGuideTop" style="position: absolute; top: 1rem; left: 1rem; background: none; border: none; font-size: 1.1rem; color: #94a3b8; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1rem; font-weight: bold; font-size: 0.95rem; color: #1e293b;">
                        <span>🎵</span> راهنمای جامع پخش صوتی و آوای ملل (NOVO-BAY)
                    </div>

                    <div style="font-size: 0.75rem; line-height: 1.8; color: #475569; margin-bottom: 1.25rem;">
                        در این بخش، نواها و قطعات موسیقی شاخص از سرزمین‌های مختلف جهان — که زبان‌های آن مناطق در این پلفرم پشتیبانی می‌شوند — طنین‌انداز می‌گردد.<br><br>
                        شما آزادانه می‌توانید نوایی خاص را به‌صورت مکرر بشنوید، اجازه دهید سلسله‌ای از نواها به‌نوبت نواخته شوند، یا جریان پخش صوتی را در بدو ورود به پلفرم و یا در هر بخش دلخواه دیگر متوقف سازید.<br><br>
                        هدف از ارائهٔ این مجموعهٔ گزیده، صرفاً معرفی اصالت‌های موسیقایی ملل گوناگون است. چنانچه پیشنهاد ارزنده‌ای در خصوص قطعه‌ای خاص مدنظر دارید، با ما به اشتراک بگذارید؛ در صورت استقبال و فزونی درخواست‌ها، آن را به لیست پخش سراسری اضافه خواهیم کرد.
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; pt: 0.75rem; border-top: 1px solid rgba(226, 232, 240, 0.8);">
                        <button id="suggestMusicBtn" style="background: rgba(254, 243, 199, 0.6); border: 1px solid rgba(245, 158, 11, 0.4); color: #b45309; padding: 6px 12px; border-radius: 0.75s; font-size: 0.7rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                            <span>💡</span> پیشنهاد موسیقی
                        </button>
                        <div style="display: flex; gap: 6px;">
                            <button id="cancelGuideBtn" style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #475569; padding: 6px 14px; border-radius: 0.75rem; font-size: 0.7rem; font-weight: bold; cursor: pointer;">انصراف</button>
                            <button id="okGuideBtn" style="background: #3b82f6; border: none; color: #fff; padding: 6px 16px; border-radius: 0.75rem; font-size: 0.7rem; font-weight: bold; cursor: pointer;">OK (ورود به لیست پخش)</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- مودال فرم پیشنهاد موسیقی -->
            <div id="suggestModal" class="hidden" style="
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.45);
                backdrop-filter: blur(14px);
                z-index: 2500;
                display: flex;
                align-items: center;
                justify-content: center;
                direction: rtl;
            ">
                <div style="
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 1.25rem;
                    width: 360px;
                    max-width: 90vw;
                    padding: 1.25rem;
                    text-align: right;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                ">
                    <h4 style="font-size: 0.85rem; font-weight: bold; color: #1e293b; margin-bottom: 0.75rem;">💡 پیشنهاد قطعه موسیقی جدید</h4>
                    <p style="font-size: 0.7rem; color: #64748b; margin-bottom: 0.75rem;">نام قطعه، هنرمند یا لینک مرتبط را بنویسید تا بررسی و اضافه گردد:</p>
                    <textarea id="suggestInput" placeholder="عنوان قطعه یا توضیحات..." style="width: 100%; height: 70px; border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 8px; font-size: 0.75rem; outline: none; margin-bottom: 0.75rem; resize: none;"></textarea>
                    <div style="display: flex; justify-content: flex-end; gap: 6px;">
                        <button id="closeSuggestBtn" style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #475569; padding: 5px 12px; border-radius: 0.5rem; font-size: 0.7rem; cursor: pointer;">انصراف</button>
                        <button id="submitSuggestBtn" style="background: #f59e0b; border: none; color: #fff; padding: 5px 14px; border-radius: 0.5rem; font-size: 0.7rem; font-weight: bold; cursor: pointer;">ارسال پیشنهاد</button>
                    </div>
                </div>
            </div>

            <!-- پنل اصلی پلیر و لیست پخش -->
            <div id="audioPlaylistModal" class="hidden" style="
                position: absolute;
                bottom: 40px;
                left: 0;
                width: 280px;
                background: rgba(255, 255, 255, 0.92);
                backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.95);
                border-radius: 1rem;
                padding: 1rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                z-index: 100;
                color: #0f172a;
                direction: rtl;
                text-align: right;
            ">
                <div class="flex justify-between items-center mb-3 pb-2 border-b border-slate-200">
                    <span class="text-xs font-bold text-slate-800">لیست پخش و تنظیمات صوتی</span>
                    <button id="closePlaylistBtn" class="text-slate-400 hover:text-slate-700 text-sm"><i class="fas fa-times"></i></button>
                </div>
                <div id="trackListContainer" class="space-y-1.5 max-h-40 overflow-y-auto mb-3"></div>
                <div class="flex justify-between items-center pt-2 border-t border-slate-200 text-xs text-slate-600">
                    <span id="currentPlayingTitle" class="truncate font-medium">در حال پخش: --</span>
                    <button id="masterPlayBtn" class="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold transition-all shadow">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
        `;

        if (!layerD07.contains(balloon)) {
            layerD07.appendChild(balloon);
        }

        this.renderTrackList();
    }

    initEvents() {
        const trigger = document.getElementById('audioIconTrigger');
        const guideModal = document.getElementById('audioGuideModal');
        const closeGuideTop = document.getElementById('closeGuideTop');
        const cancelGuideBtn = document.getElementById('cancelGuideBtn');
        const okGuideBtn = document.getElementById('okGuideBtn');
        const suggestMusicBtn = document.getElementById('suggestMusicBtn');
        const suggestModal = document.getElementById('suggestModal');
        const closeSuggestBtn = document.getElementById('closeSuggestBtn');
        const submitSuggestBtn = document.getElementById('submitSuggestBtn');
        
        const closePlaylistBtn = document.getElementById('closePlaylistBtn');
        const masterPlayBtn = document.getElementById('masterPlayBtn');
        const playlistModal = document.getElementById('audioPlaylistModal');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                guideModal.classList.remove('hidden');
            });
        }

        const closeGuide = () => guideModal.classList.add('hidden');
        if (closeGuideTop) closeGuideTop.addEventListener('click', closeGuide);
        if (cancelGuideBtn) cancelGuideBtn.addEventListener('click', closeGuide);

        // کلیک روی OK (ورود به لیست پخش)
        if (okGuideBtn) {
            okGuideBtn.addEventListener('click', () => {
                guideModal.classList.add('hidden');
                if (playlistModal) playlistModal.classList.remove('hidden');
            });
        }

        // مدیریت دکمه پیشنهاد موسیقی
        if (suggestMusicBtn) {
            suggestMusicBtn.addEventListener('click', () => {
                suggestModal.classList.remove('hidden');
            });
        }

        if (closeSuggestBtn) {
            closeSuggestBtn.addEventListener('click', () => {
                suggestModal.classList.add('hidden');
            });
        }

        if (submitSuggestBtn) {
            submitSuggestBtn.addEventListener('click', () => {
                const val = document.getElementById('suggestInput').value.trim();
                if (val) {
                    alert("پیشنهاد ارزشمند شما با موفقیت ثبت شد. سپاسگزاریم!");
                    document.getElementById('suggestInput').value = '';
                    suggestModal.classList.add('hidden');
                } else {
                    alert("لطفاً عنوان یا لینک مورد نظر را وارد کنید.");
                }
            });
        }

        if (closePlaylistBtn) {
            closePlaylistBtn.addEventListener('click', () => {
                playlistModal.classList.add('hidden');
            });
        }

        if (masterPlayBtn) {
            masterPlayBtn.addEventListener('click', () => {
                if (this.isPlaying) {
                    this.audioElement.pause();
                    this.isPlaying = false;
                    masterPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                } else {
                    this.audioElement.play().catch(err => console.log(err));
                    this.isPlaying = true;
                    masterPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }
            });
        }
    }

    renderTrackList() {
        const container = document.getElementById('trackListContainer');
        if (!container) return;

        container.innerHTML = '';
        this.tracks.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = `p-2 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-all ${index === this.currentTrackIndex ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-slate-100 text-slate-700'}`;
            item.innerHTML = `<span>${index + 1}. ${track.title}</span> <i class="fas fa-play text-[10px] text-amber-600"></i>`;
            
            item.addEventListener('click', () => {
                this.currentTrackIndex = index;
                this.audioElement.src = track.src;
                this.audioElement.play().catch(e => console.log(e));
                this.isPlaying = true;
                document.getElementById('currentPlayingTitle').innerText = `در حال پخش: ${track.title}`;
                const masterPlayBtn = document.getElementById('masterPlayBtn');
                if (masterPlayBtn) masterPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                this.renderTrackList();
            });

            container.appendChild(item);
        });
    }

    togglePlaylist() {
        const playlistModal = document.getElementById('audioPlaylistModal');
        if (playlistModal) {
            playlistModal.classList.toggle('hidden');
        }
    }
}

const novoAudio = new NovoAutonomousAudio();

window.toggleAudioPlaylist = function() {
    if (typeof novoAudio !== 'undefined' && typeof novoAudio.togglePlaylist === 'function') {
        novoAudio.togglePlaylist();
    }
};
