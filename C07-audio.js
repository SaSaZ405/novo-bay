/* ==========================================================
   NOVO-BAY: C07-audio-media-control.js
   Persistent Floating Audio Player Component (5 Selected Tracks)
   ========================================================== */

(function () {
  // لیست ۵ ترک انتخابی با پتانسیل جذب مخاطب بین‌المللی
  const playlist = [
    { id: 5, title: 'ترک ۵ - پرشور و مدرن', tag: 'سنتور و گیتار فلامنکو', src: 'TRACK_5.mp3' },
    { id: 6, title: 'ترک ۶ - تلفیقی و فضاساز', tag: 'پیانو و تار', src: 'TRACK_6.mp3' },
    { id: 4, title: 'ترک ۴ - ریتمیک و مدرن', tag: 'تلفیقی جهان', src: 'TRACK_4.mp3' },
    { id: 8, title: 'ترک ۸ - شاد و رقصان', tag: 'تنبک و تار', src: 'TRACK_8.mp3' },
    { id: 2, title: 'ترک ۲ - کلاسیک و احساسی', tag: 'ارکسترال زهی و سنتور', src: 'TRACK_2.mp3' }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;

  // ۱. ایجاد المنت صوتی مخفی
  const audio = new Audio();
  audio.preload = 'metadata';

  // ۲. تزریق استایل‌های CSS پلیر شناور
  const style = document.createElement('style');
  style.innerHTML = `
    .nb-audio-float-player {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 99999;
      background: rgba(22, 33, 62, 0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(233, 69, 96, 0.3);
      border-radius: 16px;
      padding: 12px 18px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      color: #ffffff;
      font-family: system-ui, -apple-system, sans-serif;
      direction: rtl;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: all 0.3s ease;
    }

    .nb-player-info {
      display: flex;
      flex-direction: column;
      max-width: 170px;
    }

    .nb-player-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: #e94560;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nb-player-tag {
      font-size: 0.7rem;
      color: #a0a0b0;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nb-player-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nb-btn {
      background: #0f3460;
      border: none;
      color: #ffffff;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      outline: none;
    }

    .nb-btn:hover {
      background: #e94560;
      transform: scale(1.08);
    }

    .nb-btn-play {
      background: #e94560;
      width: 42px;
      height: 42px;
      font-size: 1.1rem;
    }

    .nb-btn-play:hover {
      background: #ff5e78;
    }
  `;
  document.head.appendChild(style);

  // ۳. ساخت ساختار HTML پلیر شناور با ۴ دکمه اصلی
  const playerContainer = document.createElement('div');
  playerContainer.className = 'nb-audio-float-player';
  playerContainer.innerHTML = `
    <div class="nb-player-info">
      <span id="nb-title" class="nb-player-title">${playlist[0].title}</span>
      <span id="nb-tag" class="nb-player-tag">${playlist[0].tag}</span>
    </div>
    <div class="nb-player-controls">
      <!-- دکمه قبلی -->
      <button id="nb-prev" class="nb-btn" title="ترک قبلی">⏭</button>
      
      <!-- دکمه پلی / پوز -->
      <button id="nb-play" class="nb-btn nb-btn-play" title="پخش / توقف موقت">▶</button>
      
      <!-- دکمه استاپ -->
      <button id="nb-stop" class="nb-btn" title="توقف کامل">⏹</button>
      
      <!-- دکمه بعدی -->
      <button id="nb-next" class="nb-btn" title="ترک بعدی">⏮</button>
    </div>
  `;

  // افزودن پلیر به انتهای بدنه‌ی صفحه هنگام بارگذاری
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(playerContainer);
    loadTrack(currentTrackIndex);
  });

  // ۴. منطق عملکرد دکمه‌ها
  function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    document.getElementById('nb-title').textContent = track.title;
    document.getElementById('nb-tag').textContent = track.tag;
  }

  function playAudio() {
    audio.play();
    isPlaying = true;
    document.getElementById('nb-play').textContent = '❚❚';
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

  // رویداد کلیک دکمه‌ها
  document.addEventListener('click', (e) => {
    if (e.target.closest('#nb-play')) {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    } else if (e.target.closest('#nb-stop')) {
      stopAudio();
    } else if (e.target.closest('#nb-next')) {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      loadTrack(currentTrackIndex);
      playAudio();
    } else if (e.target.closest('#nb-prev')) {
      currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      loadTrack(currentTrackIndex);
      playAudio();
    }
  });

  // پخش خودکار ترک بعدی پس از اتمام آهنگ
  audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playAudio();
  });
})();
