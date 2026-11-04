/* Ladoo's boutique — piece cards + close-up view (shared by home & collection) */
(function(){
  const G = window.GULAAB, { $, $$ } = G;

  G.card = function(p, i = 0){
    const on = G.Favs.has(p.id);
    return `<article class="card reveal d${i % 4}" data-id="${p.id}" data-cat="${p.cat}">
      <div class="card-media media">
        <img data-img="${p.img}" data-w="700" alt="${p.name}">
        <img class="alt" data-img="${p.alt[0]}" data-w="700" alt="" aria-hidden="true">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
        <button class="wish ${on ? 'on' : ''}" data-wish="${p.id}" aria-label="Love ${p.name}" aria-pressed="${on}">${G.icons.heart}</button>
        <div class="card-actions"><button class="btn quick" data-quick="${p.id}">Take a closer look</button></div>
      </div>
      <div class="card-body">
        <small>${G.CATS[p.cat]}</small>
        <h3><button class="card-title" data-quick="${p.id}">${p.name}</button></h3>
        <p class="why">${p.note}</p>
      </div>
    </article>`;
  };

  function quickView(id){
    const p = G.byId(id); if(!p) return;
    const shots = [p.img, ...p.alt];
    const on = G.Favs.has(p.id);
    $('#qvBody').innerHTML = `
      <div class="qv">
        <div class="qv-gallery">
          <div class="qv-main media" data-label="${p.name}"><img id="qvMain" data-img="${p.img}" data-w="1100" alt="${p.name}" loading="eager"></div>
          <div class="qv-thumbs" role="tablist" aria-label="Photos">
            ${shots.map((s, i) => `<button class="media ${i ? '' : 'on'}" data-shot="${s}" role="tab" aria-selected="${!i}" aria-label="Photo ${i + 1}"><img data-img="${s}" data-w="200" alt=""></button>`).join('')}
          </div>
        </div>
        <div class="qv-info">
          <div class="eyebrow">${G.CATS[p.cat]}${p.tag ? ' · ' + p.tag : ''}</div>
          <h2 id="qvTitle">${p.name}</h2>
          <div class="qv-why"><span>Why I picked this for you</span>${p.note}</div>
          <p>${p.desc}</p>
          <p class="qv-pair"><b>Wear it with:</b> ${p.pair}</p>
          <div class="qv-cta">
            <button class="btn ${on ? '' : 'gold'}" data-wish="${p.id}" data-label="1" aria-pressed="${on}">${on ? '♥ Loved it' : '♡ Love this'}</button>
            <a class="btn ghost" href="styling.html">Style it in the styling room</a>
          </div>
        </div>
      </div>`;
    G.hydrateImages($('#qvBody'));
    $('#qvBody').onclick = e => {
      const sh = e.target.closest('[data-shot]');
      if(sh){
        $$('[data-shot]', $('#qvBody')).forEach(b => { b.classList.toggle('on', b === sh); b.setAttribute('aria-selected', b === sh); });
        const m = $('#qvMain'), box = m.closest('.media'); box.classList.remove('fail');
        m.style.opacity = 0; setTimeout(() => { m.dataset.img = sh.dataset.shot; delete m.dataset.done; G.hydrateImages(box); m.style.opacity = ''; }, 200);
      }
      const w = e.target.closest('[data-wish]');
      if(w) setTimeout(() => w.classList.toggle('gold', !G.Favs.has(p.id)), 0);
    };
    const main = $('.qv-main');
    main.onmousemove = e => { const r = main.getBoundingClientRect(); const im = $('#qvMain');
      im.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`; im.style.transform = 'scale(1.8)'; };
    main.onmouseleave = () => { $('#qvMain').style.transform = ''; };
    G.openModal('#qvModal');
  }
  G.quickView = quickView;

  const m = document.createElement('div');
  m.className = 'modal'; m.id = 'qvModal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-labelledby', 'qvTitle');
  m.innerHTML = `<div class="panel"><button class="icon-btn x" data-close aria-label="Close">${G.icons.x}</button><div id="qvBody"></div></div>`;
  document.body.append(m);

  document.addEventListener('click', e => {
    const q = e.target.closest('[data-quick]');
    if(q){ e.preventDefault(); quickView(q.dataset.quick); }
  });
})();
