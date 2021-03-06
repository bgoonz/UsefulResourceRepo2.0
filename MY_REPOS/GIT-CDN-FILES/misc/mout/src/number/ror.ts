/**
 * Bitwise circular shift right
 * http://en.wikipedia.org/wiki/Circular_shift
 */
function ror(val: number, shift: number): number {
    return (val >> shift) | (val << (32 - shift));
}
export default ror;
