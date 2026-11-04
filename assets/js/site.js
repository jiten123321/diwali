/* =========================================================
   Ladoo's Little Diwali Boutique — shared engine
   header/footer · page transitions · golden particles & hearts
   ambient music · diya art · reveal-on-scroll
   ========================================================= */
(function(){
  const G = window.GULAAB;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, d){ try{ const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); }catch(e){ return d; } },
    set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  };
  const session = {
    get(k){ try{ return sessionStorage.getItem(k); }catch(e){ return null; } },
    set(k, v){ try{ sessionStorage.setItem(k, v); }catch(e){} },
    del(k){ try{ sessionStorage.removeItem(k); }catch(e){} }
  };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page || '';

  const PAGES = [
    ['index.html',     'Surprise',  'surprise'],
    ['gift.html',      'Your Gift', 'gift'],
    ['celebrate.html', 'Celebrate', 'celebrate'],
  ];

  /* ---------------- diya SVG ---------------- */
  let artN = 0;
  function diyaSVG(){
    const n = ++artN;
    return `<svg viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="dg${n}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd27a" stop-opacity=".75"/><stop offset=".4" stop-color="#ff9d3a" stop-opacity=".25"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient>
        <linearGradient id="dc${n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8693a"/><stop offset=".55" stop-color="#9a4322"/><stop offset="1" stop-color="#5e2412"/></linearGradient>
        <linearGradient id="do${n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6c66a"/><stop offset="1" stop-color="#b8792a"/></linearGradient>
        <radialGradient id="df${n}" cx=".5" cy=".75" r=".7"><stop offset="0" stop-color="#fffbe8"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".7" stop-color="#ffa53a"/><stop offset="1" stop-color="#ff6a12" stop-opacity=".2"/></radialGradient>
      </defs>
      <circle class="glow" cx="60" cy="52" r="58" fill="url(#dg${n})"/>
      <ellipse cx="60" cy="98" rx="38" ry="5" fill="#000" opacity=".25"/>
      <path d="M14 70 C18 92 40 100 60 100 C80 100 102 92 106 70 C96 66 86 65 74 66 L60 52 L46 66 C34 65 24 66 14 70Z" fill="url(#dc${n})"/>
      <path d="M14 70 C30 64 46 66 60 68 C74 66 90 64 106 70 C92 76 76 78 60 78 C44 78 28 76 14 70Z" fill="#4a1a0c"/>
      <path d="M22 71 C36 68 48 70 60 71 C72 70 84 68 98 71 C86 74 74 75 60 75 C46 75 34 74 22 71Z" fill="url(#do${n})" opacity=".9"/>
      <g fill="#f3c46b" opacity=".85"><circle cx="30" cy="84" r="1.8"/><circle cx="42" cy="89" r="1.8"/><circle cx="60" cy="91" r="2"/><circle cx="78" cy="89" r="1.8"/><circle cx="90" cy="84" r="1.8"/></g>
      <path d="M24 80 Q60 96 96 80" stroke="#f3c46b" stroke-width="1" fill="none" opacity=".6"/>
      <path class="wick" d="M60 70 L60 62" stroke="#3a1a0a" stroke-width="2.4" stroke-linecap="round" fill="#3a1a0a"/>
      <g class="flame">
        <path d="M60 64 C50 54 52 40 60 22 C68 40 70 54 60 64Z" fill="url(#df${n})"/>
        <path d="M60 62 C55 56 56 47 60 38 C64 47 65 56 60 62Z" fill="#fffdf2" opacity=".9"/>
        <ellipse cx="60" cy="60" rx="2.6" ry="3.2" fill="#6ab0ff" opacity=".55"/>
      </g>
    </svg>`;
  }
  function makeDiya(el){
    if(el.dataset.ready) return;
    el.dataset.ready = 1;
    el.innerHTML = diyaSVG();
  }

  /* ---------------- chrome ---------------- */
  const icons = {
    x:'<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  };
  G.icons = icons;

  function buildChrome(){
    const links = PAGES.map(([href, label, key]) =>
      `<li><a href="${href}"${key === page ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');
    const header = document.createElement('div');
    header.innerHTML = `
      <header class="site-header">
        <nav class="nav wrap" aria-label="Main">
          <a class="brand" href="index.html" aria-label="Start again"><span class="mark">for Ladoo</span><span class="sub">a Diwali e-bouquet</span></a>
          <ul class="nav-links">${links}</ul>
          <div class="nav-tools">
            <button class="icon-btn sound-btn" id="soundBtn" aria-label="Play festive music" aria-pressed="false"><span class="bars"><i></i><i></i><i></i><i></i></span></button>
          </div>
        </nav>
      </header>`;
    document.body.prepend(...header.children);

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `<div class="wrap foot-note"><span>Diwali 2026</span><span>Made with <span class="heart">♥</span> for Ladoo</span></div>`;
    document.body.append(footer);

    const extras = document.createElement('div');
    extras.innerHTML = `
      <canvas id="sparkles" aria-hidden="true"></canvas>
      <div class="scrim" id="scrim"></div>
      <div class="toast" id="toast" role="status"><span class="dot"></span><span id="toastText"></span></div>
      <div class="veil out" id="veil" aria-hidden="true"><span class="diya veil-diya lit" data-diya></span></div>`;
    document.body.append(...extras.children);
  }

  /* ---------------- toast ---------------- */
  let tt;
  function toast(msg){
    const t = $('#toast'); $('#toastText').textContent = msg;
    t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 3200);
  }

  /* ---------------- images ---------------- */
  function hydrateImages(root = document){
    $$('img[data-img]', root).forEach(im => {
      if(im.dataset.done) return; im.dataset.done = 1;
      const w = +(im.dataset.w || 900);
      const box = im.closest('.media');
      if(box && !box.dataset.label) box.dataset.label = im.alt || 'for Ladoo';
      im.classList.add('loading');
      im.addEventListener('load', () => im.classList.remove('loading'), { once:true });
      im.addEventListener('error', () => box && box.classList.add('fail'), { once:true });
      if(!im.hasAttribute('loading')) im.loading = 'lazy';
      im.decoding = 'async';
      im.src = G.img(im.dataset.img, w);
    });
  }

  /* ---------------- reveal ---------------- */
  let io;
  function reveal(root = document){
    if(!io) io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold:.12, rootMargin:'0px 0px -6% 0px' });
    $$('.reveal:not(.in)', root).forEach(el => io.observe(el));
  }

  /* ---------------- page transitions ---------------- */
  function transitions(){
    const veil = $('#veil');
    requestAnimationFrame(() => veil.classList.add('out'));
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if(!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      const url = new URL(a.href, location.href);
      if(url.origin !== location.origin || !/\.html$/.test(url.pathname)) return;
      if(url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      if(a.dataset.reset) session.del('gulaab-welcomed');
      veil.classList.remove('out'); veil.classList.add('in');
      setTimeout(() => { location.href = url.href; }, reduce ? 50 : 650);
    });
    addEventListener('pageshow', e => { if(e.persisted){ veil.classList.remove('in'); veil.classList.add('out'); } });
  }

  /* ---------------- golden particles + heart bursts ---------------- */
  const Sparkles = (() => {
    let c, W, H, ps = [], level = 1, bursts = [];
    function mk(spawnBottom){
      return { x: Math.random() * W, y: spawnBottom ? H + 10 : Math.random() * H, r: .6 + Math.random() * 1.9,
        vy: -(.12 + Math.random() * .35), vx: (Math.random() - .5) * .15, a: Math.random() * 6.28, va: .01 + Math.random() * .03,
        hue: Math.random() < .8 ? 42 : 24 };
    }
    function heart(x, y, s){
      c.beginPath();
      c.moveTo(x, y + s * .35);
      c.bezierCurveTo(x - s * 1.1, y - s * .35, x - s * .45, y - s * 1.05, x, y - s * .45);
      c.bezierCurveTo(x + s * .45, y - s * 1.05, x + s * 1.1, y - s * .35, x, y + s * .35);
      c.fill();
    }
    function tick(){
      c.clearRect(0, 0, W, H);
      c.globalCompositeOperation = 'lighter';
      for(const p of ps){
        p.a += p.va; p.y += p.vy; p.x += p.vx + Math.sin(p.a) * .15;
        if(p.y < -10) Object.assign(p, mk(true));
        const tw = .45 + Math.sin(p.a * 2) * .35;
        const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `hsla(${p.hue},100%,82%,${tw})`); g.addColorStop(1, `hsla(${p.hue},100%,60%,0)`);
        c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r * 4, 0, 6.28); c.fill();
      }
      c.globalCompositeOperation = 'source-over';
      for(let i = bursts.length - 1; i >= 0; i--){
        const b = bursts[i]; b.life -= 1;
        b.vy += b.heart ? .03 : .045; b.vx *= .985; b.vy *= .985; b.x += b.vx; b.y += b.vy;
        const al = Math.max(0, b.life / b.max);
        c.fillStyle = `hsla(${b.hue},95%,${60 + al * 20}%,${al})`;
        if(b.heart) heart(b.x, b.y, b.r * 3.2);
        else { c.beginPath(); c.arc(b.x, b.y, b.r * (0.6 + al * .6), 0, 6.28); c.fill(); }
        if(b.life <= 0) bursts.splice(i, 1);
      }
      requestAnimationFrame(tick);
    }
    function burst(x, y, n = 60, hues = [42, 30, 50, 12, 340], opts = {}){
      if(reduce || !c) return;
      for(let i = 0; i < n; i++){
        const ang = Math.random() * 6.28, sp = 1.5 + Math.random() * (opts.hearts ? 3.5 : 5.5), max = 50 + Math.random() * 60;
        const isHeart = opts.hearts ? Math.random() < .6 : false;
        bursts.push({ x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 1.4, r: 1 + Math.random() * 2.2, life: max, max,
          hue: isHeart ? [340, 350, 330, 0][i % 4] : hues[i % hues.length], heart: isHeart });
      }
    }
    const love = (x, y, n = 36) => burst(x, y, n, [42, 340, 30], { hearts: true });
    function init(){
      const host = $('#sparkles'); if(!host) return;
      c = host.getContext('2d');
      level = { none:0, low:.5, high:1.6, max:2.4 }[document.body.dataset.sparkles] ?? 1;
      const resize = () => { const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
        host.width = W * d; host.height = H * d; c.setTransform(d, 0, 0, d, 0, 0);
        const n = Math.round(Math.min(70, W * H / 26000) * level); while(ps.length < n) ps.push(mk(false)); ps.length = n; };
      resize(); addEventListener('resize', resize);
      if(!reduce) requestAnimationFrame(tick);
    }
    function setLevel(l){ level = l; const n = Math.round(Math.min(70, W * H / 26000) * level); while(ps.length < n) ps.push(mk(true)); ps.length = n; }
    return { init, burst, love, setLevel };
  })();

  /* ---------------- ambient festive music (Web Audio, no files) ---------------- */
  const Music = (() => {
    let ctx, master, on = false, timer, step = 0;
    const SA = 293.66;
    const ratios = [1, 9/8, 5/4, 45/32, 3/2, 27/16, 15/8, 2, 9/4, 5/2];
    const phrases = [[4,5,6,7,6,5,4],[2,3,4,2,1,0],[7,6,7,9,8,7],[4,3,2,1,2,0],[0,2,4,5,4,2],[5,6,7,6,4]];
    function setup(){
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = 0;
      const comp = ctx.createDynamicsCompressor();
      const delay = ctx.createDelay(); delay.delayTime.value = .38;
      const fb = ctx.createGain(); fb.gain.value = .32;
      const wet = ctx.createGain(); wet.gain.value = .35;
      delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(comp);
      master.connect(comp); master.connect(delay); comp.connect(ctx.destination);
    }
    function drone(){
      [[SA/2, .05],[SA*3/4, .035],[SA, .025],[SA/4, .04]].forEach(([f, g], i) => {
        const o = ctx.createOscillator(), gn = ctx.createGain(), lp = ctx.createBiquadFilter(), lfo = ctx.createOscillator(), lg = ctx.createGain();
        o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = (i - 1.5) * 3;
        lp.type = 'lowpass'; lp.frequency.value = 900; lp.Q.value = 6;
        lfo.frequency.value = .08 + i * .03; lg.gain.value = 500; lfo.connect(lg); lg.connect(lp.frequency);
        gn.gain.value = g; o.connect(lp); lp.connect(gn); gn.connect(master); o.start(); lfo.start();
      });
    }
    function pluck(freq, t, vel = .18){
      const o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
      o.type = 'triangle'; o.frequency.value = freq; o2.type = 'sine'; o2.frequency.value = freq * 2.003;
      lp.type = 'lowpass'; lp.frequency.setValueAtTime(5000, t); lp.frequency.exponentialRampToValueAtTime(700, t + 1.2);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vel, t + .008); g.gain.exponentialRampToValueAtTime(.0008, t + 2.2);
      o.connect(lp); o2.connect(lp); lp.connect(g); g.connect(master);
      o.start(t); o2.start(t); o.stop(t + 2.4); o2.stop(t + 2.4);
    }
    function bell(freq, t){
      [1, 2.76, 5.4].forEach((m, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = freq * m; g.gain.setValueAtTime(.06 / (i + 1), t); g.gain.exponentialRampToValueAtTime(.0005, t + 3.5 - i);
        o.connect(g); g.connect(master); o.start(t); o.stop(t + 3.6);
      });
    }
    function schedule(){
      const ph = phrases[step++ % phrases.length];
      let t = ctx.currentTime + .1;
      ph.forEach((n, i) => { pluck(SA * ratios[n], t, i === 0 ? .2 : .14); t += (i === ph.length - 1 ? .9 : .42 + (i % 3 === 2 ? .2 : 0)); });
      if(step % 2 === 0) bell(SA * 4, ctx.currentTime + .1);
      timer = setTimeout(schedule, (t - ctx.currentTime) * 1000 + 1400);
    }
    function start(){
      if(!ctx){ try{ setup(); drone(); }catch(e){ return false; } }
      ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(.55, ctx.currentTime, 1.2);
      clearTimeout(timer); schedule(); on = true; return true;
    }
    function stop(){
      if(!ctx) return; on = false; clearTimeout(timer);
      master.gain.setTargetAtTime(0, ctx.currentTime, .4);
    }
    function chime(){
      if(!on || !ctx) return; const t = ctx.currentTime;
      [0, .08, .16].forEach((d, i) => pluck(SA * ratios[7 + (i % 3)], t + d, .1));
    }
    return { start, stop, chime, get on(){ return on; }, supported: !!(window.AudioContext || window.webkitAudioContext) };
  })();

  function soundUI(){
    const btn = $('#soundBtn');
    if(!Music.supported){ btn.hidden = true; return; }
    const paint = () => { btn.classList.toggle('on', Music.on); btn.setAttribute('aria-pressed', Music.on); btn.setAttribute('aria-label', Music.on ? 'Pause festive music' : 'Play festive music'); };
    btn.onclick = () => {
      if(Music.on){ Music.stop(); store.set('gulaab-sound', false); }
      else { Music.start(); store.set('gulaab-sound', true); toast('Music on — a soft little Diwali tune for you 🎶'); }
      paint();
    };
    if(store.get('gulaab-sound', false)){
      const resume = () => { if(!Music.on){ Music.start(); paint(); } removeEventListener('pointerdown', resume); removeEventListener('keydown', resume); };
      addEventListener('pointerdown', resume); addEventListener('keydown', resume);
    }
    paint();
  }

  /* ---------------- modals ---------------- */
  let lastFocus;
  function openModal(sel){
    const m = $(sel); lastFocus = document.activeElement;
    m.classList.add('open'); $('#scrim').classList.add('on');
    setTimeout(() => (m.querySelector('[data-close]') || m).focus(), 50);
  }
  function closeModals(){
    $$('.modal.open').forEach(m => m.classList.remove('open'));
    $('#scrim').classList.remove('on');
    lastFocus && lastFocus.focus && lastFocus.focus();
  }
  document.addEventListener('click', e => { if(e.target.closest('[data-close]')) closeModals(); if(e.target.classList.contains('modal')) closeModals(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape'){ closeModals(); } });

  /* ---------------- boot ---------------- */
  buildChrome();
  transitions();
  Sparkles.init();
  soundUI();
  $$('[data-diya]').forEach(makeDiya);
  hydrateImages();
  reveal();

  Object.assign(G, { store, session, toast, hydrateImages, reveal, Music, Sparkles, diyaSVG, makeDiya, openModal, closeModals, reduce, $, $$ });
})();
