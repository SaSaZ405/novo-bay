/* ==========================================================
   NOVO-BAY SEASONAL & THEME MANAGEMENT ENGINE (D09)
   ========================================================== */

class NovoSeasonalThemeEngine {
    constructor() {
        this.currentTheme = 'christmas';
        this.newsItems = [
            "🎄 Merry Christmas & Happy New Year 2027 | آستانه سال نو میلادی و فستیوال زمستانی ❄️",
            "✨ رویدادهای فرهنگی، دیپلماسی و گردشگری زمستانه در سراسر مگا-شهرها فعال شد.",
            "🎁 چالش‌های تعاملی و هوشمند تحلیل شبکه در بخش خورشید (NOVO-SUN) برقرار است.",
            "🌐 Multilingual cultural events and winter festive coordination across 8 global hubs."
        ];
        this.tickerIndex = 0;

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.injectStyles();
        this.renderTopMonitor();
        this.initSnowfall();
        this.initDateTime();
        this.initNewsTicker();
    }

    // تزریق استایل‌های زمستانی و مانیتور بالا
    injectStyles() {
        if (document.getElementById('novo-seasonal-styles')) return;
        const style = document.createElement('style');
        style.id = 'novo-seasonal-styles';
        style.innerHTML = `
            .snowflake {
                position: fixed;
                top: -10px;
                z-index: 99;
                user-select: none;
                pointer-events: none;
                animation: fall linear infinite;
                color: #ffffff;
                font-family: Arial, sans-serif;
                text-shadow: 0 0 6px rgba(255, 255, 255, 0.9);
            }
            @keyframes fall {
                0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                100% { transform: translateY(105dvh) rotate(360deg); opacity: 0.35; }
            }

            .top-festive-monitor {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                height: 12.5dvh !important;
                background: rgba(10, 15, 30, 0.95);
                border-bottom: 3px solid rgba(239, 68, 68, 0.8);
                z-index: 99999 !important;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 1.5rem;
                color: #fff;
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.7);
                overflow: hidden;
            }
            .top-festive-monitor video {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0.45;
                z-index: 1;
            }
            .top-monitor-content {
                position: relative;
                z-index: 2;
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: space-between;
            }

            .grid-wrapper {
                position: absolute !important;
                inset: 12.5dvh 0 45px 0 !important;
            }

            .christmas-seasonal-theme .ice-glass-card,
            .christmas-seasonal-theme .challenge-modal-card,
            .christmas-seasonal-theme div[id*="Modal"] > div {
                border: 2px solid rgba(220, 38, 38, 0.7) !important;
                box-shadow: 0 0 40px rgba(239, 68, 68, 0.35), 0 25px 50px -12px rgba(0,0,0,0.6) !important;
                background: rgba(255, 255, 255, 0.95) !important;
            }
            .christmas-seasonal-theme h3::before {
                content: "🎅 🎄 ❄️ ";
                font-size: 1.1rem;
            }
        `;
        document.head.appendChild(style);
        document.body.classList.add('christmas-seasonal-theme');
    }

    // ساخت مانیتور بالای صفحه با سورس video1.mp4
    renderTopMonitor() {
        if (document.getElementById('topFestiveMonitor')) return;

        const monitor = document.createElement('header');
        monitor.id = 'topFestiveMonitor';
        monitor.className = 'top-festive-monitor';
        monitor.innerHTML = `
            <video autoplay muted loop playsinline>
                <source src="video1.mp4" type="video/mp4">
            </video>
            <div class="top-monitor-content">
                <div class="flex items-center gap-3 overflow-hidden">
                    <span class="bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1.5 shadow-lg">
                        <i class="fas fa-snowflake"></i> نوو-بی (فستیوال زمستانی)
                    </span>
                    <div class="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] md:max-w-xl text-amber-300 font-semibold text-xs">
                        <span id="tickerText">${this.newsItems[0]}</span>
                    </div>
                </div>
                <div class="hidden md:flex items-center gap-3 font-mono text-[11px]">
                    <span id="liveClock" class="text-white font-bold bg-slate-800/90 px-2.5 py-1 rounded-md">00:00:00</span>
                    <span class="text-amber-400">|</span>
                    <span id="solarDate" class="text-slate-200" title="شمسی">--</span>
                    <span class="text-slate-500">/</span>
                    <span id="gregorianDate" class="text-slate-300" title="میلادی">--</span>
                    <span class="text-slate-500">/</span>
                    <span id="lunarDate" class="text-amber-200" title="قمری">--</span>
                </div>
            </div>
        `;
        document.body.prepend(monitor);
    }

    // سیستم بارش برف
    initSnowfall() {
        const snowCount = 40;
        for (let i = 0; i < snowCount; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.innerHTML = Math.random() > 0.5 ? '❄' : '•';
            flake.style.left = Math.random() * 100 + 'vw';
            flake.style.fontSize = (Math.random() * 12 + 8) + 'px';
            flake.style.animationDuration = (Math.random() * 5 + 4) + 's';
            flake.style.animationDelay = (Math.random() * 5) + 's';
            document.body.appendChild(flake);
        }
    }

    // تاریخ‌های سه‌گانه و ساعت
    initDateTime() {
        const update = () => {
            const now = new Date();
            const liveClock = document.getElementById('liveClock');
            const solarDate = document.getElementById('solarDate');
            const gregorianDate = document.getElementById('gregorianDate');
            const lunarDate = document.getElementById('lunarDate');

            if (liveClock) liveClock.innerText = now.toLocaleTimeString('fa-IR');
            if (solarDate) solarDate.innerText = now.toLocaleDateString('fa-IR', { calendar: 'persian', year: 'numeric', month: '2-digit', day: '2-digit' });
            if (gregorianDate) gregorianDate.innerText = now.toLocaleDateString('en-GB', { year: '2-digit', month: 'numeric', day: 'numeric' });
            if (lunarDate) {
                try {
                    lunarDate.innerText = now.toLocaleDateString('ar-SA-u-ca-islamic', { year: 'numeric', month: 'numeric', day: 'numeric' });
                } catch(e) {
                    lunarDate.innerText = 'قمر';
                }
            }
        };
        setInterval(update, 1000);
        update();
    }

    // چرخش اخبار
    initNewsTicker() {
        setInterval(() => {
            this.tickerIndex = (this.tickerIndex + 1) % this.newsItems.length;
            const el = document.getElementById('tickerText');
            if (el) el.innerText = this.newsItems[this.tickerIndex];
        }, 5000);
    }
}

const novoSeasonalEngine = new NovoSeasonalThemeEngine();
