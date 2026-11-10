/* ==========================================================
   NOVO-BAY CHALLENGE MODAL & PROTOCOL MANAGER (D05)
   ========================================================== */

// تزریق استایل‌های پنل شیشه‌ای یخی سفید برای خورشید
(function injectChallengeModalStyles() {
    const styleId = 'novo-challenge-modal-style';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
        .challenge-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease-in-out;
        }
        .challenge-modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        .challenge-modal-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.95);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border-radius: 1.5rem;
            width: 90%;
            max-width: 580px;
            padding: 2rem;
            color: #0f172a;
            transform: scale(0.95);
            transition: transform 0.3s ease-in-out;
            text-align: right;
            direction: rtl;
        }
        .challenge-modal-overlay.active .challenge-modal-card {
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
})();

// ساختار HTML پنل شیشه‌ای و قرار دادن آیکون خورشید در سلول R11:C8
function initSunChallengeModule() {
    const layerD05 = document.getElementById('layer-D05');
    if (layerD05 && !document.getElementById('sunTrigger')) {
        const balloon = layerD05.querySelector('.balloon-element') || layerD05;
        balloon.innerHTML = `
            <div id="sunTrigger" title="درگاه چالش‌های ساختاری (NOVO-SUN)" style="
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
                <i class="fa-solid fa-sun text-amber-400 text-xs"></i>
            </div>
        `;

        const sunTrigger = document.getElementById('sunTrigger');
        if (sunTrigger) {
            sunTrigger.addEventListener('click', function(e) {
                e.stopPropagation();
                openChallengeModal();
            });
        }
    }

    if (!document.getElementById('challengeModalOverlay')) {
        const modalHTML = `
            <div id="challengeModalOverlay" class="challenge-modal-overlay">
                <div class="challenge-modal-card">
                    <div class="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                        <h3 class="text-sm md:text-base font-bold text-slate-900 flex items-center gap-2">
                            <i class="fa-solid fa-rocket text-amber-500"></i>
                            قوانین و شرایط ورود به چالش‌های نوو-بی (NOVO-BAY Challenge Protocol)
                        </h3>
                        <button onclick="closeChallengeModal()" class="text-slate-400 hover:text-slate-700 transition cursor-pointer text-sm">
                            <i class="fa-solid fa-xmark text-lg"></i>
                        </button>
                    </div>
                    <div class="space-y-3 text-[11px] md:text-xs text-slate-600 leading-relaxed">
                        <p><strong>هدف پلتفرم:</strong> این بخش برای سنجش مهارت‌های تحلیلی، تصمیم‌گیری در شرایط بحران و حل مسائل پیچیده‌ی شهری و فضایی طراحی شده است.</p>
                        <p><strong>روند شرکت:</strong> با ورود به این بخش، شما با سناریوهای تعاملی و چالش‌های محاسباتی روبه‌رو خواهید شد که نیازمند دقت و تفکر سیستمی است.</p>
                        <p><strong>حریم و تعهد:</strong> اطلاعات و نتایج تحلیل‌های شما در چارچوب استانداردهای پژوهشی پلتفرم ثبت و پردازش می‌گردد.</p>
                        <p class="text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200 font-medium">
                            با کلیک بر روی دکمه‌ی «پذیرش و ورود»، موافقت خود را با چارچوب علمی و اجرایی این بخش اعلام می‌کنید.
                        </p>
                    </div>
                    <div class="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60">
                        <button onclick="closeChallengeModal()" class="px-4 py-2 rounded-xl text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer font-bold">
                            انصراف
                        </button>
                        <button onclick="acceptAndEnterChallenge()" class="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2">
                            <span>پذیرش و ورود به چالش</span>
                            <i class="fa-solid fa-arrow-left text-[10px]"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSunChallengeModule);
} else {
    initSunChallengeModule();
}
setTimeout(initSunChallengeModule, 300);

function openChallengeModal() {
    const overlay = document.getElementById('challengeModalOverlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function closeChallengeModal() {
    const overlay = document.getElementById('challengeModalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

function acceptAndEnterChallenge() {
    const currentLang = localStorage.getItem('novo_lang') || 'fa';
    window.location.href = "https://sasaz405.github.io/novo-bay-showcase/?lang=" + currentLang;
}

window.addEventListener('click', function(e) {
    const overlay = document.getElementById('challengeModalOverlay');
    if (e.target === overlay) {
        closeChallengeModal();
    }
});
