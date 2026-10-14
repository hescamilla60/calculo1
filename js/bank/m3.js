import { tm } from './util.js';
export default { title: 'Módulo 3 · Transformaciones, composición e inversa', exercises: [
{ id: 'm3e1', title: 'Traslación horizontal: f(x ± a)',
  gen: r => { const a = r.int(1, 4), dir = r.pick([1, -1]), c = dir * a, f = x => x * x;
    return {
      statement: `Sea f(x) = x². ¿Cómo se relaciona la gráfica de g(x) = f(${tm('x', c)}) con la de f?`,
      choices: [
        { t: `Se traslada ${a} unidades a la izquierda`, ok: dir > 0, hint: 'Comprueba con un punto: f alcanza su mínimo en x=0. ¿Para qué x alcanza g su mínimo?' },
        { t: `Se traslada ${a} unidades a la derecha`, ok: dir < 0, hint: 'Comprueba con un punto: f alcanza su mínimo en x=0. ¿Para qué x alcanza g su mínimo?' },
        { t: `Se traslada ${a} unidades hacia arriba`, ok: false, hint: 'Sumar fuera de f mueve verticalmente; aquí la suma está dentro del paréntesis.' },
        { t: 'Se refleja respecto al eje vertical', ok: false, hint: 'Reflejar cambia x por −x; aquí se suma una constante a x.' }],
      justs: [
        { t: `g repite valores de f en x ${c < 0 ? '−' : '+'} ${a}: su mínimo ocurre cuando ${tm('x', c)} = 0, es decir x = ${-c}`, ok: true },
        { t: 'El signo + indica moverse hacia la derecha, como en la recta numérica', ok: false, hint: 'Halla dónde g alcanza su mínimo: resuelve la expresión dentro del paréntesis igual a 0.' },
        { t: 'Sumar una constante a la variable suma esa constante a las salidas', ok: false, hint: 'Si x=0, ¿qué entrada recibe f en g(0)?' },
        { t: 'La parábola se ensancha o se angosta', ok: false, hint: 'Las constantes dentro del paréntesis no multiplican: son traslaciones rígidas.' }],
      plot: { xr: [-8, 8], yr: [-2, 16], fns: [
        { f, c: '#9ca3af', dash: true, label: 'f(x)' }, { f: (x, s) => f(x + s), c: '#2563eb', label: 'g(x) = f(x + s)' }],
        slider: { label: 's =', min: -5, max: 5, step: 1, val: c } },
      explain: `La entrada de f es x ${c < 0 ? '−' : '+'} ${a}; el vértice se mueve a x = ${-c}: la gráfica se desplaza en sentido contrario al signo.` }; } },
{ id: 'm3e2', title: 'Inversa de una función lineal',
  gen: r => { const a = r.pick([2, 3, 4, 5, -2, -3]), b = r.pick([-4, -3, -2, -1, 1, 2, 3, 4]),
      den = a < 0 ? `(${a})` : a;
    return {
      statement: `Sea f(x) = ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}. ¿Cuál es f⁻¹(x)?`,
      choices: [
        { t: `(${tm('x', -b)}) / ${den}`, ok: true },
        { t: `(${tm('x', b)}) / ${den}`, ok: false, hint: 'Prueba: calcula f(0) y aplícale tu fórmula. ¿Recuperas 0?' },
        { t: tm(`x/${den}`, -b), ok: false, hint: 'f hizo primero ×a y luego +b. La inversa deshace en orden contrario.' },
        { t: `1 / (${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)})`, ok: false, hint: 'f⁻¹ no es 1/f: el recíproco no deshace. Prueba f⁻¹(f(1)).' }],
      justs: [
        { t: 'Deshago las operaciones en orden inverso (quito b, luego divido entre a), equivalente a despejar x de y = ax+b', ok: true },
        { t: 'La inversa es el recíproco: 1/f(x)', ok: false, hint: 'Inversa significa "deshacer", no "invertir el número".' },
        { t: 'Basta cambiar el signo de b y de a', ok: false, hint: 'Cambiar signos da el opuesto, no la inversa. Prueba con f(1).' },
        { t: 'Intercambiar x e y es suficiente, sin despejar', ok: false, hint: 'Tras intercambiar x e y, aún hay que despejar y.' }],
      plot: { xr: [-8, 8], yr: [-8, 8], fns: [
        { f: x => a * x + b, c: '#2563eb', label: 'f' }, { f: x => x, c: '#9ca3af', dash: true, label: 'y = x' },
        { f: x => (x - b) / a, c: '#ea580c', label: 'f⁻¹' }] },
      explain: 'f⁻¹ deshace f: las gráficas son reflejos una de otra respecto a y = x.' }; } }
]};
