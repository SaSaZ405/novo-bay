class NovoMoonGallery {
    constructor() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initDOM());
        } else {
            this.initDOM();
        }
    }

    initDOM() {
        const cell = document.getElementById('layer-D04');
        if (!cell) return;

        const balloon = cell.querySelector('.balloon-element') || cell;
        balloon.innerHTML = `
            <div id="moonTrigger" title="گالری مجازی و پورتال آثار (NOVO-MOON)" style="
                width: 32px;
                height: 32px;
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(148, 163, 184, 0.5);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.25s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            ">
                <i class="fas fa-moon text-slate-300 text-xs"></i>
            </div>
        `;

        document.getElementById('moonTrigger').addEventListener('click', (e) => {
            e.stopPropagation();
            this.showGuideModal();
        });
    }

    showGuideModal() {
        let modal = document.getElementById('iceGlassModal');
        if (!modal) return;

        document.getElementById('modalTitle').innerHTML = `🌙 گالری مجازی و پورتال آثار ملل (NOVO-MOON)`;
        document.getElementById('modalDesc').innerHTML = `
            <p class="mb-3 leading-relaxed text-xs">این بخش گالری تخصصی آثار، تصاویر نجومی، گرافیک‌های فرهنگی و دستاوردهای بین‌المللی پلتفرم NOVO-BAY است.</p>
            <p class="text-slate-500 leading-relaxed text-xs">با ورود به این بخش می‌توانید مجموعه‌ی بصری و نمایشگاه‌های دائمی شبکه را مشاهده کنید.</p>
        `;

        const footer = document.getElementById('modalFooter') || modal.querySelector('.border-t');
        if (footer) {
            footer.innerHTML = `
                <button id="cancelMoonBtn" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all">انصراف</button>
                <button id="enterMoonBtn" class="px-4 py-1.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md">ورود به گالری 🌙</button>
            `;

            document.getElementById('cancelMoonBtn').onclick = () => modal.classList.remove('active');
            document.getElementById('enterMoonBtn').onclick = () => {
                alert("ورود به گالری مجازی آثار...");
                modal.classList.remove('active');
            };
        }

        modal.classList.add('active');
    }
}

const novoMoon = new NovoMoonGallery();
