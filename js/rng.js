// Generador con semilla (mulberry32) + utilidades
export function rng(seed) {
  let s = seed >>> 0;
  const next = () => {
    s = (s + 0x6D2B79F5) >>> 0; let t = s;
    t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  const int = (a, b) => a + Math.floor(next() * (b - a + 1));
  const pick = arr => arr[int(0, arr.length - 1)];
  const shuffle = arr => { const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = int(0, i); [a[i], a[j]] = [a[j], a[i]]; }
    return a; };
  return { next, int, pick, shuffle };
}
