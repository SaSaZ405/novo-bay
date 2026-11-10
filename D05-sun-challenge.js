/* ==========================================================
   NOVO-BAY CHALLENGE MODAL & PROTOCOL MANAGER (D05)
   ========================================================== */

// تزریق استایل‌های پنل شیشه‌ای چالش
(function injectChallengeModalStyles() {
    const styleId = 'novo-challenge-modal-style';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
        .challenge-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(2, 6, 23, 0.88);
            backdrop-filter: blur(14px);
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
            background: rgba(15, 23, 42, 0.95);
            border: 1px solid rgba(245, 158, 11, 0.4);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 158, 11, 0.2);
            border-radius: 1.5rem;
            width: 90%;
            max-width: 580px;
            padding: 2rem;
            color: #f8fafc;
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
(function createChallengeModalDOM() {
    // ۱. تزریق آیکون خورشید در سلول R11:C8 (layer-D05)
    const layerD05 = document.getElementById('layer-D05') || document.getElementById('layer-D03');
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
    }

    // ۲. ساخت مودال چالش در بدنه صفحه
    if (document.getElementById('challengeModalOverlay')) return;

    const modalHTML = `
        <div id="challengeModalOverlay" class="challenge-modal-overlay">
            <div class="challenge-modal-card">
                <div class="flex items-center justify-between mb-4 border-b border-amber-500/30 pb-3">
                    <h3 class="text-sm md:text-base font-bold text-amber-300 flex items-center gap-2">
                        <i class="fa-solid fa-rocket text-amber-400"></i>
                        قوانین و شرایط ورود به چالش‌های نوو-بی (NOVO-BAY Challenge Protocol)
                    </h3>
                    <button onclick="closeChallengeModal()" class="text-gray-400 hover:text-white transition cursor-pointer text-sm">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="space-y-3 text-[11px] md:text-xs text-gray-300 leading-relaxed">
                    <p><strong>هدف پلتفرم:</strong> این بخش برای سنجش مهارت‌های تحلیلی، تصمیم‌گیری در شرایط بحران و حل مسائل پیچیده‌ی شهری و فضایی طراحی شده است.</p>
                    <p><strong>روند شرکت:</strong> با ورود به این بخش، شما با سناریوهای تعاملی و چالش‌های محاسباتی روبه‌رو خواهید شد که نیازمند دقت و تفکر سیستمی است.</p>
                    <p><strong>حریم و تعهد:</strong> اطلاعات و نتایج تحلیل‌های شما در چارچوب استانداردهای پژوهشی پلتفرم ثبت و پردازش می‌گردد.</p>
                    <p class="text-amber-200/90 bg-amber-950/40 p-3 rounded-xl border border-amber-500/30 font-medium">
                        با کلیک بر روی دکمه‌ی «پذیرش و ورود»، موافقت خود را با چارچوب علمی و اجرایی این بخش اعلام می‌کنید.
                    </p>
                </div>
                <div class="mt-6 flex items-center justify-end gap-3">
                    <button onclick="closeChallengeModal()" class="px-4 py-2 rounded-xl text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 transition cursor-pointer">
                        انصراف
                    </button>
                    <button onclick="acceptAndEnterChallenge()" class="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-gray-950 transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2">
                        <span>پذیرش و ورود به چالش</span>
                        <i class="fa-solid fa-arrow-left text-[10px]"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // اتصال رویداد کلیک به آیکون خورشید
    setTimeout(() => {
        const sunTrigger = document.getElementById('sunTrigger');
        if (sunTrigger) {
            sunTrigger.addEventListener('click', function(e) {
                e.stopPropagation();
                openChallengeModal();
            });
        }
    }, 100);
})();

// توابع کنترل‌کننده
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

// بستن با کلیک بیرون از کادر
window.addEventListener('click', function(e) {
    const overlay = document.getElementById('challengeModalOverlay');
    if (e.target === overlay) {
        closeChallengeModal();
    }
});
