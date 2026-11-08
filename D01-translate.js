/* ==========================================================
   NOVO-BAY AUTONOMOUS TRANSLATION MODULE (D01 - FINAL)
   ========================================================== */
class NovoAutonomousTranslate {
    constructor() {
        if (window.D01_instance) return window.D01_instance;

        this.languages = [
            { code: 'fa', name: 'فارسی', dir: 'rtl' },
            { code: 'en', name: 'English (انگلیسی)', dir: 'ltr' },
            { code: 'ar', name: 'العربية (عربی اماراتی)', dir: 'rtl' },
            { code: 'zh', name: '中文 (چینی)', dir: 'ltr' },
            { code: 'ru', name: 'Русский (روسی)', dir: 'ltr' },
            { code: 'de', name: 'Deutsch (آلمانی)', dir: 'ltr' },
            { code: 'fr', name: 'Français (فرانسوی)', dir: 'ltr' },
            { code: 'it', name: 'Italiano (ایتالیایی)', dir: 'ltr' }
        ];

        this.currentLang = localStorage.getItem('novo_lang_code') || 'fa';
        window.D01_instance = this;
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
        const layer = document.getElementById('layer-D01');
        if (!layer) return;

        // استایل انیمیشن چرخش کره زمین و رفع مشکلات pointer-events
        const styleFix = document.createElement('style');
        styleFix.innerHTML = `
            @keyframes d01-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .d01-globe-spin {
                animation: d01-spin 12s linear infinite;
            }
            .ice-glass-overlay { pointer-events: auto !important; }
            .interactive-node { pointer-events: auto !important; }
        `;
        document.head.appendChild(styleFix);

        const htmlContent = `
            <!-- دکمه بالا سمت راست با نماد کره زمین چرخان -->
            <div class="absolute top-4 right-4 interactive-node flex items-center">
                <div class="relative">
                    <button id="D01_mainBtn" class="bg-gray-900/80 hover:bg-gray-800 text-amber-400 px-3 py-2 rounded-xl border border-gray-700 shadow-xl flex items-center gap-2 cursor-pointer transition select-none">
                        <i class="fa-solid fa-globe text-sm d01-globe-spin text-amber-400"></i>
                        <span class="text-[11px] font-bold">زبان / Translation</span>
                    </button>
                    <!-- معرفی کوچک اولیه -->
                    <div id="D01_tooltip" class="hidden absolute top-12 right-0 bg-white/90 backdrop-blur-md text-slate-900 border border-white text-[10px] font-bold py-1 px-2.5 rounded-xl whitespace-nowrap shadow-xl pointer-events-none">
                        انتخاب زبان و ترجمه پلتفرم 🌐 (ضربه بعدی: راهنما)
                    </div>
                </div>
            </div>

            <!-- صفحه توضیحات اصلی (باکس متناسب) -->
            <div id="D01_mainModal" class="ice-glass-overlay">
                <div class="ice-glass-card text-xs leading-relaxed max-w-[420px] w-[90vw]">
                    <div class="flex items-center justify-between mb-3 border-b border-slate-300/80 pb-2">
                        <h3 class="text-xs text-slate-900 flex items-center gap-2 font-black">
                            <i class="fa-solid fa-globe text-amber-600"></i>
                            راهنمای انتخاب زبان و بستر ترجمه (NOVO-BAY)
                        </h3>
                        <button id="D01_closeMain" class="text-slate-500 hover:text-slate-900 cursor-pointer text-sm font-bold p-1">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-2 text-[11px] text-slate-800 font-bold leading-relaxed">
                        <p>تمام زبان‌هایی که در این لیست قابل مشاهده است، جهت رفاه عملکرد کاربر در ادامه مسیر در نظر گرفته شده است.</p>
                        <p class="text-slate-700 bg-white/60 p-2.5 rounded-xl border border-white leading-relaxed">
                            لازم به تذکر است که کاربر با انتخاب هر زبان در تمام مسیر با همان زبان اطلاعات، بخش‌ها، موسیقی‌ها و چالش‌ها را مشاهده خواهد کرد. امیدواریم از حضور در این صفحات لذت ببرید.
                        </p>
                    </div>

                    <div class="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-slate-300/80">
                        <button id="D01_cancelMain" class="btn-ice-glass px-3 py-1.5 rounded-xl text-[11px]">
                            مرحله قبل
                        </button>
                        <button id="D01_okBtn" class="btn-ice-glass px-4 py-1.5 rounded-xl text-[11px] bg-amber-500/20 font-black">
                            ادامه و انتخاب زبان ➔
                        </button>
                    </div>
                </div>
            </div>

            <!-- صفحه انتخاب لیست زبان‌ها -->
            <div id="D01_langModal" class="ice-glass-overlay">
                <div class="ice-glass-card max-w-[400px] w-[90vw] text-xs">
                    <div class="flex items-center justify-between mb-3 border-b border-slate-300/80 pb-2">
                        <h3 class="text-xs text-slate-900 font-black flex items-center gap-2">
                            <i class="fa-solid fa-language text-amber-600"></i> انتخاب زبان پلتفرم
                        </h3>
                        <button id="D01_closeLang" class="text-slate-500 hover:text-slate-900 cursor-pointer text-sm font-bold p-1">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-1.5 max-h-[220px] overflow-y-auto mb-3 p-1">
                        ${this.languages.map(lang => `
                            <div onclick="window.D01_instance.setLanguage('${lang.code}', '${lang.dir}')" class="p-2.5 ${this.currentLang === lang.code ? 'bg-amber-100 border-amber-400' : 'bg-white/50'} hover:bg-white/90 rounded-xl cursor-pointer flex justify-between items-center text-[11px] font-bold border border-slate-200 transition">
                                <span>${lang.name}</span>
                                ${this.currentLang === lang.code ? '<i class="fa-solid fa-check text-amber-600 text-xs"></i>' : '<span class="text-[10px] text-gray-400">انتخاب</span>'}
                            </div>
                        `).join('')}
                    </div>

                    <div class="mt-4 flex items-center justify-between pt-2 border-t border-slate-300/80">
                        <button id="D01_backToMain" class="btn-ice-glass px-3 py-1.5 rounded-xl text-[11px]">
                            مرحله قبل
                        </button>
                        <button onclick="document.getElementById('D01_langModal').classList.remove('active');" class="btn-ice-glass px-4 py-1.5 rounded-xl text-[11px]">
                            تایید و خروج
                        </button>
                    </div>
                </div>
            </div>
        `;

        layer.innerHTML = htmlContent;
        this.bindEvents();
    }

