/* ==========================================================
   NOVO-BAY SEASONAL & THEME MANAGEMENT ENGINE (D09)
   ========================================================== */

class NovoSeasonalThemeEngine {
    constructor() {
        this.newsItems = [
            "🎄 Merry Christmas & Happy New Year 2027 | آستانه سال نو میلادی و فستیوال زمستانی ❄️",
            "✨ رویدادهای فرهنگی، دیپلماسی و گردشگری زمستانه در سراسر مگا-شهرها فعال شد.",
            "🎁 چالش‌های تعاملی و هوشمند تحلیل شبکه در بخش خورشید (NOVO-SUN) برقرار است.",
            "🌐 Multilingual cultural events and winter festive coordination across 8 global hubs."
        ];
        this.tickerIndex = 0;
        document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => this.init()) : this.init();
    }

    init() {
        this.injectStyles();
        this.renderTopMonitor();
        this.initSnowfall();
        this.initDateTime();
        this.initNewsTicker();
    }

    injectStyles() {
        if (document.getElementById('novo-seasonal-styles')) return;
        const style = document.createElement('style');
        style.id = 'novo-seasonal-styles';
        style.innerHTML = `
            .snowflake { position: fixed; top: -10px; z-index: 99; user-select: none; pointer-events: none; animation: fall linear infinite; color: #fff; text-shadow: 0 0 6px rgba(255,255,255,0.9); }
            @keyframes fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(105dvh) rotate(360deg); opacity: 0.35; } }
            
            /* هدر بدون خط قرمز و با استایل مینیمال */
            .top-festive-monitor { 
                position: fixed !important; 
                top: 0 !important; 
                left: 0 !important; 
                right: 0 !important; 
                height: 12.5dvh !important; 
                background: rgba(10,15,30,0.92); 
                border-bottom: 1px solid rgba(255, 255, 255, 0.15); 
                z-index: 99999 !important; 
                display: flex; 
                flex-direction: column;
                justify-content: space-between; 
                padding: 0.5rem 1.25rem; 
                color: #fff; 
                overflow: hidden; 
            }
            .top-festive-monitor video { 
                position: absolute; 
                inset: 0; 
                width: 100%; 
                height: 100%; 
                object-fit: cover; 
                opacity: 0.4; 
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
            /* نوار اطلاع‌رسانی منتقل‌شده به پایین هدر */
            .bottom-ticker-bar {
                position: relative;
                z-index: 2;
                width: 100%;
                background: rgba(15, 23, 42, 0.65);
                backdrop-filter: blur(6px);
                padding: 2px 10px;
                border-radius: 4px;
                font-size: 11px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        `;
        document.head.appendChild(style);
        document.body.classList.add('christmas-seasonal-theme');
    }

    renderTopMonitor() {
        if (document.getElementById('topFestiveMonitor')) return;
        const monitor = document.createElement('header');
        monitor.id = 'topFestiveMonitor';
        monitor.className = 'top-festive-monitor';
        monitor.innerHTML = `
            <video autoplay muted loop playsinline preload="auto"><source src="video1.mp4" type="video/mp4"></video>
            
            <!-- ردیف بالای هدر: ساعت و تاریخ -->
            <div class="top-monitor-content">
                <div class="flex items-center gap-2">
                    <span class="bg-red-600/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <i class="fas fa-snowflake"></i> نوو-بی
                    </span>
                    <span class="text-xs font-semibold text-slate-200">فستیوال زمستانه و دیپلماسی</span>
                </div>
                <div class="hidden md:flex items-center gap-2 font-mono text-[10px]">
                    <span id="liveClock" class="text-white font-bold bg-slate-800/80 px-2 py-0.5 rounded">00:00:00</span> |
                    <span id="solarDate" class="text-slate-200">--</span> /
                    <span id="gregorianDate" class="text-slate-300">--</span>
                </div>
            </div>

            <!-- ردیف پایین هدر: نوار اطلاع‌رسانی و تیکر اخبار -->
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
    }

    initSnowfall() {
        for (let i = 0; i < 30; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.innerHTML = Math.random() > 0.5 ? '❄' : '•';
            flake.style.left = Math.random() * 100 + 'vw';
            flake.style.fontSize = (Math.random() * 10 + 8) + 'px';
            flake.style.animationDuration = (Math.random() * 5 + 4) + 's';
            flake.style.animationDelay = (Math.random() * 5) + 's';
            document.body.appendChild(flake);
        }
    }

    initDateTime() {
        const update = () => {
            const now = new Date();
            const c = document.getElementById('liveClock');
            const s = document.getElementById('solarDate');
            const g = document.getElementById('gregorianDate');
            if (c) c.innerText = now.toLocaleTimeString('fa-IR');
            if (s) s.innerText = now.toLocaleDateString('fa-IR', { calendar: 'persian', year: 'numeric', month: '2-digit', day: '2-digit' });
            if (g) g.innerText = now.toLocaleDateString('en-GB', { year: '2-digit', month: 'numeric', day: 'numeric' });
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

const novoSeasonalEngine = new NovoSeasonalThemeEngine();
