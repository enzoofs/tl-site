/* ==========================================================================
   TimeLabs — interações
   ========================================================================== */

(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) document.documentElement.classList.add('js-ready');

  // ---- Dark mode persistente ----
  const root = document.documentElement;
  const saved = localStorage.getItem('timelabs-theme');
  if (saved === 'dark') root.setAttribute('data-theme', 'dark');
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (next === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    localStorage.setItem('timelabs-theme', next);
  });

  // ---- Reveal on scroll ----
  const revealObs = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) e.target.classList.add('in-view');
  }, { threshold: 0.12 });
  document.querySelectorAll('section[data-folio]').forEach(s => revealObs.observe(s));

  // ---- Smooth anchor ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // =====================================================================
  // HEX MESH · grid global continuo. Base (hx/shade) renderizada por secao
  // em coords globais; path + pulso num overlay unico sobre todo o documento.
  // =====================================================================
  const HEX_R = 24;
  const HEX_W = HEX_R * Math.sqrt(3);
  const ROW_H = HEX_R * 1.5;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function hexPoints(cx, cy, r = HEX_R) {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 180 * (60 * i - 30);
      pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
    }
    return pts.join(' ');
  }

  // Centro global da celula (col, row) — row negativo/positivo aceito
  const cellCenter = (col, row) => ({
    cx: col * HEX_W + (((row % 2) + 2) % 2 ? HEX_W / 2 : 0),
    cy: row * ROW_H
  });

  // Hash deterministico por (col,row) global -> [0,1). Garante que o mesmo
  // hex fica sombreado independente de qual seccao o renderiza.
  function cellHash(col, row) {
    let h = (col * 73856093) ^ (row * 19349663);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  function offsetToCube(col, row) {
    const x = col - (row - (row & 1)) / 2;
    const z = row;
    return { x, y: -x - z, z };
  }
  function hexDist(c1, r1, c2, r2) {
    const a = offsetToCube(c1, r1), b = offsetToCube(c2, r2);
    return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;
  }
  function neighbors(col, row) {
    const odd = ((row % 2) + 2) % 2 === 1;
    return [
      [col + 1, row], [col - 1, row],
      [col + (odd ? 1 : 0), row - 1], [col - (odd ? 0 : 1), row - 1],
      [col + (odd ? 1 : 0), row + 1], [col - (odd ? 0 : 1), row + 1],
    ];
  }

  /** Greedy: vai do start ao end por vizinhos, via centros. */
  function gridPath(start, end, bounds) {
    const { colMin, colMax, rowMin, rowMax } = bounds;
    const path = [start];
    let cur = { ...start };
    let parity = 0;
    let safety = 0;
    while ((cur.col !== end.col || cur.row !== end.row) && safety++ < 400) {
      const curDist = hexDist(cur.col, cur.row, end.col, end.row);
      const opts = neighbors(cur.col, cur.row)
        .filter(([c, r]) => c >= colMin && c <= colMax && r >= rowMin && r <= rowMax)
        .map(([c, r]) => ({ c, r, d: hexDist(c, r, end.col, end.row) }))
        .filter(o => o.d < curDist)
        .sort((a, b) => a.d - b.d);
      if (!opts.length) break;
      const pick = opts[parity % Math.min(opts.length, 2)];
      parity++;
      cur = { col: pick.c, row: pick.r };
      path.push(cur);
    }
    return path;
  }

  function buildSectionMesh(section) {
    const w = section.offsetWidth;
    const h = section.offsetHeight;
    if (!w || !h) return;

    const rect = section.getBoundingClientRect();
    const docY = rect.top + window.scrollY;

    const cols = Math.ceil(w / HEX_W) + 2;
    const rowStart = Math.floor(docY / ROW_H) - 1;
    const rowEnd = Math.ceil((docY + h) / ROW_H) + 1;

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('preserveAspectRatio', 'xMinYMin slice');

    const meshG = document.createElementNS(SVG_NS, 'g');
    for (let r = rowStart; r <= rowEnd; r++) {
      for (let c = -1; c <= cols; c++) {
        const { cx, cy } = cellCenter(c, r);
        const localCy = cy - docY;
        const shaded = cellHash(c, r) < 0.12;
        const p = document.createElementNS(SVG_NS, 'polygon');
        p.setAttribute('class', shaded ? 'hx-shade' : 'hx');
        p.setAttribute('points', hexPoints(cx, localCy));
        meshG.appendChild(p);
      }
    }
    svg.appendChild(meshG);

    let wrap = section.querySelector(':scope > .sec-mesh');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'sec-mesh';
      wrap.setAttribute('aria-hidden', 'true');
      section.insertBefore(wrap, section.firstChild);
    } else {
      wrap.innerHTML = '';
    }
    wrap.appendChild(svg);
  }

  // --- Overlay global: path + pulso atravessando toda a pagina ---
  function buildGlobalPath() {
    const docH = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const docW = document.documentElement.clientWidth;

    const cols = Math.ceil(docW / HEX_W) + 2;
    const rowMin = 0;
    const rowMax = Math.ceil(docH / ROW_H) + 1;
    const bounds = { colMin: 0, colMax: cols - 1, rowMin, rowMax };

    // Ancoras: ~1 por ~280px de altura, ondulando em X
    const nAnchors = Math.max(8, Math.round(docH / 280));
    const anchors = [];
    for (let i = 0; i < nAnchors; i++) {
      const t = (i + 0.5) / nAnchors;
      const wave = Math.sin(i * 1.7 + 0.6) * (cols * 0.32);
      const col = Math.round(cols / 2 + wave + (Math.random() - 0.5) * cols * 0.18);
      const row = Math.round(t * rowMax + (Math.random() - 0.5) * 3);
      anchors.push({
        col: Math.max(1, Math.min(cols - 2, col)),
        row: Math.max(rowMin + 1, Math.min(rowMax - 1, row))
      });
    }

    const fullPath = [];
    for (let i = 0; i < anchors.length - 1; i++) {
      const seg = gridPath(anchors[i], anchors[i + 1], bounds);
      if (i === 0) fullPath.push(...seg);
      else fullPath.push(...seg.slice(1));
    }

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${docW} ${docH}`);
    svg.setAttribute('preserveAspectRatio', 'xMinYMin slice');
    svg.setAttribute('aria-hidden', 'true');

    if (fullPath.length > 1) {
      const ptsStr = fullPath.map(n => {
        const { cx, cy } = cellCenter(n.col, n.row);
        return `${cx.toFixed(1)},${cy.toFixed(1)}`;
      }).join(' ');
      const conn = document.createElementNS(SVG_NS, 'polyline');
      conn.setAttribute('class', 'conn');
      conn.setAttribute('points', ptsStr);
      svg.appendChild(conn);

      for (const a of anchors) {
        const { cx, cy } = cellCenter(a.col, a.row);
        const lit = document.createElementNS(SVG_NS, 'polygon');
        lit.setAttribute('class', 'hx-lit');
        lit.setAttribute('points', hexPoints(cx, cy, HEX_R * 0.9));
        svg.appendChild(lit);
      }

      if (!reducedMotion) {
        const pathD = 'M ' + fullPath.map(n => {
          const { cx, cy } = cellCenter(n.col, n.row);
          return `${cx.toFixed(1)} ${cy.toFixed(1)}`;
        }).join(' L ');
        const dur = Math.max(18, fullPath.length * 0.32).toFixed(1);

        const trail = document.createElementNS(SVG_NS, 'circle');
        trail.setAttribute('r', '7');
        trail.setAttribute('class', 'pulse-trail');
        const animT = document.createElementNS(SVG_NS, 'animateMotion');
        animT.setAttribute('dur', dur + 's');
        animT.setAttribute('repeatCount', 'indefinite');
        animT.setAttribute('path', pathD);
        trail.appendChild(animT);
        svg.appendChild(trail);

        const pulse = document.createElementNS(SVG_NS, 'circle');
        pulse.setAttribute('r', '3');
        pulse.setAttribute('class', 'pulse');
        const animP = document.createElementNS(SVG_NS, 'animateMotion');
        animP.setAttribute('dur', dur + 's');
        animP.setAttribute('repeatCount', 'indefinite');
        animP.setAttribute('path', pathD);
        pulse.appendChild(animP);
        svg.appendChild(pulse);
      }
    }

    let wrap = document.getElementById('hex-global');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'hex-global';
      wrap.setAttribute('aria-hidden', 'true');
      document.body.appendChild(wrap);
    } else {
      wrap.innerHTML = '';
    }
    wrap.style.height = docH + 'px';
    wrap.appendChild(svg);
  }

  function buildAllMeshes() {
    document.querySelectorAll('section[data-folio], footer.colofon').forEach(buildSectionMesh);
    buildGlobalPath();
  }

  // Run after paint pra ter offsetHeight correto
  requestAnimationFrame(buildAllMeshes);

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(buildAllMeshes, 300);
  });

  // ---- Halo seguindo o mouse ----
  if (!reducedMotion) {
    const halo = document.querySelector('.hex-halo');
    document.addEventListener('mousemove', (e) => {
      if (!halo) return;
      halo.style.setProperty('--mx', e.clientX + 'px');
      halo.style.setProperty('--my', e.clientY + 'px');
      if (!root.classList.contains('mouse-active')) root.classList.add('mouse-active');
    }, { passive: true });
    document.addEventListener('mouseleave', () => root.classList.remove('mouse-active'));
  }

})();
