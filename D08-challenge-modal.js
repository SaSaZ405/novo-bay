/* ==========================================================
   NOVO-BAY CHALLENGE MODAL & PROTOCOL MANAGER (D08)
   ========================================================== */

// تزریق استایل‌های مختص به پنل شیشه‌ای چالش به صورت داینامیک
(function injectChallengeModalStyles() {
    const styleId = 'novo-challenge-modal-style';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
        .challenge-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(2, 6, 23, 0.85);
            backdrop-filter: blur(12px);
            z-index: 9999;
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
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(245, 158, 11, 0.4);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(245, 158, 11, 0.15);
            border-radius: 1.5rem;
            width: 90%;
            max-width: 520px;
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

// ایجاد ساختار HTML پاپ‌آپ شیشه‌ای در صفحه
(function createChallengeModalDOM() {
    if (document.getElementById('challengeModalOverlay')) return;

    const modalHTML = `
        <div id="challengeModalOverlay" class="challenge-modal-overlay">
            <div class="challenge-modal-card">
                <div class="flex items-center justify-between mb-4 border-b border-amber-500/30 pb-3">
                    <h3 class="text-base font-bold text-amber-300 flex items-center gap-2">
                        <i class="fa-solid fa-rocket text-amber-400"></i>
                        پروتکل ورود به چالش‌های NOVO-BAY
                    </h3>
                    <button onclick="closeChallengeModal()" class="text-gray-400 hover:text-white transition cursor-pointer text-sm">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="space-y-3 text-xs text-gray-300 leading-relaxed">
                    <p><strong>هدف پلتفرم:</strong> سنجش مهارت‌های تحلیلی، تصمیم‌گیری در شرایط بحران و حل مسائل پیچیده‌ی شهری و فضایی.</p>
                    <p><strong>روند شرکت:</strong> رویارویی با سناریوهای تعاملی و چالش‌های محاسباتی نیازمند دقت و تفکر سیستمی.</p>
                    <p class="text-amber-200/80 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/20">
                        با کلیک بر روی دکمه «پذیرش و ورود»، موافقت خود را با چارچوب علمی و اجرایی این بخش اعلام می‌کنید.
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
})();

// توابع کنترل‌کننده رویدادهای چالش
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

// بستن مودال با کلیک بیرون از کادر
window.addEventListener('click', function(e) {
    const overlay = document.getElementById('challengeModalOverlay');
    if (e.target === overlay) {
        closeChallengeModal();
    }
});
