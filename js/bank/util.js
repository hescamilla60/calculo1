export const tm = (b, c) => `${b} ${c < 0 ? '−' : '+'} ${Math.abs(c)}`; // "x − 3", "x + 2"
export const lin = a => a === 0 ? 'x' : tm('x', -a);                    // x − a
