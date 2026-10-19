/* ==========================================================
   NOVO-BAY: C07-audio.js
   Minimal Gray Floating Audio Controller (3 Buttons)
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

  // تزریق استایل‌های شیک، مینیمال، طوسی و کوچک
  const style = document.createElement('style');
  style.innerHTML = `
    .nb-audio-float-player {
      position: fixed;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999999;
      background: rgba(45, 52, 54, 0.75);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 30px;
      padding: 6px 14px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .nb-player-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nb-btn {
      background: rgba(255, 255, 255, 0.12);
      border: none;
      color: #e0e0e0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      transition: all 0.2s ease;
      outline: none;
    }

    .nb-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      color: #ffffff;
      transform: scale(1.08);
    }

    .nb-btn-play {
      background: rgba(255, 255, 255, 0.25);
      width: 38px;
      height: 38px;
      font-size: 0.95rem;
      color: #ffffff;
    }

    .nb-btn-play:hover {
      background: rgba(255, 255, 255, 0.45);
    }
  `;
  document.head.appendChild(style);

  // ساختار پلیر با ۳ دکمه
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

    // حذف خودکار آیکون‌های اضافی و قدیمی زیر صفحه
    const extraIcons = document.querySelectorAll('.media-controls, .audio-icon, .music-btn, footer .fa-music, footer .fa-play');
    extraIcons.forEach(el => el.style.display = 'none');
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
