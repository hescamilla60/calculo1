import { BANK } from './bank/index.js';
import { Session, PHASES } from './engine.js';
import { draw } from './plot.js';

const app = document.getElementById('app'); let S = null, s = 0;
const esc = t => t.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const done = id => JSON.parse(localStorage.getItem('pejv:' + id) || '{}').done;
const all = BANK.flatMap(m => m.exercises);

function home() {
  app.innerHTML = `<h1>Funciones para Cálculo Diferencial</h1>
  <p>Aprende con el ciclo <b>Predice → Elige → Justifica → Verifica</b>.</p>` +
    BANK.map(m => `<section><h2>${m.title}</h2>${m.exercises.map(e =>
      `<button class="card" data-ex="${e.id}">${done(e.id) ? '✅' : '⬜'} ${e.title}</button>`).join('')}</section>`).join('');
}

function render() {
  if (!S) return home();
  const i = S.inst, p = S.phase, nb = `<button class="go" data-act="next" ${S.canNext() ? '' : 'disabled'}>Continuar →</button>`;
  let h = `<button data-act="home">← Menú</button>
    <div class="steps">${PHASES.map(x => `<span class="${x === p ? 'on' : ''}">${x}</span>`).join('')}</div>
    <h2>${S.ex.title} <small>(racha ${S.streak}/${S.need})</small></h2><p>${i.statement}</p>`;
  if (p === 'PREDICE') h += `<label>Antes de ver nada, escribe tu hipótesis (¿qué crees que ocurre y por qué?):</label>
    <textarea id="hyp">${esc(S.hyp)}</textarea>${nb}`;
  if (p === 'ELIGE') h += `<p><b>Elige tu respuesta:</b></p>` + i.choices.map((c, k) =>
    `<button class="opt ${S.sel.c === k ? 'sel' : ''}" data-c="${k}">${c.t}</button>`).join('') + nb;
  if (p === 'JUSTIFICA') h += `<p><b>Tu elección:</b> ${i.choices[S.sel.c].t}</p><p><b>¿Cuál es la mejor justificación?</b></p>` +
    i.justs.map((j, k) => `<button class="opt ${S.sel.j === k ? 'sel' : ''}" data-j="${k}">${j.t}</button>`).join('') + nb;
  if (p === 'VERIFICA') { const sl = i.plot.slider; s = sl ? sl.val : 0;
    h += `<p>Tu hipótesis: <i>${esc(S.hyp)}</i></p><canvas id="cv" width="460" height="460"></canvas>` +
      (sl ? `<label>${sl.label} <b id="sv"></b></label><input id="sl" type="range" min="${sl.min}" max="${sl.max}" step="${sl.step}" value="${sl.val}">` : '') +
      `<p>Explora la gráfica y contrasta con tu hipótesis.</p><button class="go" data-act="check">Comprobar mi respuesta</button>`; }
  if (p === 'FEEDBACK') { const r = S.result;
    h += r.ok ? `<div class="ok">✅ ¡Razonamiento acertado! ${i.explain}</div>` +
      (r.mastered ? `<div class="ok">🏆 Dominaste este ejercicio con parámetros distintos.</div><button class="go" data-act="home">Volver al menú</button>`
        : `<button class="go" data-act="retry">Siguiente variación</button>`)
      : `<div class="no">🤔 Todavía no. <b>Pista:</b> ${r.hint}</div><button class="go" data-act="retry">Intentar con una variación</button>`; }
  app.innerHTML = h; redraw();
}
const redraw = () => { const cv = document.getElementById('cv'); if (!cv) return;
  draw(cv, S.inst.plot, s); const o = document.getElementById('sv'); if (o) o.textContent = s.toFixed(2); };

app.onclick = e => {
  const t = e.target.closest('[data-ex],[data-act],[data-c],[data-j]'); if (!t || t.disabled) return; const d = t.dataset;
  if (d.ex) S = new Session(all.find(x => x.id === d.ex));
  else if (d.c !== undefined) S.sel.c = +d.c;
  else if (d.j !== undefined) S.sel.j = +d.j;
  else if (d.act === 'home') S = null;
  else if (d.act === 'next') S.next();
  else if (d.act === 'check') S.evaluate();
  else if (d.act === 'retry') S.reset();
  render();
};
app.oninput = e => {
  if (e.target.id === 'hyp') { S.hyp = e.target.value;
    document.querySelector('[data-act=next]').disabled = !S.canNext(); }
  if (e.target.id === 'sl') { s = +(+e.target.value).toFixed(2); redraw(); }
};
render();
