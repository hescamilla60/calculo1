import { lin, tm } from './util.js';
export default { title: 'Módulo 2 · Dominio, rango y representaciones', exercises: [
{ id: 'm2e1', title: 'Dominio con raíz y fracción',
  gen: r => { const a = r.int(-3, 2), b = a + r.int(1, 3), f = x => Math.sqrt(x - a) / (x - b);
    return {
      statement: `¿Cuál es el dominio de f(x) = √(${lin(a)}) / (${lin(b)})?`,
      choices: [
        { t: `[${a}, ∞) excepto x = ${b}`, ok: true },
        { t: `(${a}, ∞)`, ok: false, hint: '¿Puede el radicando valer 0? Evalúa √0.' },
        { t: `ℝ excepto x = ${b}`, ok: false, hint: 'Olvidaste la raíz: ¿para qué x existe √(x−a) en los reales?' },
        { t: `[${a}, ∞)`, ok: false, hint: `En x = ${b} el denominador se anula. ¿Qué pasa ahí?` }],
      justs: [
        { t: 'Se exige a la vez radicando ≥ 0 y denominador ≠ 0', ok: true },
        { t: 'Solo importa el denominador: no puede ser 0', ok: false, hint: 'Revisa también la raíz: ¿puede el radicando ser negativo?' },
        { t: 'El radicando debe ser > 0 porque la raíz de 0 no existe', ok: false, hint: '√0 = 0 es un real perfectamente válido.' },
        { t: 'x = b ya queda fuera del radicando permitido, no hay que excluirlo', ok: false, hint: 'Verifica si b pertenece a [a, ∞).' }],
      plot: { xr: [-6, 8], yr: [-4, 4], fns: [{ f, c: '#2563eb', label: 'f' }], probe: true,
        slider: { label: 'sonda x =', min: -5, max: 7, step: 0.5, val: -5 } },
      explain: 'Hay dos restricciones simultáneas: x−a ≥ 0 y x−b ≠ 0. Como b > a, el punto b está dentro de [a,∞) y hay que sacarlo.' }; } },
{ id: 'm2e2', title: 'Rango leído desde la forma algebraica',
  gen: r => { const h = r.int(-3, 3), k = r.pick([-3, -2, -1, 1, 2, 3]), sg = r.pick([1, -1]);
    return {
      statement: `Considera f(x) = ${sg < 0 ? '−' : ''}(${lin(h)})² ${tm('', k).trim()}. ¿Cuál es su rango?`.replace('  ', ' '),
      choices: [
        { t: `[${k}, ∞)`, ok: sg > 0, hint: 'Mira el signo delante del cuadrado: ¿el vértice es el punto más bajo o el más alto?' },
        { t: `(−∞, ${k}]`, ok: sg < 0, hint: 'Mira el signo delante del cuadrado: ¿el vértice es el punto más bajo o el más alto?' },
        { t: 'ℝ', ok: false, hint: 'x toma cualquier real, pero ¿y también? ¿puede (x−h)² ser negativo?' },
        { t: `[${h}, ∞)`, ok: false, hint: 'h es una coordenada x. El rango habla de salidas (y).' }],
      justs: [
        { t: '(x−h)² ≥ 0, así que f ≥ k: el vértice es el valor mínimo', ok: sg > 0, hint: 'Revisa el signo del término cuadrado.' },
        { t: '−(x−h)² ≤ 0, así que f ≤ k: el vértice es el valor máximo', ok: sg < 0, hint: 'Revisa el signo del término cuadrado.' },
        { t: 'El rango depende de h, la coordenada x del vértice', ok: false, hint: 'Trasladar horizontalmente no cambia qué salidas se alcanzan.' },
        { t: 'Como el dominio es ℝ, el rango también es ℝ', ok: false, hint: 'Dominio y rango son conjuntos distintos; evalúa f en varios x.' }],
      plot: { xr: [-6, 6], yr: [-8, 8], fns: [{ f: x => sg * (x - h) ** 2 + k, c: '#2563eb', label: 'f' }], probe: true,
        slider: { label: 'sonda x =', min: -5, max: 5, step: 0.5, val: -5 } },
      explain: `El vértice (${h}, ${k}) es el ${sg > 0 ? 'mínimo' : 'máximo'}: las salidas cubren ${sg > 0 ? `[${k}, ∞)` : `(−∞, ${k}]`}.` }; } }
]};
