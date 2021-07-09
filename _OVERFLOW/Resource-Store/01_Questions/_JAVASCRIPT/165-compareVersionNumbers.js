/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
const compareVersion = (version1, version2) => {
    const versionOne = version1.split('.');
    const versionTwo = version2.split('.');
    if (versionOne.length <= versionTwo.length) {
        for (var i = versionOne.length; i < versionTwo.length; i++) {
            versionOne[i] = '0';
         }
    }
    if (versionTwo.length < versionOne.length) {
        for (var i = versionTwo.length; i < versionOne.length; i++) {
            versionTwo[i] = '0';
         }
    }

    for (var i = 0; i < versionOne.length; i++) {
        const versionOneInt = parseInt(versionOne[i]);
        const versionTwoInt = parseInt(versionTwo[i]);
        if (versionOneInt < versionTwoInt) return -1;
        if (versionOneInt > versionTwoInt) return 1;
    }
    return 0;
};
