const ALPHABET = [];
const start = 'A'.charCodeAt(0);
const last = 'Z'.charCodeAt(0);
for (let i = start; i <= last; ++i) {
  ALPHABET.push(String.fromCharCode(i));
}

module.exports = {
  ALPHABET
};