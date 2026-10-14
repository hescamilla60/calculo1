import { rng } from './rng.js';
export const PHASES = ['PREDICE', 'ELIGE', 'JUSTIFICA', 'VERIFICA', 'FEEDBACK'];

export class Session {
  constructor(ex) {
    this.ex = ex; this.key = 'pejv:' + ex.id; this.need = 2; // aciertos seguidos para dominar
    this.done = !!JSON.parse(localStorage.getItem(this.key) || '{}').done;
    this.streak = 0; this.tries = 0; this.reset();
  }
  // Nueva instancia del ejercicio con parámetros distintos
  reset() {
    const r = rng(Date.now() + this.tries * 7919);
    this.inst = this.ex.gen(r);
    this.inst.choices = r.shuffle(this.inst.choices);
    this.inst.justs = r.shuffle(this.inst.justs);
    Object.assign(this, { phase: 'PREDICE', hyp: '', sel: { c: null, j: null }, result: null });
  }
  canNext() {
    switch (this.phase) {
      case 'PREDICE': return this.hyp.trim().length >= 5;   // exige formular hipótesis
      case 'ELIGE': return this.sel.c !== null;
      case 'JUSTIFICA': return this.sel.j !== null;
      default: return false;
    }
  }
  next() { if (this.canNext()) this.phase = PHASES[PHASES.indexOf(this.phase) + 1]; }
  // Se evalúa tras VERIFICA: acierto = elección Y justificación correctas
  evaluate() {
    const c = this.inst.choices[this.sel.c], j = this.inst.justs[this.sel.j];
    const ok = c.ok && j.ok; this.tries++;
    this.streak = ok ? this.streak + 1 : 0;
    if (this.streak >= this.need) this.done = true;
    localStorage.setItem(this.key, JSON.stringify({ done: this.done }));
    // Una sola pista a la vez; nunca se revela la respuesta si falla
    this.result = { ok, hint: !c.ok ? c.hint : !j.ok ? j.hint : null,
                    mastered: ok && this.streak >= this.need };
    this.phase = 'FEEDBACK';
  }
}
