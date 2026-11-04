/* =========================================================
   Gulaab — catalogue + imagery
   ---------------------------------------------------------
   ALL photography lives in IMG below. Every image on the site is
   rendered through it, and every <img> has a designed fallback tile
   if a photo ever fails to load — so swapping a photo is a one-line
   change here. Paths are Unsplash CDN ids (free Unsplash License);
   you can also drop your own files into assets/img/ and use
   e.g. 'assets/img/my-photo.jpg'.
   ========================================================= */
(function(){
  const U = id => 'https://images.unsplash.com/photo-' + id;
  const IMG = {
    // couture
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
    // jewellery & accessories
    jhumka:        U('1535632066927-ab7c9ab60908'),
    necklace:      U('1599643478518-a784e5dc4c8f'),
    kundan:        U('1601121141461-9d6647bca1ed'),
    bangles:       U('1611652022419-a9419f74343d'),
    chain:         U('1617038220319-276d3cfab638'),
    bag:           U('1584917865442-de89df76afd3'),
    clutch:        U('1548036328-c9fa89d128fa'),
    // festive
    diyas:         U('1605342410313-a44229986348'),
    diwaliNight:   U('1590650516494-0c8e4a4dd67e'),
    // the one photo that has always been here — the bouquet
    roses:         'assets/img/roses.jpg'
  };

  const img = (key, w = 900) => {
    const src = IMG[key] || key;
    return src.startsWith('http') ? `${src}?auto=format&fit=crop&w=${w}&q=80` : src;
  };

  /* categories: saree · lehenga · suit · jewellery · bags */
  const PRODUCTS = [
    { id:'kanjeevaram-rani', cat:'saree', name:'Rani Kanjeevaram Silk Saree', price:48500, was:null, tag:'Bestseller',
      img:'sareeSilk', alt:['sareeBanarasi','dupatta'],
      desc:'Pure mulberry silk woven in Kanchipuram, with a temple border in real zari. Drapes like poured light.',
      details:['Pure silk, 5.5 m + blouse piece','Real zari temple border','Dry clean only'], sizes:['Free size'] },
    { id:'banarasi-gulnaar', cat:'saree', name:'Gulnaar Banarasi Saree', price:36800, was:42000, tag:'Diwali Edit',
      img:'sareeBanarasi', alt:['sareeSilk','sareeTissue'],
      desc:'Hand-loomed in Varanasi with kadhua butis that took three weavers eleven days.',
      details:['Katan silk','Kadhua weave, antique gold','Comes in a keepsake box'], sizes:['Free size'] },
    { id:'organza-chandni', cat:'saree', name:'Chandni Organza Saree', price:18900, was:null, tag:'New',
      img:'sareeOrganza', alt:['sareeChiffon','dupatta'],
      desc:'Featherlight organza with a scalloped hand-embroidered edge, for evenings lit by a hundred diyas.',
      details:['Silk organza','Hand-cut scallop border','Pre-stitched blouse available'], sizes:['Free size'] },
    { id:'tissue-sona', cat:'saree', name:'Sona Tissue Saree', price:22400, was:null, tag:null,
      img:'sareeTissue', alt:['sareeSilk','sareeOrganza'],
      desc:'Gold tissue that catches every flicker of flame. Quietly dramatic.',
      details:['Tissue silk','Woven gota pallu','Dry clean only'], sizes:['Free size'] },

    { id:'lehenga-mehtaab', cat:'lehenga', name:'Mehtaab Bridal Lehenga', price:124000, was:null, tag:'Couture',
      img:'lehengaBridal', alt:['lehengaRose','dupatta'],
      desc:'Twelve kalis of raw silk, hand-worked with dabka, zardozi and the patience of our karigars.',
      details:['Raw silk with net dupatta','Zardozi & dabka embroidery','Made to measure in 3 weeks'], sizes:['XS','S','M','L','XL'] },
    { id:'lehenga-gulabo', cat:'lehenga', name:'Gulabo Rose Lehenga', price:68500, was:76000, tag:'Diwali Edit',
      img:'lehengaRose', alt:['lehengaParty','dupatta'],
      desc:'A rose-pink lehenga with a whisper of gold — our house flower, in silk.',
      details:['Chanderi silk','Mirror & resham work','Can-can included'], sizes:['XS','S','M','L','XL'] },
    { id:'lehenga-roshni', cat:'lehenga', name:'Roshni Party Lehenga', price:42900, was:null, tag:null,
      img:'lehengaParty', alt:['lehengaRose','sareeChiffon'],
      desc:'Made for dancing through Diwali night — light, swishy and joyfully over the top.',
      details:['Georgette with sequin jaal','Lightweight 3.2 kg','Pockets. Yes, pockets.'], sizes:['XS','S','M','L','XL'] },

    { id:'anarkali-noor', cat:'suit', name:'Noor Anarkali Set', price:28600, was:null, tag:'New',
      img:'anarkali', alt:['suitSilk','dupatta'],
      desc:'A floor-length anarkali in jewel tones with a sheer gota dupatta.',
      details:['Silk blend, fully lined','Gota-patti dupatta','Churidar included'], sizes:['XS','S','M','L','XL'] },
    { id:'suit-chanderi', cat:'suit', name:'Chanderi Kurta Set', price:14800, was:17500, tag:null,
      img:'suitChanderi', alt:['kurta','suitSilk'],
      desc:'Hand-block-printed chanderi for Lakshmi Puja mornings and long family lunches.',
      details:['Chanderi silk-cotton','Hand block print','Palazzo + dupatta'], sizes:['XS','S','M','L','XL'] },
    { id:'suit-zari', cat:'suit', name:'Zari Silk Suit', price:19900, was:null, tag:null,
      img:'suitSilk', alt:['suitChanderi','dupatta'],
      desc:'A straight-cut silk suit with a zari yoke — effortless and impossibly elegant.',
      details:['Art silk','Zari yoke embroidery','Organza dupatta'], sizes:['XS','S','M','L','XL'] },

    { id:'jhumka-surya', cat:'jewellery', name:'Surya Gold Jhumkas', price:12600, was:null, tag:'Bestseller',
      img:'jhumka', alt:['chain','kundan'],
      desc:'Temple jhumkas that sway when you laugh. You will laugh a lot in them.',
      details:['Gold-plated silver','Pearl drops','Hypoallergenic hooks'], sizes:['One size'] },
    { id:'kundan-rajkumari', cat:'jewellery', name:'Rajkumari Kundan Choker', price:34500, was:null, tag:'Heirloom',
      img:'kundan', alt:['necklace','jhumka'],
      desc:'Kundan set by hand in Jaipur, finished with meenakari on the reverse — a secret just for the wearer.',
      details:['Kundan & polki','Meenakari reverse','Earrings included'], sizes:['Adjustable'] },
    { id:'necklace-lakshmi', cat:'jewellery', name:'Lakshmi Temple Necklace', price:27800, was:null, tag:null,
      img:'necklace', alt:['kundan','chain'],
      desc:'A long temple necklace with Lakshmi coins — very on theme for this week.',
      details:['Gold-plated silver','Antique finish','Velvet case'], sizes:['One size'] },
    { id:'bangles-chandrika', cat:'jewellery', name:'Chandrika Bangle Stack', price:9400, was:null, tag:null,
      img:'bangles', alt:['jhumka','chain'],
      desc:'Six bangles that chime softly. Wear all of them; restraint is not the point of Diwali.',
      details:['Set of 6','Gold-plated brass','Sizes 2.4 – 2.8'], sizes:['2.4','2.6','2.8'] },

    { id:'potli-gulaab', cat:'bags', name:'Gulaab Velvet Potli', price:6800, was:null, tag:'Diwali Edit',
      img:'bag', alt:['clutch','dupatta'],
      desc:'Velvet potli with a beaded drawstring — fits a lipstick, a phone and every compliment.',
      details:['Silk velvet','Hand-beaded tassels','Satin lining'], sizes:['One size'] },
    { id:'clutch-noor', cat:'bags', name:'Noor Box Clutch', price:11200, was:null, tag:null,
      img:'clutch', alt:['bag','chain'],
      desc:'A structured evening clutch with a hand-finished clasp and detachable chain.',
      details:['Leather & brass','Detachable chain','Dust bag included'], sizes:['One size'] },
  ];

  const CATS = { all:'All', saree:'Sarees', lehenga:'Lehengas', suit:'Ethnic Suits', jewellery:'Jewellery', bags:'Bags & Accessories' };

  const inr = n => '₹' + n.toLocaleString('en-IN');

  window.GULAAB = { IMG, img, PRODUCTS, CATS, inr, byId: id => PRODUCTS.find(p => p.id === id) };
})();