    bindEvents() {
        const btn = document.getElementById('D01_mainBtn');
        const tooltip = document.getElementById('D01_tooltip');
        const mainModal = document.getElementById('D01_mainModal');
        const langModal = document.getElementById('D01_langModal');

        // مرحله اول: ضربه اول = نمایش معرفی کوچک، ضربه دوم = باز شدن توضیحات اصلی
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

        document.getElementById('D01_closeMain').addEventListener('click', closeModalFunc);
        document.getElementById('D01_cancelMain').addEventListener('click', closeModalFunc);

        // زدن دکمه ادامه برای ورود به لیست زبان‌ها
        document.getElementById('D01_okBtn').addEventListener('click', () => {
            mainModal.classList.remove('active');
            langModal.classList.add('active');
        });

        document.getElementById('D01_closeLang').addEventListener('click', () => {
            langModal.classList.remove('active');
            tooltip.classList.add('hidden');
        });

        document.getElementById('D01_backToMain').addEventListener('click', () => {
            langModal.classList.remove('active');
            mainModal.classList.add('active');
        });
    }

    setLanguage(code, dir) {
        this.currentLang = code;
        localStorage.setItem('novo_lang_code', code);
        localStorage.setItem('novo_lang_dir', dir);
        
        // اعمال جهت صفحه (RTL / LTR) روی ریشه سند
        const root = document.getElementById('htmlRoot') || document.documentElement;
        root.setAttribute('dir', dir);
        root.setAttribute('lang', code);

        // به‌روزرسانی لیست
        const modal = document.getElementById('D01_langModal');
        if (modal) {
            modal.classList.remove('active');
        }
        this.injectComponent();
        
        // اعلان موفقیت‌آمیز
        console.log(`Language changed to: ${code} (${dir})`);
    }
}

const novoTranslate = new NovoAutonomousTranslate();
