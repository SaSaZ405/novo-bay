/* ==========================================================
   MODULE D07: AUDIO PLAYER (Tracks 1 to 9)
   ========================================================== */

(function() {
    const layerCell = document.getElementById('layer-D07');
    if (!layerCell) return;

    const balloon = layerCell.querySelector('.balloon-element');
    if (!balloon) return;

    balloon.innerHTML = `
        <button id="audioTriggerBtn" class="w-7 h-7 bg-slate-900/90 hover:bg-amber-500 text-amber-400 hover:text-white rounded-lg flex items-center justify-center shadow-lg transition-all border border-amber-500/40 cursor-pointer">
            <i class="fas fa-music text-xs"></i>
        </button>
    `;

    const modalHTML = `
        <div id="audioModalOverlay" class="ice-glass-overlay">
            <div class="ice-glass-card text-right relative" style="width: 340px;">
                <button id="closeAudioModal" class="absolute top-4 left-4 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer">
                    <i class="fas fa-times text-lg"></i>
                </button>
                <h3 class="text-base font-bold mb-3 text-slate-900 flex items-center gap-2">
                    <i class="fas fa-headphones text-amber-500"></i> آرشیو صوتی (۹ ترک)
                </h3>
                
                <div class="max-h-48 overflow-y-auto space-y-1.5 mb-4 pr-1 custom-scrollbar">
                    ${Array.from({length: 9}, (_, i) => `
                        <div class="flex items-center justify-between p-2 bg-slate-100 hover:bg-amber-50 rounded-xl border border-slate-200 transition-all">
                            <span class="text-xs font-medium text-slate-700">ترک شماره ${i + 1} (trac${i + 1}.mp3)</span>
                            <button onclick="playSpecificTrack(${i + 1})" class="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold shadow cursor-pointer transition-all">
                                <i class="fas fa-play ml-1"></i> پخش
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="bg-slate-900 text-white p-3 rounded-xl flex items-center justify-between shadow-inner">
                    <span id="currentPlayingLabel" class="text-[11px] text-amber-300 font-mono">در حال پخش: متوقف</span>
                    <div class="flex items-center gap-2">
                        <button onclick="toggleAudioPlayback()" class="w-8 h-8 bg-amber-500 hover:bg-amber-600 rounded-lg flex items-center justify-center text-white cursor-pointer transition-all shadow">
                            <i id="playPauseIcon" class="fas fa-play text-xs"></i>
                        </button>
                    </div>
                </div>

                <audio id="panelAudioPlayer" src="trac1.mp3" preload="none"></audio>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const triggerBtn = document.getElementById('audioTriggerBtn');
    const overlay = document.getElementById('audioModalOverlay');
    const closeBtn = document.getElementById('closeAudioModal');
    const panelPlayer = document.getElementById('panelAudioPlayer');
    const currentLabel = document.getElementById('currentPlayingLabel');
    const playPauseIcon = document.getElementById('playPauseIcon');

    triggerBtn.addEventListener('click', () => overlay.classList.add('active'));
    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });

    window.playSpecificTrack = function(trackNum) {
        panelPlayer.src = `trac${trackNum}.mp3`;
        panelPlayer.play().then(() => {
            playPauseIcon.className = 'fas fa-pause text-xs';
            currentLabel.innerText = `در حال پخش: ترک ${trackNum}`;
        }).catch(e => {
            currentLabel.innerText = `خطا در پخش ترک ${trackNum}`;
        });
    };

    window.toggleAudioPlayback = function() {
        if (panelPlayer.paused) {
            panelPlayer.play().then(() => {
                playPauseIcon.className = 'fas fa-pause text-xs';
                currentLabel.innerText = `در حال پخش`;
            });
        } else {
            panelPlayer.pause();
            playPauseIcon.className = 'fas fa-play text-xs';
            currentLabel.innerText = `متوقف شد`;
        }
    };
})();
