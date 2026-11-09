class NovoAutonomousAudio {
    constructor() {
        this.tracks = [
            { title: "آوای ملل ۱ - نوای باستانی", src: "audio1.mp3" },
            { title: "آوای ملل ۲ - امواج دیپلماسی", src: "audio2.mp3" },
            { title: "آوای ملل ۳ - افق‌های نوین", src: "audio3.mp3" },
            { title: "آوای ملل ۴ - همگرایی جهانی", src: "audio4.mp3" }
        ];
        this.currentTrackIndex = 1;
        this.isPlaying = false;
        this.audioElement = new Audio(this.tracks[this.currentTrackIndex].src);
        
        this.initDOM();
        this.initEvents();
    }

    initDOM() {
        // یافتن سلول R20:C10 در اتاق فرمان کل
        const layerD07 = document.getElementById('layer-D07');
        if (!layerD07) return;

        // تغییر جایگاه به R20:C10
        layerD07.style.gridRow = "20";
        layerD07.style.gridColumn = "10";

        const balloon = layerD07.querySelector('.balloon-element') || document.createElement('div');
        balloon.className = 'balloon-element';
        balloon.style.cssText = "bottom: 2px; left: 2px;";

        // طراحی نماد کلاسیک و مینیمال موسیقی در سلول R20:C10
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

            <!-- پنل اصلی پلیر و لیست پخش (که پس از تایید توضیحات نمایان می‌شود) -->
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
        const closePlaylistBtn = document.getElementById('closePlaylistBtn');
        const masterPlayBtn = document.getElementById('masterPlayBtn');

        if (trigger) {
            // لمس اول: نمایش کارت توضیحات سفید یخی (بدون باز کردن مستقیم پلیر)
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

    // نمایش کارت توضیحات سفید یخی اختصاصی پلیر (مشابه استاندارد پروژه)
    showAudioGuideModal() {
        let modal = document.getElementById('iceGlassModal');
        if (!modal) return;

        document.getElementById('modalTitle').innerText = "🎵 راهنمای سیستم صوتی و آوای ملل (NOVO-AUDIO)";
        document.getElementById('modalDesc').innerHTML = `
            این سلول (<code class="text-amber-600 font-bold">R20:C10</code>) به عنوان هسته صوتی و آوای دیپلماتیک شبکه NOVO-BAY عمل می‌کند.<br><br>
            <span class="text-slate-500">با ورود به این بخش می‌توانید قطعات صوتی ملل را انتخاب کرده، فضای صوتی شبکه را مدیریت کنید و به آواهای دیپلماتیک گوش دهید.</span>
        `;
        
        const btn = document.getElementById('modalPrimaryBtn') || document.querySelector('#iceGlassModal button.bg-amber-500');
        if (btn) {
            btn.innerText = "ادامه و تنظیمات صوتی 🎧";
            btn.onclick = () => {
                // بستن مودال توضیحات
                modal.classList.remove('active');
                // باز کردن پنل اصلی پلیر و لیست پخش
                const playlistModal = document.getElementById('audioPlaylistModal');
                if (playlistModal) {
                    playlistModal.classList.remove('hidden');
                }
            };
        }

        modal.classList.add('active');
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

// راه‌اندازی ماژول صوتی
const novoAudio = new NovoAutonomousAudio();

window.toggleAudioPlaylist = function() {
    if (typeof novoAudio !== 'undefined' && typeof novoAudio.togglePlaylist === 'function') {
        novoAudio.togglePlaylist();
    }
};
