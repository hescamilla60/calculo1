import { lin, tm } from './util.js';
export default { title: 'Módulo 5 · Argumentación y preparación para el límite', exercises: [
{ id: 'm5e1', title: 'Acercarse a un punto donde f no está definida',
  gen: r => { const a = r.pick([1, 2, 3, -1, -2, -3]), f = x => Math.abs(x - a) < 1e-9 ? NaN : (x * x - a * a) / (x - a);
    return {
      statement: `Sea f(x) = (x² − ${a * a}) / (${lin(a)}). ¿A qué valor se acercan las salidas cuando x se acerca a ${a} (sin ser igual a ${a})?`,
      choices: [
        { t: `${2 * a}`, ok: true },
        { t: '0', ok: false, hint: 'Sustituir x=a da 0/0: una indeterminación que no te dice a qué valor se acercan los vecinos.' },
        { t: 'A ninguno, porque f no está definida en ese punto', ok: false, hint: 'Que f(a) no exista no impide que los valores cercanos se acerquen a algo. Explora con la sonda.' },
        { t: `${a * a}`, ok: false, hint: `Calcula f(${a}+0.1) y f(${a}−0.1) con la sonda y compara.` }],
      justs: [
        { t: 'Para x ≠ a, f(x) = x + a; lo que importa son los valores vecinos de a, no el valor en a', ok: true },
        { t: 'Como f(a) no está definida, no hay forma de aproximarse', ok: false, hint: 'Distingue "valor en a" de "valores cerca de a".' },
        { t: 'Sustituyo x = a y obtengo 0, así que el valor es 0', ok: false, hint: '¿Es 0/0 igual a 0?' },
        { t: 'La función se interrumpe en a, por lo que hay un salto', ok: false, hint: 'Un salto exige lados con valores distintos: compara izquierda y derecha.' }],
      plot: { xr: [-7, 7], yr: [-7, 7], fns: [{ f, c: '#2563eb', label: 'f' }], holes: [[a, 2 * a]], probe: true,
        slider: { label: 'sonda x =', min: a - 2, max: a + 2, step: 0.1, val: a - 2 } },
      explain: `Fuera de x=${a}, f coincide con x + ${a}: las salidas se acercan a ${2 * a}, aunque f(${a}) no exista (hueco en la gráfica).` }; } },
{ id: 'm5e2', title: '¿Existe el límite? Lados, saltos y f(a)',
  gen: r => { const a = r.int(-2, 2), d = r.pick([0, 0, 2, -2, 3, -3]), isE = d === 0, fa = a - 3,
      f = x => x < a ? x + 1 : x > a ? x + 1 + d : NaN;
    return {
      statement: `Sea f(x) = x + 1 si x < ${a};  f(${a}) = ${fa};  f(x) = ${tm('x', 1 + d)} si x > ${a}. ¿Existe el límite de f cuando x → ${a}?`,
      choices: [
        { t: 'Sí: ambos lados se acercan al mismo valor', ok: isE, hint: `Evalúa con la sonda en x = ${a}−0.25 y x = ${a}+0.25 y compara.` },
        { t: 'No: los lados se acercan a valores distintos', ok: !isE, hint: `Evalúa con la sonda en x = ${a}−0.25 y x = ${a}+0.25. ¿Realmente difieren?` },
        { t: `Sí, y es igual a f(${a})`, ok: false, hint: `Compara f(${a}) con los valores vecinos. ¿Importa f(${a}) para la aproximación?` },
        { t: 'Depende de si f está definida en ese punto', ok: false, hint: 'Cambia f(a) a tu gusto: ¿cambian las salidas de los puntos vecinos?' }],
      justs: [
        { t: `Por ambos lados las salidas se acercan al mismo número (${a + 1}); f(${a}) es irrelevante`, ok: isE, hint: 'Compara qué número se aproxima por la izquierda y por la derecha.' },
        { t: `Por la izquierda se acercan a ${a + 1} y por la derecha a ${a + 1 + d}: no coinciden`, ok: !isE, hint: 'Compara qué número se aproxima por la izquierda y por la derecha.' },
        { t: 'El límite es el valor de la función en el punto', ok: false, hint: 'Observa el punto rojo (f(a)) frente a los huecos: ¿coinciden con lo que hacen los vecinos?' },
        { t: 'Como hay un punto aislado, el límite no existe', ok: false, hint: 'Un punto aislado solo cambia f(a), no a los vecinos.' }],
      plot: { xr: [-6, 6], yr: [-6, 8], fns: [{ f, c: '#2563eb', label: 'f' }],
        holes: isE ? [[a, a + 1]] : [[a, a + 1], [a, a + 1 + d]], dots: [[a, fa]], probe: true,
        slider: { label: 'sonda x =', min: a - 2, max: a + 2, step: 0.25, val: a - 2 } },
      explain: isE ? 'Los dos lados convergen al mismo número; el límite existe y no depende de f(a).'
                   : 'Los lados convergen a números distintos, así que el límite no existe, sin importar f(a).' }; } }
]};
