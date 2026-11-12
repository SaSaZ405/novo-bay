/* ==========================================================
   NOVO-BAY SEASONAL & THEME MANAGEMENT ENGINE (D09)
   AUTUMN FESTIVAL & LANDING AUDIO EDITION
   ========================================================== */

class NovoSeasonalThemeEngine {
    constructor() {
        this.newsItems = [
            "🍂 فستیوال پاییزی نوو-بی | آوای ملل و دیپلماسی هوشمند مگا-شهرها 🍁",
            "✨ رویدادهای فرهنگی، پژوهشی و دیپلماسی پاییزی در سراسر هاب‌های بین‌المللی فعال شد.",
            "🎁 چالش‌های تعاملی و هوشمند تحلیل شبکه در بخش خورشید (NOVO-SUN) برقرار است.",
            "🌐 Multilingual cultural events and autumn festive coordination across global hubs."
        ];
        this.tickerIndex = 0;
        this.isLandingAudioPlaying = false;
        
        // نام دقیق فایل صوتی بک‌گراند با استاندارد فاصله URL (معادل NOVO Background Audio.mp3)
        this.landingAudio = document.getElementById('landingBgAudio');
        if (!this.landingAudio) {
            this.landingAudio = document.createElement('audio');
            this.landingAudio.id = 'landingBgAudio';
            this.landingAudio.src = 'NOVO%20Background%20Audio.mp3';[cite: 2]
            this.landingAudio.preload = 'auto';
            this.landingAudio.loop = true;
            document.body.appendChild(this.landingAudio);
        }

        document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => this.init()) : this.init();
    }

    init() {
        this.injectStyles();
        this.renderTopMonitor();
        this.initAutumnLeaves();
        this.initDateTime();
        this.initNewsTicker();
        this.setupLandingAutoplay();
    }

    setupLandingAutoplay() {
        const trigger = () => {
            if (!this.isLandingAudioPlaying && this.landingAudio.paused) {
                this.landingAudio.play().then(() => {
                    this.isLandingAudioPlaying = true;
                    this.updateHeaderAudioIcon();
                    window.removeEventListener('click', trigger);
                    window.removeEventListener('touchstart', trigger);
                }).catch(e => console.log("Landing audio waiting for touch:", e));
            }
        };
        window.addEventListener('click', trigger, { once: true });
        window.addEventListener('touchstart', trigger, { once: true });
    }

    injectStyles() {
        if (document.getElementById('novo-seasonal-styles')) return;
        const style = document.createElement('style');
        style.id = 'novo-seasonal-styles';
        style.innerHTML = `
            .autumn-leaf { 
                position: fixed; top: -20px; z-index: 99; user-select: none; pointer-events: none; 
                animation: fallAndSway linear infinite; font-size: 14px; opacity: 0.85;
            }
            @keyframes fallAndSway { 
                0% { transform: translateY(-20px) rotate(0deg) translateX(0px); opacity: 0.9; } 
                50% { transform: translateY(50dvh) rotate(180deg) translateX(25px); opacity: 0.7; }
                100% { transform: translateY(105dvh) rotate(360deg) translateX(-20px); opacity: 0.2; } 
            }
            .top-festive-monitor { 
                position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; 
                height: 12.5dvh !important; background: rgba(15, 23, 42, 0.92); 
                border-bottom: 1px solid rgba(245, 158, 11, 0.25); z-index: 99999 !important; 
                display: flex; flex-direction: column; justify-content: space-between; 
                padding: 0.5rem 1.25rem; color: #fff; overflow: hidden; 
            }
            .top-festive-monitor video { 
                position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.35; z-index: 1; 
            }
            .top-monitor-content { 
                position: relative; z-index: 2; display: flex; width: 100%; align-items: center; justify-content: space-between; 
            }
            .bottom-ticker-bar {
                position: relative; z-index: 2; width: 100%; background: rgba(15, 23, 42, 0.7);
                backdrop-filter: blur(6px); padding: 2px 10px; border-radius: 4px; font-size: 11px;
                display: flex; align-items: center; justify-content: space-between;
                border-top: 1px solid rgba(245, 158, 11, 0.15);
            }
            .header-audio-btn {
                background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4);
                border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center;
                justify-content: center; cursor: pointer; color: #f59e0b; transition: all 0.2s;
            }
            .header-audio-btn:hover { background: rgba(245, 158, 11, 0.3); color: #fff; transform: scale(1.08); }
        `;
        document.head.appendChild(style);
        document.body.classList.add('autumn-seasonal-theme');
    }

    renderTopMonitor() {
        if (document.getElementById('topFestiveMonitor')) return;
        const monitor = document.createElement('header');
        monitor.id = 'topFestiveMonitor';
        monitor.className = 'top-festive-monitor';
        monitor.innerHTML = `
            <video autoplay muted loop playsinline preload="auto"><source src="video1.mp4" type="video/mp4"></video>
            
            <div class="top-monitor-content">
                <div class="flex items-center gap-2">
                    <span class="bg-amber-600/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <i class="fas fa-leaf"></i> نوو-بی
                    </span>
                    <span class="text-xs font-semibold text-amber-100 hidden sm:inline">فستیوال پاییزی و دیپلماسی ملل</span>
                </div>

                <div class="flex items-center gap-3">
                    <div class="hidden md:flex items-center gap-2 font-mono text-[10px]">
                        <span id="liveClock" class="text-amber-300 font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-amber-500/20">00:00:00</span> |
                        <span id="solarDate" class="text-slate-200">--</span>
                    </div>
                    <!-- دکمه هدر اختصاصی قطع و وصل موسیقی بک‌گراند لندینگ -->
                    <button id="headerLandingPlayBtn" class="header-audio-btn" title="پخش / توقف موسیقی بک‌گراند">
                        <i class="fas fa-play" id="headerLandingIcon"></i>
                    </button>
                </div>
            </div>

            <div class="bottom-ticker-bar">
                <div class="flex items-center gap-2 overflow-hidden w-full">
                    <span class="text-amber-400 font-bold text-[10px] whitespace-nowrap"><i class="fas fa-bullhorn ml-1"></i> اخبار:</span>
                    <div class="whitespace-nowrap overflow-hidden text-ellipsis text-amber-200 text-[11px]">
                        <span id="tickerText">${this.newsItems[0]}</span>
                    </div>
                </div>
            </div>
        `;
        document.body.prepend(monitor);

        document.getElementById('headerLandingPlayBtn').onclick = () => {
            if (this.landingAudio.paused) {
                this.landingAudio.play().then(() => {
                    this.isLandingAudioPlaying = true;
                    this.updateHeaderAudioIcon();
                }).catch(e => console.log(e));
            } else {
                this.landingAudio.pause();
                this.isLandingAudioPlaying = false;
                this.updateHeaderAudioIcon();
            }
        };
    }

    updateHeaderAudioIcon() {
        const icon = document.getElementById('headerLandingIcon');
        if (icon) {
            icon.className = this.isLandingAudioPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }

    initAutumnLeaves() {
        const leafSymbols = ['🍁', '🍂', '🍃'];
        for (let i = 0; i < 22; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'autumn-leaf';
            leaf.innerHTML = leafSymbols[Math.floor(Math.random() * leafSymbols.length)];
            leaf.style.left = Math.random() * 100 + 'vw';
            leaf.style.fontSize = (Math.random() * 8 + 12) + 'px';
            leaf.style.animationDuration = (Math.random() * 6 + 6) + 's';
            leaf.style.animationDelay = (Math.random() * 5) + 's';
            document.body.appendChild(leaf);
        }
    }

    initDateTime() {
        const update = () => {
            const now = new Date();
            const c = document.getElementById('liveClock');
            const s = document.getElementById('solarDate');
            if (c) c.innerText = now.toLocaleTimeString('fa-IR');
            if (s) s.innerText = now.toLocaleDateString('fa-IR', { calendar: 'persian', year: 'numeric', month: '2-digit', day: '2-digit' });
        };
        setInterval(update, 1000);
        update();
    }

    initNewsTicker() {
        setInterval(() => {
            this.tickerIndex = (this.tickerIndex + 1) % this.newsItems.length;
            const el = document.getElementById('tickerText');
            if (el) el.innerText = this.newsItems[this.tickerIndex];
        }, 5000);
    }
}

const novoSeasonalThemeEngine = new NovoSeasonalThemeEngine();
