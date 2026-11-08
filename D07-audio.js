/* ==========================================================
   NOVO-BAY PERSISTENT AUDIO MODULE (D07)
   ========================================================== */
class NovoPersistentAudio {
    constructor() {
        if (window.novoGlobalAudioInstance) {
            return window.novoGlobalAudioInstance;
        }

        this.tracks = ['trac1.mp3', 'trac2.mp3', 'trac3.mp3', 'trac4.mp3', 'trac5.mp3', 'trac6.mp3', 'trac7.mp3', 'trac8.mp3', 'trac9.mp3'];
        this.currentTrackIndex = parseInt(localStorage.getItem('novo_track_idx') || '0');
        this.audioElement = new Audio(this.tracks[this.currentTrackIndex]);
        this.audioElement.loop = JSON.parse(localStorage.getItem('novo_loop_state') || 'false');
        this.audioElement.volume = parseFloat(localStorage.getItem('novo_vol_state') || '0.8');

        this.audioElement.addEventListener('ended', () => {
            if (!this.audioElement.loop) {
                this.playNext();
            } else {
                this.audioElement.play();
            }
        });

        window.novoGlobalAudioInstance = this;
    }

    togglePlay() {
        if (this.audioElement.paused) {
            this.audioElement.play().catch(e => console.log("Audio play deferred:", e));
            return true;
        } else {
            this.audioElement.pause();
            return false;
        }
    }

    playNext() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        localStorage.setItem('novo_track_idx', this.currentTrackIndex);
        this.audioElement.src = this.tracks[this.currentTrackIndex];
        this.audioElement.play();
    }

    setLoop(isLoop) {
        this.audioElement.loop = isLoop;
        localStorage.setItem('novo_loop_state', isLoop);
    }

    setVolume(val) {
        this.audioElement.volume = val;
        localStorage.setItem('novo_vol_state', val);
    }

    openPlaylistUI() {
        let plModal = document.getElementById('D07_playlistModal');
        if (!plModal) {
            const modalHTML = `
                <div id="D07_playlistModal" class="ice-glass-overlay active">
                    <div class="ice-glass-card w-[420px] text-xs">
                        <div class="flex items-center justify-between mb-3 border-b border-slate-300/80 pb-2">
                            <h3 class="text-xs text-amber-800 font-black"><i class="fa-solid fa-list-music"></i> لیست پخش و تنظیمات صوتی ملل</h3>
                            <button onclick="document.getElementById('D07_playlistModal').classList.remove('active')" class="text-slate-500 hover:text-slate-900 cursor-pointer text-sm"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <div class="space-y-2 max-h-[200px] overflow-y-auto mb-3 p-1">
                            ${this.tracks.map((tr, idx) => `
                                <div onclick="window.novoGlobalAudioInstance.selectTrack(${idx})" class="p-2 bg-white/50 hover:bg-white/90 rounded-xl cursor-pointer flex justify-between items-center text-[11px] font-bold border border-slate-200">
                                    <span>ترک شماره ${idx + 1} (${tr})</span>
                                    <i class="fa-solid fa-play text-amber-600 text-[10px]"></i>
                                </div>
                            `).join('')}
                        </div>
                        <div class="pt-3 border-t border-slate-300/80 space-y-2 text-[11px] font-bold">
                            <div class="flex items-center justify-between">
                                <span>تکرار تک‌آهنگ:</span>
                                <input type="checkbox" id="D07_loopCheck" ${this.audioElement.loop ? 'checked' : ''} onchange="window.novoGlobalAudioInstance.setLoop(this.checked)" class="w-4 h-4 accent-amber-500 cursor-pointer">
                            </div>
                            <div class="flex items-center justify-between gap-2">
                                <span>تنظیم صدا:</span>
                                <input type="range" min="0" max="1" step="0.1" value="${this.audioElement.volume}" oninput="window.novoGlobalAudioInstance.setVolume(this.value)" class="w-28 accent-amber-500 cursor-pointer">
                            </div>
                        </div>
                        <div class="mt-4 flex justify-end">
                            <button onclick="document.getElementById('D07_playlistModal').classList.remove('active'); window.novoGlobalAudioInstance.togglePlay();" class="px-4 py-2 rounded-xl text-[11px] font-black bg-amber-500 text-slate-950 cursor-pointer shadow-md">
                                پخش / توقف و خروج
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        } else {
            plModal.classList.add('active');
        }
    }

    selectTrack(idx) {
        this.currentTrackIndex = idx;
        localStorage.setItem('novo_track_idx', idx);
        this.audioElement.src = this.tracks[idx];
        this.audioElement.play();
    }
}

const novoAudio = new NovoPersistentAudio();
