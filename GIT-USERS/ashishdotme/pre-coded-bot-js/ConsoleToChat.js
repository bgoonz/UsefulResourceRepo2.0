//add this to events\message.js when ready!
let y = process.openStdin();
y.addListener("data", (res) => {
  let x = res.toString().trim().split(/ +/g);
  bot.channels.get(channel_id).send(`${x.join(" ")}`);
});
