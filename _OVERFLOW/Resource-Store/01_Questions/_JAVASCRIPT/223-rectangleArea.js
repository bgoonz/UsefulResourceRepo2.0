/**
 * Key: find the left most x, right most x, top most y, top most y,
 * that is the overlap rectangle.
 * @param {number} A
 * @param {number} B
 * @param {number} C
 * @param {number} D
 * @param {number} E
 * @param {number} F
 * @param {number} G
 * @param {number} H
 * @return {number}
 */
const computeArea = (A, B, C, D, E, F, G, H) => {
    const areaA = (C-A) * (D-B);
    const areaB = (G-E) * (H-F);

    const left = Math.max(A, E);
    const right = Math.min(C, G);
    const top = Math.min(D, H);
    const bottom = Math.max(B, F);

    let overlapArea = 0;
    if (right > left && top > bottom) {
        overlapArea = (right -left) * (top - bottom);
    }

    return areaA + areaB - overlapArea;
};
