(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('#theme-toggle');
  const languageButton = document.querySelector('#lang-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const description = document.querySelector('meta[name="description"]');
  const englishDescription = description.content;
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const navLinks = [...document.querySelectorAll('.site-nav__links a')];
  const sections = navLinks.map(link => document.querySelector(link.hash));

  function remember(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }

  function darkMode() {
    return root.dataset.theme ? root.dataset.theme === 'dark' : systemTheme.matches;
  }

  function updateControls() {
    const chinese = root.dataset.lang === 'zh';
    const dark = darkMode();
    languageButton.setAttribute('aria-label', chinese ? 'Switch to English' : '切换到中文');
    themeButton.setAttribute('aria-label', dark
      ? (chinese ? '切换到浅色模式' : 'Switch to light theme')
      : (chinese ? '切换到深色模式' : 'Switch to dark theme'));
    themeColor.content = dark ? '#121212' : '#fafaf8';
    description.content = chinese ? 'Zihao Pan 的学术主页。研究方向为生成建模与表征学习。' : englishDescription;
    if (chinese && !document.querySelector('#font-zh')) {
      const font = document.createElement('link');
      font.id = 'font-zh';
      font.rel = 'stylesheet';
      font.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&display=swap';
      document.head.append(font);
    }
    document.querySelectorAll('[data-title-zh]').forEach(link => {
      link.title = chinese ? link.dataset.titleZh : 'Email';
    });
  }

  languageButton.addEventListener('click', () => {
    const next = root.dataset.lang === 'zh' ? 'en' : 'zh';
    root.dataset.lang = next;
    root.lang = next === 'zh' ? 'zh-Hans' : 'en';
    const url = new URL(location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', next);
      history.replaceState(null, '', url);
    }
    remember('lang', next);
    updateControls();
    requestNavUpdate();
  });

  themeButton.addEventListener('click', () => {
    const next = darkMode() ? 'light' : 'dark';
    root.dataset.theme = next;
    remember('theme', next);
    updateControls();
  });
  systemTheme.addEventListener('change', updateControls);

  let frame = 0;
  function requestNavUpdate() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const threshold = document.querySelector('.site-header').offsetHeight + 36;
      let current = -1;
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= threshold) current = index;
      });
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= root.scrollHeight - 2) {
        const target = navLinks.findIndex(link => link.hash === location.hash);
        current = target >= 0 && sections[target].getBoundingClientRect().top >= threshold
          ? target : sections.length - 1;
      }
      navLinks.forEach((link, index) => {
        if (index === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }

  window.addEventListener('scroll', requestNavUpdate, { passive: true });
  window.addEventListener('resize', requestNavUpdate);
  window.addEventListener('hashchange', requestNavUpdate);
  document.fonts.ready.then(requestNavUpdate);
  updateControls();
  requestNavUpdate();
})();
