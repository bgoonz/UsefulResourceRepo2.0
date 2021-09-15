let me = {
  name: "Ian",
  instruments: ["bass", "synth", "guitar"],
  siblings: {
    brothers: ["Alistair"],
    sisters: ["Meghan"],
  },
};
let {
  name,
  instruments: musical_instruments,
  siblings: { sisters },
} = me;
console.log(name);
console.log(musical_instruments);
console.log(sisters);
