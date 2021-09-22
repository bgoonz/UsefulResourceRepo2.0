function magicConchShouldIUseVar() {
  let reasons = Infinity;
  for (let i = 0; i < reasons; i++) {
    if (i < reasons) {
      return "NO";
    } else {
      return "still no brah";
    }
  }
}
console.log(magicConchShouldIUseVar());
/*
|04:22:31|bryan@LAPTOP-9LGJ3JGS:[WebPack] WebPack_exitstatus:0[╗__________________________________________________________o>

node magicConch.js
NO
|04:22:47|bryan@LAPTOP-9LGJ3JGS:[WebPack] WebPack_exitstatus:0[╗__________________________________________________________o>
*/