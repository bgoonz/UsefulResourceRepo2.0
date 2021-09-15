let colors = {
    red: "scarlet",
    blue: "aquamarine"
};
let newColors = {
    ...colors
};
console.log('newColors:',newColors)
// { red: "scarlet", blue: "aquamarine" };
let colors1a = {
    red: "scarlet",
    blue: "aquamarine"
};
let colors2 = {
    green: "forest",
    yellow: "sunflower"
};
let moreColors = {
    ...colors1a,
    ...colors2
};

console.log('moreColors:',moreColors);
// {red: "scarlet", blue: "aquamarine", green: "forest", yellow: "sunflo