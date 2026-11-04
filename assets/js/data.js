/* =========================================================
   Ladoo's Little Diwali Boutique — pieces + imagery
   ---------------------------------------------------------
   ALL photography lives in IMG below. Every image on the site is
   rendered through it, and every <img> has a designed fallback tile
   if a photo ever fails to load — so swapping a photo is a one-line
   change here. You can drop your own files into assets/img/ and use
   e.g. 'assets/img/my-photo.jpg'.
   ========================================================= */
(function(){
  const U = id => 'https://images.unsplash.com/photo-' + id;
  const IMG = {
    sareeSilk:     U('1610030469983-98e550d6193c'),
    sareeBanarasi: U('1610030469668-935142b96fe4'),
    sareeOrganza:  U('1606760227091-3dd870d97f1d'),
    sareeTissue:   U('1610189013444-933fb0122e23'),
    sareeChiffon:  U('1609357602737-78ac298a8650'),
    lehengaBridal: U('1595777457583-95e059d581b8'),
    lehengaRose:   U('1583391733981-7e6491a1aa91'),
    lehengaParty:  U('1566174053879-31528523f8ae'),
    suitChanderi:  U('1583391733960-6e4d7dfea22d'),
    suitSilk:      U('1583391733958-e026b1346331'),
    anarkali:      U('1618918319542-c34704836a3e'),
    kurta:         U('1617627143750-d86bc21e42bb'),
    dupatta:       U('1624698572118-2e0f49c065f3'),
    jhumka:        U('1535632066927-ab7c9ab60908'),
    necklace:      U('1599643478518-a784e5dc4c8f'),
    kundan:        U('1601121141461-9d6647bca1ed'),
    bangles:       U('1611652022419-a9419f74343d'),
    chain:         U('1617038220319-276d3cfab638'),
    bag:           U('1584917865442-de89df76afd3'),
    clutch:        U('1548036328-c9fa89d128fa'),
    diwaliNight:   U('1590650516494-0c8e4a4dd67e'),
    // the photo that started it all — the bouquet
    roses:         'assets/img/roses.jpg'
  };

  const img = (key, w = 900) => {
    const src = IMG[key] || key;
    return src.startsWith('http') ? `${src}?auto=format&fit=crop&w=${w}&q=80` : src;
  };

  /* note = why I picked it for you · desc = the piece · pair = what to wear it with */
  const PRODUCTS = [
    { id:'saree-golden', cat:'saree', name:'Golden Hour Silk Saree', tag:'Ladoo-approved', img:'sareeSilk', alt:['sareeBanarasi','dupatta'],
      note:'Because you deserve something that glows as much as you do.',
      desc:'Pure silk with a temple border woven in gold. It drapes like poured light.', pair:'Swaying gold jhumkas + a bindi + that smile' },
    { id:'saree-banarasi', cat:'saree', name:'Gulnaar Banarasi Saree', tag:'Classic you', img:'sareeBanarasi', alt:['sareeSilk','sareeTissue'],
      note:'Timeless, elegant and a little bit royal — sounds like someone I know.',
      desc:'Hand-loomed Banarasi silk with tiny woven gold flowers.', pair:'The Lakshmi temple necklace' },
    { id:'saree-moonlight', cat:'saree', name:'Moonlight Organza Saree', tag:'Soft & dreamy', img:'sareeOrganza', alt:['sareeChiffon','dupatta'],
      note:'Light and dreamy, for a Diwali night under a sky full of lights.',
      desc:'Featherlight organza with a scalloped, hand-embroidered edge.', pair:'Pearl drops and a little velvet potli' },
    { id:'saree-sona', cat:'saree', name:'Sona Tissue Saree', tag:null, img:'sareeTissue', alt:['sareeSilk','sareeOrganza'],
      note:'It catches every flicker of the diya — just like your eyes do when you laugh.',
      desc:'Gold tissue silk that shimmers in candlelight.', pair:'Chiming bangles, lots of them' },

    { id:'lehenga-mehtaab', cat:'lehenga', name:'Mehtaab Lehenga', tag:'Showstopper', img:'lehengaBridal', alt:['lehengaRose','dupatta'],
      note:'For when you walk in and the whole room forgets what it was saying.',
      desc:'Raw silk worked by hand with zardozi and a lot of patience.', pair:'The Rajkumari kundan choker' },
    { id:'lehenga-gulabo', cat:'lehenga', name:'Gulabo Rose Lehenga', tag:'My favourite', img:'lehengaRose', alt:['lehengaParty','dupatta'],
      note:'Rose-pink, because pink roses are where all of this began.',
      desc:'A soft pink lehenga with a whisper of gold and tiny mirrors.', pair:'Jhumkas + a gajra + a twirl' },
    { id:'lehenga-twirl', cat:'lehenga', name:'Twirl-Ready Party Lehenga', tag:'Made for twirling', img:'lehengaParty', alt:['lehengaRose','sareeChiffon'],
      note:'Light, swishy and joyful — built for dancing badly and laughing loudly.',
      desc:'Georgette with a sequin jaal that sparkles under fairy lights.', pair:'Comfy juttis (for the dancing)' },

    { id:'anarkali-noor', cat:'suit', name:'Noor Anarkali', tag:'Elegant', img:'anarkali', alt:['suitSilk','dupatta'],
      note:'Graceful and sweeping, for the moment you light the very first diya.',
      desc:'A floor-length anarkali in jewel tones with a sheer gota dupatta.', pair:'Long temple necklace' },
    { id:'suit-chanderi', cat:'suit', name:'Lazy Morning Kurta Set', tag:'Cosy', img:'suitChanderi', alt:['kurta','suitSilk'],
      note:'For slow Diwali mornings, long family lunches and one sweet too many.',
      desc:'Soft hand-block-printed chanderi with a light dupatta.', pair:'Small studs + a cup of chai' },
    { id:'suit-zari', cat:'suit', name:'Zari Silk Suit', tag:null, img:'suitSilk', alt:['suitChanderi','dupatta'],
      note:'Effortless and pretty — the way you make everything look.',
      desc:'A straight-cut silk suit with a glimmering zari yoke.', pair:'The little evening clutch' },

    { id:'jhumka-swaying', cat:'jewellery', name:'Swaying Gold Jhumkas', tag:'Cute alert', img:'jhumka', alt:['chain','kundan'],
      note:'They sway every time you laugh. So, they’ll be swaying a lot.',
      desc:'Temple jhumkas with tiny pearl drops.', pair:'Literally everything' },
    { id:'kundan-rajkumari', cat:'jewellery', name:'Rajkumari Kundan Choker', tag:'Royal', img:'kundan', alt:['necklace','jhumka'],
      note:'Royal, sparkly — and still not as bright as your smile.',
      desc:'Hand-set kundan with a secret meenakari pattern on the back.', pair:'The Mehtaab lehenga' },
    { id:'necklace-lakshmi', cat:'jewellery', name:'Lakshmi Temple Necklace', tag:null, img:'necklace', alt:['kundan','chain'],
      note:'Very on theme this week. Lakshmi would definitely approve.',
      desc:'A long temple necklace with little Lakshmi coins.', pair:'The Gulnaar Banarasi' },
    { id:'bangles-chime', cat:'jewellery', name:'Chiming Bangle Stack', tag:null, img:'bangles', alt:['jhumka','chain'],
      note:'Six bangles that chime softly, like a tiny song whenever you move.',
      desc:'A stack of six gold bangles. Restraint is not the point of Diwali.', pair:'The Sona tissue saree' },

    { id:'potli-ladoo', cat:'bags', name:'The Ladoo Potli', tag:'Snack storage', img:'bag', alt:['clutch','dupatta'],
      note:'Fits a phone, a lipstick and at least two emergency ladoos.',
      desc:'A velvet potli with a beaded drawstring.', pair:'Any outfit + sweets' },
    { id:'clutch-little', cat:'bags', name:'Little Evening Clutch', tag:null, img:'clutch', alt:['bag','chain'],
      note:'Small, pretty and full of good things — a bit like you.',
      desc:'A structured evening clutch with a delicate chain.', pair:'The Noor anarkali' },
  ];

  const CATS = { all:'Everything', saree:'Sarees', lehenga:'Lehengas', suit:'Suits', jewellery:'Jewellery', bags:'Little Extras' };

  window.GULAAB = { IMG, img, PRODUCTS, CATS, byId: id => PRODUCTS.find(p => p.id === id) };
})();
