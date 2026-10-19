/* ==========================================================
   NOVO-BAY: C07-audio.js
   Minimal Gray Floating Audio Controller (Bottom-Left Fixed)
   ========================================================== */

(function () {
  const playlist = [
    'track5.mp3',
    'track6.mp3',
    'track4.mp3',
    'track8.mp3',
    'track2.mp3'
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;

  const audio = new Audio();
  audio.preload = 'auto';

  // استایل‌های بسیار کوچک، شیک و سنجاق‌شده دقیقاً در پایین گوشه سمت چپ
  const style = document.createElement('style');
  style.innerHTML = `
    .nb-audio-float-player {
      position: fixed !important;
      bottom: 16px !important;
      left: 16px !important;
      z-index: 999999 !important;
      background: rgba(45, 52, 54, 0.85) !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      border-radius: 20px !important;
      padding: 3px 8px !important;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4) !important;
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
      direction: ltr !important;
    }

    .nb-player-controls {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
    }

    .nb-btn {
      background: rgba(255, 255, 255, 0.15) !important;
      border: none !important;
      color: #e0e0e0 !important;
      width: 24px !important;
      height: 24px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 0.65rem !important;
      transition: all 0.2s ease !important;
      outline: none !important;
    }

    .nb-btn:hover {
      background: rgba(255, 255, 255, 0.35) !important;
      color: #ffffff !important;
      transform: scale(1.08) !important;
    }

    .nb-btn-play {
      background: rgba(255, 255, 255, 0.3) !important;
      width: 28px !important;
      height: 28px !important;
      font-size: 0.75rem !important;
      color: #ffffff !important;
    }

    .nb-btn-play:hover {
      background: rgba(255, 255, 255, 0.5) !important;
    }
  `;
  document.head.appendChild(style);

  // ساختار ۳ دکمه‌ای مینیمال
  const playerContainer = document.createElement('div');
  playerContainer.className = 'nb-audio-float-player';
  playerContainer.innerHTML = `
    <div class="nb-player-controls">
      <button id="nb-prev" class="nb-btn" title="قبلی">⏭</button>
      <button id="nb-play" class="nb-btn nb-btn-play" title="پخش / توقف">▶</button>
      <button id="nb-next" class="nb-btn" title="بعدی">⏮</button>
    </div>
  `;

  function initPlayer() {
    if (!document.body.contains(playerContainer)) {
      document.body.appendChild(playerContainer);
    }
    loadTrack(currentTrackIndex);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }

  function loadTrack(index) {
    audio.src = playlist[index];
  }

  function playAudio() {
    audio.play().then(() => {
      isPlaying = true;
      document.getElementById('nb-play').textContent = '❚❚';
    }).catch(e => console.log("Play error:", e));
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    document.getElementById('nb-play').textContent = '▶';
  }

  document.addEventListener('click', (e) => {
    const playBtn = e.target.closest('#nb-play');
    const nextBtn = e.target.closest('#nb-next');
    const prevBtn = e.target.closest('#nb-prev');

    if (playBtn) {
      if (isPlaying) { pauseAudio(); } else { playAudio(); }
    } else if (nextBtn) {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      loadTrack(currentTrackIndex);
      playAudio();
    } else if (prevBtn) {
      currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      loadTrack(currentTrackIndex);
      playAudio();
    }
  });

  audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playAudio();
  });
})();
