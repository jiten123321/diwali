/* Gulaab — product cards + quick view (shared by home & collection) */
(function(){
  const G = window.GULAAB, { $, $$ } = G;
  const wish = new Set(G.store.get('gulaab-wish', []));

  G.card = function(p, i = 0){
    return `<article class="card reveal d${i % 4}" data-id="${p.id}" data-cat="${p.cat}">
      <div class="card-media media">
        <img data-img="${p.img}" data-w="700" alt="${p.name}">
        <img class="alt" data-img="${p.alt[0]}" data-w="700" alt="" aria-hidden="true">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
        <button class="wish ${wish.has(p.id) ? 'on' : ''}" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist" aria-pressed="${wish.has(p.id)}">${G.icons.heart}</button>
        <div class="card-actions">
          <button class="btn quick" data-quick="${p.id}">Quick view</button>
          <button class="btn gold add" data-add="${p.id}" aria-label="Add ${p.name} to bag">+ Bag</button>
        </div>
      </div>
      <div class="card-body">
        <small>${G.CATS[p.cat]}</small>
        <h3><button class="card-title" data-quick="${p.id}">${p.name}</button></h3>
        <div class="price">${G.inr(p.price)}${p.was ? ` <s>${G.inr(p.was)}</s>` : ''}</div>
      </div>
    </article>`;
  };

  function quickView(id){
    const p = G.byId(id); if(!p) return;
    const shots = [p.img, ...p.alt];
    $('#qvBody').innerHTML = `
      <div class="qv">
        <div class="qv-gallery">
          <div class="qv-main media" data-label="${p.name}"><img id="qvMain" data-img="${p.img}" data-w="1100" alt="${p.name}" loading="eager"></div>
          <div class="qv-thumbs" role="tablist" aria-label="Product images">
            ${shots.map((s, i) => `<button class="media ${i ? '' : 'on'}" data-shot="${s}" role="tab" aria-selected="${!i}" aria-label="Image ${i + 1}"><img data-img="${s}" data-w="200" alt=""></button>`).join('')}
          </div>
        </div>
        <div class="qv-info">
          <div class="eyebrow">${G.CATS[p.cat]}${p.tag ? ' · ' + p.tag : ''}</div>
          <h2 id="qvTitle">${p.name}</h2>
          <div class="price big">${G.inr(p.price)}${p.was ? ` <s>${G.inr(p.was)}</s>` : ''}</div>
          <p>${p.desc}</p>
          <div class="sizes" role="radiogroup" aria-label="Size">
            ${p.sizes.map((s, i) => `<button role="radio" aria-checked="${!i}" class="${i ? '' : 'on'}" data-size="${s}">${s}</button>`).join('')}
          </div>
          <div class="qv-cta"><button class="btn" id="qvAdd">Add to bag</button><button class="btn ghost" data-wish="${p.id}" aria-pressed="${wish.has(p.id)}">${wish.has(p.id) ? '♥ Saved' : '♡ Save'}</button></div>
          <details open><summary>Details & care</summary><ul>${p.details.map(d => `<li>${d}</li>`).join('')}</ul></details>
          <details><summary>Delivery</summary><p>Complimentary express delivery, gift-wrapped in our Diwali box with a handwritten note.</p></details>
        </div>
      </div>`;
    G.hydrateImages($('#qvBody'));
    let size = p.sizes[0];
    $('#qvBody').onclick = e => {
      const sh = e.target.closest('[data-shot]'), sz = e.target.closest('[data-size]');
      if(sh){
        $$('[data-shot]', $('#qvBody')).forEach(b => { b.classList.toggle('on', b === sh); b.setAttribute('aria-selected', b === sh); });
        const m = $('#qvMain'), box = m.closest('.media'); box.classList.remove('fail');
        m.style.opacity = 0; setTimeout(() => { m.dataset.img = sh.dataset.shot; delete m.dataset.done; G.hydrateImages(box); m.style.opacity = ''; }, 200);
      }
      if(sz){ size = sz.dataset.size; $$('[data-size]', $('#qvBody')).forEach(b => { b.classList.toggle('on', b === sz); b.setAttribute('aria-checked', b === sz); }); }
      if(e.target.closest('#qvAdd')){ G.Cart.add(p.id, size); G.closeModals(); setTimeout(() => G.Cart.open(), 350); }
    };
    // zoom on hover
    const main = $('.qv-main');
    main.onmousemove = e => { const r = main.getBoundingClientRect(); const im = $('#qvMain');
      im.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`; im.style.transform = 'scale(1.8)'; };
    main.onmouseleave = () => { $('#qvMain').style.transform = ''; };
    G.openModal('#qvModal');
  }
  G.quickView = quickView;

  // modal shell
  const m = document.createElement('div');
  m.className = 'modal'; m.id = 'qvModal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-labelledby', 'qvTitle');
  m.innerHTML = `<div class="panel"><button class="icon-btn x" data-close aria-label="Close">${G.icons.x}</button><div id="qvBody"></div></div>`;
  document.body.append(m);

  document.addEventListener('click', e => {
    const q = e.target.closest('[data-quick]'), a = e.target.closest('[data-add]'), w = e.target.closest('[data-wish]');
    if(q){ e.preventDefault(); quickView(q.dataset.quick); }
    if(a){ e.preventDefault(); G.Cart.add(a.dataset.add); const r = a.getBoundingClientRect(); G.Sparkles.burst(r.left + r.width / 2, r.top, 30); }
    if(w){
      e.preventDefault(); const id = w.dataset.wish;
      wish.has(id) ? wish.delete(id) : wish.add(id); G.store.set('gulaab-wish', [...wish]);
      $$(`[data-wish="${id}"]`).forEach(b => { const on = wish.has(id); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); if(b.classList.contains('ghost')) b.textContent = on ? '♥ Saved' : '♡ Save'; });
      G.toast(wish.has(id) ? 'Saved to your wishlist ♥' : 'Removed from wishlist');
    }
  });
})();
