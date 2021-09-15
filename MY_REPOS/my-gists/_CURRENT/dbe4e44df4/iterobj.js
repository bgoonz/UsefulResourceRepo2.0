let player = {
  name: "Bryan",
  skill: "hockey",
};
for (let key in player) {
  console.log(key, player[key]);
}
console.log(Object.entries(player));
