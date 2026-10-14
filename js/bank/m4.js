import { tm } from './util.js';
export default { title: 'Módulo 4 · Familias esenciales', exercises: [
{ id: 'm4e1', title: 'Exponencial desplazada: comportamiento extremo',
  gen: r => { const a = r.pick([1, 2, 3, -1, -2]), b = r.pick([2, 3, 0.5]), c = r.pick([-3, -2, -1, 1, 2, 3]), grow = b > 1;
    return {
      statement: `Sea f(x) = ${a}·${b}^x ${c < 0 ? '−' : '+'} ${Math.abs(c)}. Cuando x toma valores muy negativos (x → −∞), ¿qué hacen las salidas?`,
      choices: [
        { t: `Se aproximan a y = ${c}`, ok: grow, hint: 'Evalúa b^x en x = −5 y x = −10 con esa base. ¿Se acerca a 0?' },
        { t: 'Se aproximan a 0', ok: false, hint: '0 sería el comportamiento de b^x sola; ¿qué le hacen a la salida el factor a y el término c?' },
        { t: 'Crecen o decrecen sin cota (no se aproximan a un valor)', ok: !grow, hint: 'Evalúa b^x en x = −5, −10: ¿se acerca a algo o se dispara?' },
        { t: `Se aproximan a ${a + c}`, ok: false, hint: 'a+c es f(0): un valor puntual, no un comportamiento extremo.' }],
      justs: [
        { t: 'Si b > 1, b^x → 0 cuando x → −∞; solo queda el desplazamiento c', ok: grow, hint: 'Revisa si la base b es mayor o menor que 1.' },
        { t: 'Si 0 < b < 1, b^x = (1/b)^(−x) crece sin cota cuando x → −∞', ok: !grow, hint: 'Revisa si la base b es mayor o menor que 1.' },
        { t: 'Una exponencial nunca puede acercarse a un valor', ok: false, hint: 'Piensa en (1/2)^x cuando x crece: ¿qué pasa?' },
        { t: 'La asíntota siempre es y = 0 porque b^x no es negativa', ok: false, hint: 'c traslada verticalmente toda la gráfica, asíntota incluida.' }],
      plot: { xr: [-6, 4], yr: [-8, 8], fns: [{ f: x => a * b ** x + c, c: '#2563eb', label: 'f' }], probe: true,
        slider: { label: 'sonda x =', min: -6, max: 3, step: 0.5, val: 0 } },
      explain: grow ? `Con b > 1, b^x se apaga al ir a −∞ y f se pega a y = ${c} (asíntota horizontal).`
                    : 'Con 0 < b < 1, b^x se dispara al ir a −∞: no hay asíntota en ese lado.' }; } },
{ id: 'm4e2', title: 'Periodo de sen(kx) y cos(kx)',
  gen: r => { const k = r.pick([2, 3, 4]), nm = r.pick(['sen', 'cos']), fn = nm === 'sen' ? Math.sin : Math.cos;
    return {
      statement: `¿Cuál es el periodo de f(x) = ${nm}(${k}x)?`,
      choices: [
        { t: `2π/${k}`, ok: true },
        { t: `2π·${k}`, ok: false, hint: 'Multiplicar x por k comprime la onda: ¿el periodo debe crecer o decrecer?' },
        { t: `π/${k}`, ok: false, hint: `Cuenta cuántos ciclos completos caben en [0, 2π] y divide 2π entre esa cantidad.` },
        { t: '2π', ok: false, hint: `Ese es el periodo de ${nm}(x). ¿Qué efecto tiene el factor k sobre la entrada?` }],
      justs: [
        { t: `${nm}(kx) completa un ciclo cuando kx recorre 2π, es decir cuando x recorre 2π/k`, ok: true },
        { t: 'Multiplicar por k alarga la onda k veces', ok: false, hint: `Prueba k=2: ¿sen(2x) llega a su máximo antes o después que sen(x)?` },
        { t: 'k es la amplitud y no cambia el periodo', ok: false, hint: 'La amplitud multiplica a la función completa, no a la variable x.' },
        { t: 'El periodo de seno y coseno siempre es 2π', ok: false, hint: 'Eso vale para sen(x) y cos(x); aquí la entrada está escalada.' }],
      plot: { xr: [-7, 7], yr: [-2, 2], fns: [{ f: x => fn(k * x), c: '#2563eb', label: `${nm}(${k}x)` },
        { f: x => fn(x), c: '#9ca3af', dash: true, label: `${nm}(x)` }], probe: true,
        slider: { label: 'sonda x =', min: -6.5, max: 6.5, step: 0.1, val: 0 } },
      explain: `kx debe avanzar 2π para repetir el ciclo; por eso x solo necesita avanzar 2π/${k}.` }; } }
]};
