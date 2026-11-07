function handleButtonClick(type) {
    if (type === 'sun') {
        openChallengeModal(); // باز شدن پنل شیشه‌ای قوانین چالش با متن دقیق
    } else if (type === 'moon') {
        window.location.href = "index.html"; // یا لینک سایت اصلی
    }
}
