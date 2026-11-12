/* ==========================================================
   NOVO-BAY TRANSLATION & LANGUAGE ENGINE (D01 - Global Dispatcher)
   ========================================================== */

class NovoTranslateEngine {
    constructor() {
        this.currentLang = localStorage.getItem('novo_lang') || 'fa';
        this.languages = [
            { code: 'fa', name: 'فارسی (Persian)', flag: '🇮🇷', dir: 'rtl' },
            { code: 'en', name: 'English (UK/US)', flag: '🇬🇧', dir: 'ltr' },
            { code: 'ru', name: 'Русский (Russian)', flag: '🇷🇺', dir: 'ltr' },
            { code: 'ar', name: 'العربية (UAE Arabic)', flag: '🇦🇪', dir: 'rtl' },
            { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳', dir: 'ltr' },
            { code: 'fr', name: 'Français (French)', flag: '🇫🇷', dir: 'ltr' },
            { code: 'de', name: 'Deutsch (German)', flag: '🇩🇪', dir: 'ltr' },
            { code: 'it', name: 'Italiano (Italian)', flag: '🇮🇹', dir: 'ltr' }
        ];

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
        this.applyLanguage(this.currentLang, false); // اعمال زبان ذخیره شده اولیه
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
            .globe-spinning { animation: spinGlobe 12s linear infinite; }
            .translate-glass-modal {
                position: fixed; inset: 0; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(12px);
                z-index: 100000; display: flex; align-items: center; justify-content: center;
                opacity: 0; visibility: hidden; transition: all 0.3s ease;
            }
            .translate-glass-modal.active { opacity: 1; visibility: visible; }
            .translate-glass-card {
                background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);
                border-radius: 1.5rem; color: #0f172a; width: 90%; max-width: 420px;
                padding: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.35); direction: rtl; text-align: right;
            }
            .trans-ctrl-btn {
                width: 28px; height: 28px; border-radius: 50%; display: flex;
                align-items: center; justify-content: center; background: rgba(0,0,0,0.05);
                color: #64748b; transition: all 0.2s; cursor: pointer; border: none;
            }
            .trans-ctrl-btn:hover { background: rgba(245, 158, 11, 0.2); color: #0f172a; }
            .lang-scroll-box {
                max-height: 210px; overflow-y: auto; padding-right: 4px;
            }
            .lang-scroll-box::-webkit-scrollbar { width: 4px; }
            .lang-scroll-box::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        `;
        document.head.appendChild(style);
    }

    renderTranslateNode() {
        const targetCell = document.getElementById('layer-D01');
        if (!targetCell) return;
        targetCell.innerHTML = '';
        targetCell.style.position = 'relative';

        const container = document.createElement('div');
        container.className = 'absolute inset-1 cursor-pointer flex items-center justify-center gap-1.5 bg-slate-900/90 border border-amber-500/50 rounded-lg shadow-md hover:border-amber-400 transition';
        container.title = 'برای معرفی کلیک کنید، برای منوی زبان دابل‌کلیک کنید';
        
        container.innerHTML = `
            <div class="text-right truncate">
                <div class="text-[9px] font-bold text-amber-300 leading-tight">زبان</div>
                <div class="text-[8px] text-slate-300 leading-tight">Lang</div>
            </div>
            <i class="fas fa-globe text-amber-400 text-sm globe-spinning" id="globeIcon"></i>
        `;

        container.onclick = (e) => { e.stopPropagation(); this.openIntroModal(); };
        container.ondblclick = (e) => { e.stopPropagation(); this.openMainModal(); };

        targetCell.appendChild(container);
    }

    renderModals() {
        if (document.getElementById('transIntroModal')) return;

        // مودال معرفی کوتاه
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
                    <i class="fas fa-globe text-amber-500 globe-spinning"></i> معرفی درگاه آوای ملل و زبان‌ها
                </h3>
                <p class="text-[11px] text-slate-700 mb-4 leading-relaxed">
                    این پلتفرم با هدف پیوند میان فرهنگ‌ها و توسعه همکاری‌های بین‌المللی، به <b>هشت زبان زنده دنیا</b> مجهز شده است. زبان انتخابی شما در تمامی صفحات همراهتان خواهد بود. همچنین نواهای اصیل ملل در صفحه نخست طنین‌انداز است؛ شنیدن یا عبور از آن، به انتخاب شماست.
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

        // مودال انتخاب زبان
        const mainDiv = document.createElement('div');
        mainDiv.id = 'transMainModal';
        mainDiv.className = 'translate-glass-modal';
        
        let langButtonsHTML = '';
        this.languages.forEach(l => {
            langButtonsHTML += `
                <button onclick="window.novoTranslateEngine.setLanguage('${l.code}', '${l.name}')" class="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-[11px] font-semibold hover:border-amber-500 hover:bg-amber-50 transition flex items-center gap-2 text-right">
                    <span class="text-base">${l.flag}</span>
                    <span class="truncate">${l.name}</span>
                </button>
            `;
        });

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
                <h3 class="text-sm font-bold mb-1 text-slate-900 flex items-center gap-2 pl-16">
                    <i class="fas fa-language text-amber-500"></i> انتخاب زبان پلتفرم (۸ هاب فعال)
                </h3>
                <p class="text-[10px] text-slate-500 mb-3">زبان مد نظر خود را انتخاب نمایید:</p>
                
                <div class="lang-scroll-box grid grid-cols-2 gap-2 mb-3">
                    ${langButtonsHTML}
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

    setLanguage(code, name) {
        this.currentLang = code;
        localStorage.setItem('novo_lang', code);
        this.applyLanguage(code, true);
        this.closeAllModals();
    }

    applyLanguage(code, notify = true) {
        const langObj = this.languages.find(l => l.code === code) || this.languages[0];
        
        // تنظیم جهت صفحه (RTL یا LTR)
        document.documentElement.lang = code;
        document.documentElement.dir = langObj.dir;

        // انتشار سیگنال سراسری برای سایر فایل‌ها (D02, D03, D04, D05, D07, D09 و...)
        const event = new CustomEvent('novoLanguageChanged', { detail: { lang: code, langData: langObj } });
        window.dispatchEvent(event);

        if (notify) {
            alert(`زبان پلتفرم با موفقیت روی "${langObj.name}" تنظیم شد و بر کل ماتریکس اعمال گردید.`);
        }
    }
}

const novoTranslateEngine = new NovoTranslateEngine();
