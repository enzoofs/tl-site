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
  // HEX MESH por secao · linhas sempre via centros dos hexes
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

  const cellCenter = (col, row) => ({
    cx: col * HEX_W + ((row % 2) ? HEX_W / 2 : 0),
    cy: row * ROW_H
  });

  // axial offset -> cube coords (para hex distance)
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
    const odd = row % 2 === 1;
    return [
      [col + 1, row],                 // E
      [col - 1, row],                 // W
      [col + (odd ? 1 : 0), row - 1], // NE
      [col - (odd ? 0 : 1), row - 1], // NW
      [col + (odd ? 1 : 0), row + 1], // SE
      [col - (odd ? 0 : 1), row + 1], // SW
    ];
  }

  /**
   * Caminho greedy passando hex-a-hex do start ao end, sempre via centros.
   * Em cada passo, escolhe o vizinho que mais reduz a distancia hex.
   * Empates sao quebrados alternando pra dar zig-zag natural.
   */
  function gridPath(start, end, cols, rows) {
    const path = [start];
    let cur = { ...start };
    let parity = 0;
    let safety = 0;
    while ((cur.col !== end.col || cur.row !== end.row) && safety++ < 80) {
      const curDist = hexDist(cur.col, cur.row, end.col, end.row);
      const opts = neighbors(cur.col, cur.row)
        .filter(([c, r]) => c >= 0 && r >= 0 && c < cols && r < rows)
        .map(([c, r]) => ({ c, r, d: hexDist(c, r, end.col, end.row) }))
        .filter(o => o.d < curDist)
        .sort((a, b) => a.d - b.d);
      if (!opts.length) break;
      // pega o primeiro ou segundo alternando (dá o zig-zag)
      const pick = opts[parity % Math.min(opts.length, 2)];
      parity++;
      cur = { col: pick.c, row: pick.r };
      path.push(cur);
    }
    return path;
  }

  /** Ancoras bem espacadas: ~10 celulas ao longo do eixo X da seccao */
  function pickAnchors(cols, rows) {
    const total = 8 + Math.floor(Math.random() * 3);
    const anchors = [];
    const step = cols / total;
    for (let i = 0; i < total; i++) {
      const col = Math.round(step * (i + 0.5) + (Math.random() - 0.5) * step * 0.4);
      // varia a linha pra criar ondulacao
      const midRow = Math.floor(rows / 2);
      const amp = Math.min(rows / 2 - 1, 4 + Math.random() * 3);
      const row = Math.round(midRow + Math.sin(i * 1.3 + Math.random()) * amp);
      anchors.push({
        col: Math.max(1, Math.min(cols - 2, col)),
        row: Math.max(1, Math.min(rows - 2, row))
      });
    }
    return anchors;
  }

  function buildSectionMesh(section) {
    const w = section.offsetWidth;
    const h = section.offsetHeight;
    if (!w || !h) return;

    const cols = Math.ceil(w / HEX_W) + 2;
    const rows = Math.ceil(h / ROW_H) + 2;

    // Gera hex mesh base
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({ col: c, row: r, ...cellCenter(c, r) });
      }
    }

    // Sombra aleatoria ~12%
    const shadeSet = new Set();
    const nShade = Math.floor(cells.length * 0.12);
    for (let i = 0; i < nShade; i++) shadeSet.add(Math.floor(Math.random() * cells.length));

    // Ancoras e caminho via centros (retas/diagonais no grid)
    const anchors = pickAnchors(cols, rows);
    const fullPath = [];
    for (let i = 0; i < anchors.length - 1; i++) {
      const seg = gridPath(anchors[i], anchors[i + 1], cols, rows);
      if (i === 0) fullPath.push(...seg);
      else fullPath.push(...seg.slice(1));
    }

    // Build SVG
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${cols * HEX_W} ${rows * ROW_H}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

    // base mesh
    const meshG = document.createElementNS(SVG_NS, 'g');
    for (let i = 0; i < cells.length; i++) {
      const p = document.createElementNS(SVG_NS, 'polygon');
      p.setAttribute('class', shadeSet.has(i) ? 'hx-shade' : 'hx');
      p.setAttribute('points', hexPoints(cells[i].cx, cells[i].cy));
      meshG.appendChild(p);
    }
    svg.appendChild(meshG);

    // conn: polyline passando por TODOS os centros do fullPath
    if (fullPath.length > 1) {
      const ptsStr = fullPath
        .map(n => {
          const { cx, cy } = cellCenter(n.col, n.row);
          return `${cx.toFixed(1)},${cy.toFixed(1)}`;
        })
        .join(' ');
      const conn = document.createElementNS(SVG_NS, 'polyline');
      conn.setAttribute('class', 'conn');
      conn.setAttribute('points', ptsStr);
      svg.appendChild(conn);

      // Lit cells = apenas os ancoras (não todo hex do path)
      for (const a of anchors) {
        const { cx, cy } = cellCenter(a.col, a.row);
        const lit = document.createElementNS(SVG_NS, 'polygon');
        lit.setAttribute('class', 'hx-lit');
        lit.setAttribute('points', hexPoints(cx, cy, HEX_R * 0.9));
        svg.appendChild(lit);
      }

      // Pulse: percorre o caminho via animateMotion
      if (!reducedMotion) {
        const pathD = 'M ' + fullPath
          .map(n => {
            const { cx, cy } = cellCenter(n.col, n.row);
            return `${cx.toFixed(1)} ${cy.toFixed(1)}`;
          })
          .join(' L ');

        const dur = Math.max(7, fullPath.length * 0.45).toFixed(1);

        // rastro
        const trail = document.createElementNS(SVG_NS, 'circle');
        trail.setAttribute('r', '7');
        trail.setAttribute('class', 'pulse-trail');
        const animT = document.createElementNS(SVG_NS, 'animateMotion');
        animT.setAttribute('dur', dur + 's');
        animT.setAttribute('repeatCount', 'indefinite');
        animT.setAttribute('path', pathD);
        trail.appendChild(animT);
        svg.appendChild(trail);

        // nucleo
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

    // Inject
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

  function buildAllMeshes() {
    document.querySelectorAll('section[data-folio], footer.colofon').forEach(buildSectionMesh);
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
