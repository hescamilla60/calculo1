import { } from './util.js';
export default { title: 'Módulo 1 · Función como correspondencia y modelo', exercises: [
{ id: 'm1e1', title: '¿Es función? Entradas y salidas',
  gen: r => {
    const isF = r.next() < .5, xs = r.shuffle([-3, -2, -1, 0, 1, 2, 3]).slice(0, 4);
    let P = xs.map(x => [x, r.int(-3, 4)]);
    if (isF) P[1][1] = P[0][1];                       // salida repetida (válido)
    else P.push([xs[0], P[0][1] + r.pick([-2, -1, 1, 2])]); // entrada repetida con otra salida
    P = r.shuffle(P);
    return {
      statement: `Una relación asigna a cada entrada x una salida y: ${P.map(([x, y]) => `(${x}, ${y})`).join(' , ')}. ¿Define y como función de x?`,
      choices: [
        { t: 'Sí, y es función de x', ok: isF, hint: 'Revisa las entradas x: ¿alguna aparece más de una vez? ¿Con qué salidas?' },
        { t: 'No, no es función', ok: !isF, hint: 'Fíjate en qué se repite: ¿entradas o salidas? ¿Cuál de las dos violaría la definición?' }],
      justs: [
        { t: 'Ninguna entrada se repite con salidas distintas (que una salida se repita no importa)', ok: isF, hint: 'Pregúntate quién debe ser único en una función: ¿la entrada o la salida?' },
        { t: 'Una misma entrada aparece con dos salidas distintas', ok: !isF, hint: 'Recorre la lista buscando una entrada con dos salidas.' },
        { t: 'Hay salidas repetidas, así que no puede ser función', ok: false, hint: 'Piensa en f(x)=x²: f(2)=f(−2). ¿Deja de ser función?' },
        { t: 'Los valores de y no siguen un patrón algebraico', ok: false, hint: 'Función es correspondencia; no exige fórmula.' }],
      plot: { xr: [-4, 4], yr: [-5, 6], pts: P, probe: true,
        slider: { label: 'recta vertical x =', min: -3, max: 3, step: 1, val: 0 } },
      explain: isF ? 'Cada x tiene una única salida; la recta vertical corta como máximo un punto. Repetir y no rompe la definición.'
                   : 'Una recta vertical corta dos puntos: esa entrada tiene dos salidas, así que no hay función.' };
  } },
{ id: 'm1e2', title: 'Modelo lineal: ¿qué hace el parámetro?',
  gen: r => { const a = r.int(1, 4), b = r.int(1, 3);
    return {
      statement: `Un taxi cobra una tarifa base de ${a} (miles de COP) más ${b} (miles) por km: C(x) = ${a} + ${b}x. Si la tarifa por km se duplica, ¿qué ocurre con la gráfica de C?`,
      choices: [
        { t: 'Se vuelve más empinada y sigue cortando el eje vertical en el mismo punto', ok: true },
        { t: 'Se desplaza hacia arriba sin cambiar su inclinación', ok: false, hint: 'Calcula el costo de un viaje de 0 km con la nueva tarifa. ¿Cambia?' },
        { t: 'Corta el eje vertical al doble de altura', ok: false, hint: 'C(0): ¿qué se paga sin recorrer nada? ¿Interviene la tarifa por km?' },
        { t: 'Se desplaza hacia la derecha', ok: false, hint: 'Una traslación horizontal cambia x por x−h; aquí cambia el coeficiente que multiplica a x.' }],
      justs: [
        { t: 'La tarifa por km es la razón de cambio (pendiente) y la base es el valor en x=0; cambiar una no altera la otra', ok: true },
        { t: 'Duplicar un parámetro duplica todos los valores de C, incluida la tarifa base', ok: false, hint: 'Solo se duplica el término bx. ¿Qué vale ese término cuando x=0?' },
        { t: 'Cualquier cambio en la fórmula traslada la gráfica', ok: false, hint: 'Distingue trasladar de inclinar: ¿qué propiedad de la recta cambia?' }],
      plot: { xr: [0, 5], yr: [0, 35], fns: [
        { f: x => a + b * x, c: '#9ca3af', dash: true, label: 'C original' },
        { f: (x, s) => a + s * x, c: '#2563eb', label: 'C con tarifa s' }],
        slider: { label: 'tarifa por km s =', min: 0.5, max: 2 * b, step: 0.5, val: b } },
      explain: 'La pendiente es la razón de cambio (costo por km); el término constante es el valor inicial. Duplicar la pendiente inclina más la recta sin mover C(0).' }; } }
]};
