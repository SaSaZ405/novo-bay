/* ==========================================================
   NOVO-BAY AUTONOMOUS AUDIO MANAGER (D07)
   ========================================================== */

class NovoAutonomousAudio {
    constructor() {
        this.tracks = [
            { title: "آوای ملل ۱ - نوای باستانی", src: "trac1.mp3" },
            { title: "آوای ملل ۲ - امواج دیپلماسی", src: "trac2.mp3" },
            { title: "آوای ملل ۳ - افق‌های نوین", src: "trac3.mp3" },
            { title: "آوای ملل ۴ - همگرایی جهانی", src: "trac4.mp3" },
            { title: "آوای ملل ۵ - نوای فراتر از مرزها", src: "trac5.mp3" },
            { title: "آوای ملل ۶ - هارمونی پارادایم", src: "trac6.mp3" },
            { title: "آوای ملل ۷ - پژواک فرهنگ‌ها", src: "trac7.mp3" },
            { title: "آوای ملل ۸ - ریتم بیداری", src: "trac8.mp3" },
            { title: "آوای ملل ۹ - سرود نهایی نوو-بی", src: "trac9.mp3" }
        ];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.audioElement = new Audio(this.tracks[this.currentTrackIndex].src);
        
        // اطمینان از بارگذاری کامل DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initDOM());
        } else {
            this.initDOM();
        }
    }

    initDOM() {
        const layerD07 = document.getElementById('layer-D07') || document.getElementById('node-R20-C10');
        if (!layerD07) return;

        // تزریق آیکون کلاسیک و پنل صوتی درون سلول R20:C10
        layerD07.innerHTML = `
            <div class="balloon-element" style="position: absolute; bottom: 2px; left: 2px; z-index: 60;">
                <div id="audioIconTrigger" title="آوای ملل (NOVO-AUDIO)" style="
                    width: 32px;
                    height: 32px;
                    background: rgba(15, 23, 42, 0.85);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(245, 158, 11, 0.5);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                ">
                    <i class="fas fa-music text-amber-400 text-xs"></i>
                </div>

                <!-- پنل اصلی لیست پخش با قابلیت اسکرول عمودی -->
                <div id="audioPlaylistModal" class="hidden" style="
                    position: absolute;
                    bottom: 40px;
                    left: 0;
                    width: 290px;
                    background: rgba(255, 255, 255, 0.94);
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
                        <button id="closePlaylistBtn" class="text-slate-400 hover:text-slate-700 text-sm cursor-pointer"><i class="fas fa-times"></i></button>
                    </div>
                    <!-- کانتینر با قابلیت اسکرول برای نمایش تمام تراک‌ها -->
                    <div id="trackListContainer" class="space-y-1.5 max-h-48 overflow-y-auto mb-3 pr-1"></div>
                    <div class="flex justify-between items-center pt-2 border-t border-slate-200 text-xs text-slate-600">
                        <span id="currentPlayingTitle" class="truncate font-medium max-w-[190px]">در حال پخش: --</span>
                        <button id="masterPlayBtn" class="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold transition-all shadow cursor-pointer">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.initEvents();
        this.renderTrackList();
    }

    initEvents() {
        const trigger = document.getElementById('audioIconTrigger');
        const closePlaylistBtn = document.getElementById('closePlaylistBtn');
        const masterPlayBtn = document.getElementById('masterPlayBtn');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showAudioGuideModal();
            });
        }

        if (closePlaylistBtn) {
            closePlaylistBtn.addEventListener('click', () => {
                document.getElementById('audioPlaylistModal').classList.add('hidden');
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

    // راهنمای جامع صوتی
    showAudioGuideModal() {
        let modal = document.getElementById('iceGlassModal');
        if (!modal) return;

        document.getElementById('modalTitle').innerHTML = `🎵 راهنمای جامع پخش صوتی و آوای ملل (NOVO-BAY)`;
        
        document.getElementById('modalDesc').innerHTML = `
            <p class="mb-3 leading-relaxed text-xs">در این بخش، نواها و قطعات موسیقی شاخص از سرزمین‌های مختلف جهان — که زبان‌های آن مناطق در این پلتفرم پشتیبانی می‌شوند — طنین‌انداز می‌گردد.</p>
            <p class="mb-3 leading-relaxed text-xs">شما آزادانه می‌توانید نوایی خاص را به صورت مکرر بشنوید، اجازه دهید سلسله‌ای از نواها به نوبت نواخته شوند، یا جریان پخش صوتی را در بدو ورود به پلتفرم و یا در هر بخش دلخواه دیگر متوقف سازید.</p>
            <p class="text-slate-500 leading-relaxed text-xs">هدف از ارائهٔ این مجموعهٔ گزیده، صرفاً معرفی اصالت‌های موسیقایی ملل گوناگون است. چنانچه پیشنهاد ارزنده‌ای در خصوص قطعه‌ی خاص مدنظر دارید، با ما به اشتراک بگذارید؛ در صورت استقبال و فزونی درخواست‌ها، آن را به لیست پخش سراسری اضافه خواهیم کرد.</p>
        `;

        const footer = document.getElementById('modalFooter') || modal.querySelector('.border-t');
        if (footer) {
            footer.innerHTML = `
                <button id="suggestMusicBtn" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-300 flex items-center gap-1 cursor-pointer">
                    <i class="fas fa-lightbulb text-amber-500"></i> پیشنهاد موسیقی
                </button>
                <div class="flex gap-2">
                    <button id="cancelGuideBtn" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer">انصراف</button>
                    <button id="okGuideBtn" class="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer">OK (ورود به لیست پخش)</button>
                </div>
            `;

            document.getElementById('okGuideBtn').onclick = () => {
                modal.classList.remove('active');
                const playlistModal = document.getElementById('audioPlaylistModal');
                if (playlistModal) {
                    playlistModal.classList.remove('hidden');
                }
            };

            document.getElementById('cancelGuideBtn').onclick = () => {
                modal.classList.remove('active');
            };

            document.getElementById('suggestMusicBtn').onclick = () => {
                this.showSuggestionFormModal();
            };
        }

        modal.classList.add('active');
    }

    // فرم پیشنهاد موسیقی
    showSuggestionFormModal() {
        let modal = document.getElementById('iceGlassModal');
        if (!modal) return;

        document.getElementById('modalTitle').innerHTML = `💡 ثبت پیشنهاد موسیقی ملل`;
        document.getElementById('modalDesc').innerHTML = `
            <div class="space-y-3 text-right">
                <p class="text-xs text-slate-600">لطفاً مشخصات قطعه یا نوای پیشنهادی خود را وارد کنید تا پس از بررسی کارشناسی، به لیست پخش سراسری افزوده شود.</p>
                <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">نام قطعه و کشور/منطقه:</label>
                    <input type="text" id="suggestTrackName" placeholder="مثلاً: نوای محلی اندلس - اسپانیا" class="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-700 mb-1">لینک یا توضیحات تکمیلی:</label>
                    <textarea id="suggestTrackDesc" rows="2" placeholder="لینک مرجع یا توضیحات کوتاه..." class="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 resize-none"></textarea>
                </div>
            </div>
        `;

        const footer = document.getElementById('modalFooter') || modal.querySelector('.border-t');
        if (footer) {
            footer.innerHTML = `
                <button id="backToGuideBtn" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer">بازگشت</button>
                <button id="submitSuggestionBtn" class="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer">ثبت و ارسال پیشنهاد</button>
            `;

            document.getElementById('backToGuideBtn').onclick = () => {
                this.showAudioGuideModal();
            };

            document.getElementById('submitSuggestionBtn').onclick = () => {
                const trackName = document.getElementById('suggestTrackName').value.trim();
                if (!trackName) {
                    alert("لطفاً نام قطعه یا منطقه را وارد کنید.");
                    return;
                }
                alert(`پیشنهاد ارزشمند شما (${trackName}) با موفقیت ثبت شد. از همکاری شما سپاسگزاریم!`);
                modal.classList.remove('active');
            };
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
}

// راه‌اندازی ماژول صوتی
const novoAudio = new NovoAutonomousAudio();
