// spec: {xr, yr, fns:[{f(x,s),c,dash,label}], pts, holes, dots, slider, probe}
export function draw(cv, sp, s = 0) {
  const g = cv.getContext('2d'), W = cv.width, H = cv.height, [x0, x1] = sp.xr, [y0, y1] = sp.yr;
  const X = x => (x - x0) / (x1 - x0) * W, Y = y => H - (y - y0) / (y1 - y0) * H;
  g.clearRect(0, 0, W, H); g.font = '11px sans-serif'; g.lineWidth = 1;
  for (let x = Math.ceil(x0); x <= x1; x++) { g.strokeStyle = x ? '#e5e7eb' : '#374151';
    g.beginPath(); g.moveTo(X(x), 0); g.lineTo(X(x), H); g.stroke();
    g.fillStyle = '#6b7280'; g.fillText(x, X(x) + 2, Y(0) - 3); }
  for (let y = Math.ceil(y0); y <= y1; y++) { g.strokeStyle = y ? '#e5e7eb' : '#374151';
    g.beginPath(); g.moveTo(0, Y(y)); g.lineTo(W, Y(y)); g.stroke();
    if (y) { g.fillStyle = '#6b7280'; g.fillText(y, X(0) + 3, Y(y) - 2); } }
  (sp.fns || []).forEach((fn, k) => {
    g.strokeStyle = fn.c; g.lineWidth = 2.5; g.setLineDash(fn.dash ? [6, 5] : []); g.beginPath();
    let pen = false, py = 0;
    for (let px = 0; px <= W; px++) {
      const y = fn.f(x0 + px / W * (x1 - x0), s);
      if (!isFinite(y)) { pen = false; continue; }
      const q = Y(y);
      (pen && Math.abs(q - py) < H / 2) ? g.lineTo(px, q) : g.moveTo(px, q); // corta saltos/asíntotas
      pen = true; py = q;
    }
    g.stroke(); g.setLineDash([]);
    if (fn.label) { g.fillStyle = fn.c; g.fillText('— ' + fn.label, 8, 14 + 14 * k); }
  });
  const dot = (p, fill, c = '#2563eb') => { g.beginPath(); g.arc(X(p[0]), Y(p[1]), 5, 0, 7);
    g.fillStyle = fill ? c : '#fff'; g.fill(); g.strokeStyle = c; g.lineWidth = 2; g.stroke(); };
  (sp.pts || []).forEach(p => dot(p, true)); (sp.dots || []).forEach(p => dot(p, true, '#dc2626'));
  (sp.holes || []).forEach(p => dot(p, false));
  if (sp.probe) {   // sonda: recta vertical + lectura numérica de la primera curva
    g.strokeStyle = '#f59e0b'; g.lineWidth = 2; g.beginPath(); g.moveTo(X(s), 0); g.lineTo(X(s), H); g.stroke();
    if (sp.fns?.length) { const y = sp.fns[0].f(s, s); g.fillStyle = '#111827'; g.font = 'bold 13px sans-serif';
      g.fillText(isFinite(y) ? `f(${s.toFixed(2)}) = ${y.toFixed(3)}` : `f(${s.toFixed(2)}) no definida`, 8, H - 10);
      if (isFinite(y)) dot([s, y], true, '#f59e0b'); }
  }
}
