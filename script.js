    /* ====== PLACEHOLDER DATA ====== */
    const product = {
      title: 'Cozy Knit Sweater',
      price: 1499,
      images:[
        'image/-473Wx593H-463534806-red-MODEL2.png',
        'image/-473Wx593H-463534806-red-MODEL3.avif',
        'image/-1117Wx1400H-463534806-red-MODEL4.avif',
        'image/-473Wx593H-463534806-red-MODEL5.avif',
        'image/-78Wx98H-463534806-red-MODEL6.avif',      ],
      colours:[
        {name:'Black', color:'#0f172a'},
        {name:'Cream', color:'#f6f0e6'},
        {name:'Rust', color:'#b45309'},
        {name:'Olive', color:'#3f6212'}
      ],
      sizes:['S','M','L','XL']
    };

    const pairWell = [
      {title:'My Shirt', price:2499, image:'image/WhatsApp Image 2025-01-11 at 7.23.30 PM.jpeg'},
      {title:'Nike Shoes', price:3999, image:'image/-473Wx593H-469551474-white-MODEL2.avif'},
      {title:'Puma Bag', price:2399, image:'image/-473Wx593H-466824508-blue-MODEL.avif'},
      {title:'Shades', price:699, image:'image/medium-fk-av-blk-wyfr-blk-15-elligator-original-imahybqt9gkjgggj.webp'}
    ];

    const related = [
      {title:'Check Shirt', price:1299, image:'image/-473Wx593H-463838656-black-MODEL.avif', badge:'Popular'},
      {title:'Shirt with Patch Pocket', price:809, image:'image/-473Wx593H-469327155-ltblue-MODEL2.avif', badge:'New'},
      {title:'Closure Jacket', price:1799, image:'image/-473Wx593H-701513345-navy-MODEL.avif'},
      {title:'Black Hoodie', price:999, image:'image/-473Wx593H-702091579-black-MODEL.avif'}
    ];

    /* ====== GALLERY - THUMBNAILS & INTERACTION ====== */
    const mainImage = document.getElementById('mainImage');
    const thumbList = document.getElementById('thumbList');

    function buildThumbs(){
      product.images.forEach((src, i)=>{
        const btn = document.createElement('button');
        btn.className='thumb';
        btn.setAttribute('data-index', i);
        btn.setAttribute('aria-label', 'Show image '+(i+1));
        btn.innerHTML = `<img src="${src}" alt="thumb ${i+1}">`;
        btn.addEventListener('click', ()=>{
          selectImage(i);
        });
        if(i===0) btn.classList.add('active');
        thumbList.appendChild(btn);
      });
    }

    function selectImage(index){
      mainImage.src = product.images[index];
      // mark active
      thumbList.querySelectorAll('.thumb').forEach(t=>t.classList.remove('active'));
      const current = thumbList.querySelector(`.thumb[data-index='${index}']`);
      if(current) current.classList.add('active');
    }

    buildThumbs();

    /* ====== COLOUR SWATCHES ====== */
    const coloursWrap = document.getElementById('colourSwatches');
    let selectedColourIndex = 0;
    let selectedSize = product.sizes[1];

    function buildSwatches(){
      product.colours.forEach((c, i)=>{
        const btn = document.createElement('button');
        btn.className='swatch';
        btn.setAttribute('aria-label', c.name);
        btn.style.background = c.color;
        btn.dataset.index = i;
        if(i===0) btn.classList.add('selected');
        btn.addEventListener('click', ()=>{
          selectColour(i);
        });
        coloursWrap.appendChild(btn);
      });
    }

    function selectColour(i){
      selectedColourIndex = i;
      // update selected class
      coloursWrap.querySelectorAll('.swatch').forEach(s=>s.classList.remove('selected'));
      coloursWrap.querySelector(`.swatch[data-index='${i}']`).classList.add('selected');
      // update main image to match available images roughly (cycle)
      const imgIndex = i % product.images.length;
      selectImage(imgIndex);
      updateStateLabel();
    }

    buildSwatches();

    /* ====== SIZE SELECT & SIZE CHART MODAL ====== */
    const sizeSelect = document.getElementById('sizeSelect');
    function buildSizes(){
      product.sizes.forEach((s, i)=>{
        const opt = document.createElement('option'); opt.value=s; opt.textContent=s;
        if(i===1) opt.selected=true;
        sizeSelect.appendChild(opt);
      });
      selectedSize = sizeSelect.value;
      sizeSelect.addEventListener('change', ()=>{ selectedSize = sizeSelect.value; updateStateLabel(); });
    }
    buildSizes();

    // Size chart popup content
    const overlay = document.getElementById('overlay');
    const modalContent = document.getElementById('modalContent');

    function openSizeChart(){
      modalContent.innerHTML = `
        <button class="close" aria-label="Close">✕</button>
        <h3>Size Chart</h3>
        <p class="muted">Measurements in cm</p>
        <table style="width:100%; border-collapse:collapse; margin-top:10px;">
          <thead><tr style="text-align:left"><th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th></tr></thead>
          <tbody>
            <tr><td>S</td><td>86</td><td>70</td><td>92</td></tr>
            <tr><td>M</td><td>92</td><td>76</td><td>98</td></tr>
            <tr><td>L</td><td>98</td><td>82</td><td>104</td></tr>
            <tr><td>XL</td><td>104</td><td>90</td><td>110</td></tr>
          </tbody>
        </table>
      `;
      showModal();
    }

    document.getElementById('sizeChartBtn').addEventListener('click', openSizeChart);

    /* ====== COMPARE COLOURS MODAL ====== */
    document.getElementById('compareColoursBtn').addEventListener('click', ()=>{
      // create swatches and comparison UI
      let html = `<button class="close" aria-label="Close">✕</button><h3>Compare Colours</h3><p class="muted">Select two or more colours to compare.</p><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">`;
      product.colours.forEach((c,i)=>{
        html += `<label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-index="${i}"><span style="display:inline-block;width:36px;height:36px;border-radius:50%;background:${c.color};border:1px solid #eaeaea"></span>${c.name}</label>`;
      });
      html += `</div><div id="comparePreview" style="margin-top:16px;display:flex;gap:10px;align-items:center"></div><div style="margin-top:16px"><button class="btn" id="closeCompare">Done</button></div>`;
      modalContent.innerHTML = html;
      // wire up checkbox behaviour
      modalContent.querySelectorAll('input[type="checkbox"]').forEach(cb=>{
        cb.addEventListener('change', ()=>{
          const preview = modalContent.querySelector('#comparePreview'); preview.innerHTML='';
          modalContent.querySelectorAll('input[type="checkbox"]:checked').forEach(c=>{
            const i = c.dataset.index; const col = product.colours[i];
            const box = document.createElement('div'); box.style.minWidth='120px'; box.style.padding='12px'; box.style.border='1px solid #eef2f6'; box.style.borderRadius='8px';
            box.innerHTML = `<div style="height:80px;border-radius:8px;background:${col.color}"></div><div style="margin-top:8px;font-weight:700">${col.name}</div>`;
            preview.appendChild(box);
          });
        });
      });
      showModal();
    });

    /* ====== PAIR WELL WITH CARDS ====== */
    const pairRow = document.getElementById('pairRow');
    function buildPairRow(){
      pairWell.forEach(p=>{
        const node = document.createElement('div'); node.className='card';
        node.innerHTML = `<img src="${p.image}" alt="${p.title}"><div class="meta">${p.title}</div><div class="price">₹${p.price}</div><button class="btn" style="margin-top:auto">Add to cart</button>`;
        pairRow.appendChild(node);
      });
    }
    buildPairRow();

    /* ====== RELATED PRODUCTS GRID ====== */
    const relatedGrid = document.getElementById('relatedGrid');
    function buildRelated(){
      related.forEach(r=>{
        const c = document.createElement('div'); c.className='card';
        c.innerHTML = `<div style="position:relative"><img src="${r.image}" alt="${r.title}"></div><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:700">${r.title}</div>${r.badge?'<span class="badge">'+r.badge+'</span>':''}</div><div style="display:flex;justify-content:space-between;align-items:center"><div class="muted">₹${r.price}</div><button class="btn secondary">View</button></div>`;
        relatedGrid.appendChild(c);
      });
    }
    buildRelated();

    /* ====== BUNDLE ADD ACTION (demo) ====== */
    document.getElementById('addBundle').addEventListener('click', ()=>{
      alert('Bundle added to cart (demo)');
    });

    /* ====== ADD TO CART, WISHLIST ====== */
    document.getElementById('addToCart').addEventListener('click', ()=>{
      alert(`Added ${product.title} - ${product.colours[selectedColourIndex].name} / ${selectedSize} to cart (demo)`);
    });
    document.getElementById('wishlist').addEventListener('click', ()=>{ alert('Added to wishlist (demo)') });

    /* ====== TAB LOGIC ====== */
    document.querySelectorAll('.tab-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        // content
        document.querySelectorAll('.tab-panel').forEach(p=>p.style.display='none');
        document.getElementById(btn.dataset.tab).style.display='block';
      });
    });

    /* ====== MODAL MANAGEMENT (overlay/esc/click) ====== */
    function showModal(){
      overlay.style.display='flex'; overlay.setAttribute('aria-hidden','false');
      // close buttons
      modalContent.querySelectorAll('.close').forEach(btn=>btn.addEventListener('click', hideModal));
      // Done/close in compare
      const done = modalContent.querySelector('#closeCompare'); if(done) done.addEventListener('click', hideModal);
    }
    function hideModal(){ overlay.style.display='none'; overlay.setAttribute('aria-hidden','true'); modalContent.innerHTML=''; }
    overlay.addEventListener('click', (e)=>{ if(e.target===overlay) hideModal(); });
    window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') hideModal(); });

    /* ====== STATE LABEL ====== */
    const stateLabel = document.getElementById('stateLabel');
    function updateStateLabel(){ stateLabel.textContent = `${product.colours[selectedColourIndex].name} / ${selectedSize}`; }
    updateStateLabel();

    /* ====== INITIAL IMAGE selection based on colour (first colour) ====== */
    selectColour(0);

    /* ====== Accessibility niceties: keyboard nav for thumbs ====== */
    thumbList.querySelectorAll('.thumb').forEach(t=>{ t.tabIndex=0; t.addEventListener('keypress',(e)=>{ if(e.key==='Enter') t.click(); }) });

    /* ====== lightweight touch scroll hint for pair row ====== */
    pairRow.addEventListener('touchstart', ()=>{});

