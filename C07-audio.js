/* ==========================================================
   NOVO-BAY: C07-audio.js
   Persistent Floating Audio Player Component (5 Selected Tracks)
   ========================================================== */

(function () {
  // لیست ۵ ترک انتخابی با نام دقیق فایل‌ها در مخزن
  const playlist = [
    { title: 'ترک ۵ - پرشور و مدرن', tag: 'سنتور و گیتار', src: 'track5.mp3' },
    { title: 'ترک ۶ - تلفیقی و فضاساز', tag: 'پیانو و تار', src: 'track6.mp3' },
    { title: 'ترک ۴ - ریتمیک و مدرن', tag: 'تلفیقی جهان', src: 'track4.mp3' },
    { title: 'ترک ۸ - شاد و رقصان', tag: 'تنبک و تار', src: 'track8.mp3' },
    { title: 'ترک ۲ - کلاسیک و احساسی', tag: 'ویولن و سنتور', src: 'track2.mp3' }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;

  const audio = new Audio();
  audio.preload = 'auto';

  // تزریق استایل‌های CSS پلیر شناور در گوشه صفحه
  const style = document.createElement('style');
  style.innerHTML = `
    .nb-audio-float-player {
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 999999;
      background: rgba(22, 33, 62, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(233, 69, 96, 0.4);
      border-radius: 14px;
      padding: 10px 16px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
      color: #ffffff;
      font-family: Tahoma, sans-serif;
      direction: rtl;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .nb-player-info {
      display: flex;
      flex-direction: column;
      max-width: 150px;
    }
    .nb-player-title {
      font-size: 0.8rem;
      font-weight: bold;
      color: #e94560;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .nb-player-tag {
      font-size: 0.65rem;
      color: #b0b0c0;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .nb-player-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .nb-btn {
      background: #0f3460;
      border: none;
      color: #ffffff;
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
      background: #e94560;
    }
    .nb-btn-play {
      background: #e94560;
      width: 38px;
      height: 38px;
      font-size: 0.95rem;
    }
  `;
  document.head.appendChild(style);

  // ساختار HTML پلیر با ۴ دکمه اصلی
  const playerContainer = document.createElement('div');
  playerContainer.className = 'nb-audio-float-player';
  playerContainer.innerHTML = `
    <div class="nb-player-info">
      <span id="nb-title" class="nb-player-title">آماده پخش</span>
      <span id="nb-tag" class="nb-player-tag">موزیک پلیر</span>
    </div>
    <div class="nb-player-controls">
      <button id="nb-prev" class="nb-btn" title="ترک قبلی">⏭</button>
      <button id="nb-play" class="nb-btn nb-btn-play" title="پخش / توقف">▶</button>
      <button id="nb-stop" class="nb-btn" title="توقف کامل">⏹</button>
      <button id="nb-next" class="nb-btn" title="ترک بعدی">⏮</button>
    </div>
  `;

  // تابع تزریق پلیر به صفحه
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
    const track = playlist[index];
    audio.src = track.src;
    document.getElementById('nb-title').textContent = track.title;
    document.getElementById('nb-tag').textContent = track.tag;
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

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    document.getElementById('nb-play').textContent = '▶';
  }

  // مدیریت رویداد دکمه‌ها
  document.addEventListener('click', (e) => {
    const playBtn = e.target.closest('#nb-play');
    const stopBtn = e.target.closest('#nb-stop');
    const nextBtn = e.target.closest('#nb-next');
    const prevBtn = e.target.closest('#nb-prev');

    if (playBtn) {
      if (isPlaying) { pauseAudio(); } else { playAudio(); }
    } else if (stopBtn) {
      stopAudio();
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
