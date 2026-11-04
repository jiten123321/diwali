/* Images used by the e-bouquet. Every <img data-img> has a graceful fallback. */
(function(){
  const IMG = {
    diwaliNight: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e',
    roses:       'assets/img/roses.jpg'
  };
  const img = (key, w = 900) => {
    const src = IMG[key] || key;
    return src.startsWith('http') ? `${src}?auto=format&fit=crop&w=${w}&q=80` : src;
  };
  window.GULAAB = { IMG, img };
})();
