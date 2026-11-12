/* ==========================================================
   NOVO-BAY TRANSLATION & LANGUAGE ENGINE (D01 - Interactive)
   ========================================================== */

class NovoTranslateEngine {
    constructor() {
        this.currentLang = 'fa';
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        window.novoTranslateEngine = this;
        this.injectStyles();
        this.renderTranslateNode();
        this.renderModals();
    }

    injectStyles() {
        if (document.getElementById('novo-translate-styles')) return;
        const style = document.createElement('style');
        style.id = 'novo-translate-styles';
        style.innerHTML = `
            @keyframes spinGlobe {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .globe-spinning {
                animation: spinGlobe 12s linear infinite;
            }
            .translate-glass-modal {
                position: fixed; inset: 0; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(12px);
                z-index: 100000; display: flex; align-items: center; justify-content: center;
                opacity: 0; visibility: hidden; transition: all 0.3s ease;
            }
            .translate-glass-modal.active { opacity: 1; visibility: visible; }
            .translate-glass-card {
                background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);
                border-radius: 1.5rem; color: #0f172a; width: 90%; max-width: 400px;
                padding: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.35); direction: rtl; text-align: right;
            }
            .trans-ctrl-btn {
                width: 28px; height: 28px; border-radius: 50%; display: flex;
                align-items: center; justify-content: center; background: rgba(0,0,0,0.05);
                color: #64748b; transition: all 0.2s; cursor: pointer; border: none;
            }
            .trans-ctrl-btn:hover { background: rgba(245, 158, 11, 0.2); color: #0f172a; }
        `;
        document.head.appendChild(style);
    }

    renderTranslateNode() {
        const targetCell = document.getElementById('layer-D01');
        if (!targetCell) return;
        targetCell.innerHTML = ''; // پاکسازی سلول برای جلوگیری از تداخل با مختصات پیش‌فرض

        const container = document.createElement('div');
        container.className = 'balloon-element cursor-pointer flex items-center gap-2 bg-slate-900/80 border border-amber-500/40 px-3 py-1.5 rounded-xl shadow-lg hover:border-amber-400 transition';
        container.title = 'جهت معرفی کلیک کنید، برای باز کردن منو دابل‌کلیک کنید';
        
        container.innerHTML = `
            <div class="text-right">
                <div class="text-[10px] font-bold text-amber-300">زبان /</div>
                <div class="text-[9px] text-slate-300">Translation</div>
            </div>
            <i class="fas fa-globe text-amber-400 text-base globe-spinning" id="globeIcon"></i>
        `;

        // اولین کلیک: باز شدن توضیحات کوتاه و معرفی
        container.onclick = (e) => {
            e.stopPropagation();
            this.openIntroModal();
        };

        // دابل کلیک: باز شدن پنل اصلی انتخاب زبان
        container.ondblclick = (e) => {
            e.stopPropagation();
            this.openMainModal();
        };

        targetCell.appendChild(container);
    }

    renderModals() {
        if (document.getElementById('transIntroModal')) return;

        // مودال معرفی کوتاه (مرحله اول)
        const introDiv = document.createElement('div');
        introDiv.id = 'transIntroModal';
        introDiv.className = 'translate-glass-modal';
        introDiv.innerHTML = `
            <div class="translate-glass-card relative">
                <div class="absolute top-4 left-4 flex items-center gap-1.5">
                    <button onclick="window.novoTranslateEngine.closeAllModals()" class="trans-ctrl-btn" title="بستن">
                        <i class="fas fa-times text-xs"></i>
                    </button>
                </div>
                <h3 class="text-sm font-bold mb-2 text-slate-900 flex items-center gap-2 pl-12">
                    <i class="fas fa-globe text-amber-500 globe-spinning"></i> معرفی سیستم آوای ملل و زبان‌ها
                </h3>
                <p class="text-[11px] text-slate-700 mb-4 leading-relaxed">
                    این بخش دروازه ارتباطی پلتفرم مگا-شهر نوو-بی با مخاطبین بین‌المللی است. با انتخاب زبان‌های مختلف، ساختار فرامین و محتوا متناسب با هاب منطقه‌ای تنظیم می‌گردد.
                </p>
                <div class="flex items-center justify-between pt-2 border-t border-slate-200">
                    <button onclick="window.novoTranslateEngine.closeAllModals()" class="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-xl text-[11px] font-medium hover:bg-slate-300">
                        انصراف (×)
                    </button>
                    <button onclick="window.novoTranslateEngine.openMainModal()" class="px-4 py-1.5 bg-amber-500 text-white rounded-xl text-[11px] font-bold shadow hover:bg-amber-600">
                        مرحله بعد (انتخاب زبان)
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(introDiv);

        // مودال اصلی انتخاب زبان و توضیحات مفصل (مرحله دوم / دابل کلیک)
        const mainDiv = document.createElement('div');
        mainDiv.id = 'transMainModal';
        mainDiv.className = 'translate-glass-modal';
        mainDiv.innerHTML = `
            <div class="translate-glass-card relative">
                <div class="absolute top-4 left-4 flex items-center gap-1.5">
                    <button onclick="window.novoTranslateEngine.openIntroModal()" class="trans-ctrl-btn" title="بازگشت به معرفی">
                        <i class="fas fa-arrow-right text-xs"></i>
                    </button>
                    <button onclick="window.novoTranslateEngine.closeAllModals()" class="trans-ctrl-btn" title="بستن">
                        <i class="fas fa-times text-xs"></i>
                    </button>
                </div>
                <h3 class="text-sm font-bold mb-2 text-slate-900 flex items-center gap-2 pl-16">
                    <i class="fas fa-language text-amber-500"></i> انتخاب زبان پلتفرم (Language Matrix)
                </h3>
                <p class="text-[11px] text-slate-600 mb-4 leading-relaxed">
                    زبان مد نظر خود را برای پویایی در مگا-پلتفرم نوو-بی انتخاب کنید:
                </p>
                <div class="grid grid-cols-2 gap-2 mb-4">
                    <button onclick="window.novoTranslateEngine.setLanguage('fa')" class="p-2.5 rounded-xl border border-amber-500/40 bg-amber-50 text-amber-900 text-xs font-bold hover:bg-amber-100 transition flex items-center justify-center gap-2">
                        🇮🇷 فارسی (Fa)
                    </button>
                    <button onclick="window.novoTranslateEngine.setLanguage('en')" class="p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-xs font-bold hover:bg-slate-100 transition flex items-center justify-center gap-2">
                        🇬🇧 English (En)
                    </button>
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-slate-200">
                    <button onclick="window.novoTranslateEngine.openIntroModal()" class="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-xl text-[11px]">
                        بازگشت
                    </button>
                    <button onclick="window.novoTranslateEngine.closeAllModals()" class="px-4 py-1.5 bg-amber-500 text-white rounded-xl text-[11px] font-bold shadow">
                        بستن پنجره (×)
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(mainDiv);
    }

    openIntroModal() {
        this.closeAllModals();
        document.getElementById('transIntroModal')?.classList.add('active');
    }

    openMainModal() {
        this.closeAllModals();
        document.getElementById('transMainModal')?.classList.add('active');
    }

    closeAllModals() {
        document.getElementById('transIntroModal')?.classList.remove('active');
        document.getElementById('transMainModal')?.classList.remove('active');
    }

    setLanguage(lang) {
        this.currentLang = lang;
        alert(lang === 'fa' ? 'زبان پلتفرم روی فارسی تنظیم شد.' : 'Platform language set to English.');
        this.closeAllModals();
    }
}

const novoTranslateEngine = new NovoTranslateEngine();
