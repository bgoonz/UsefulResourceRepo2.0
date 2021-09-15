var list = document.getElementsByTagName("rect")
var color_strings = ['var(--color-calendar-graph-day-L4-bg)', 'var(--color-calendar-graph-day-L3-bg)', 'var(--color-calendar-graph-day-L2-bg)', 'var(--color-calendar-graph-day-L1-bg)']

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function demo() {
  for (i = 0; i < 100000; i++) {
    var current_rectangle = list[getRandomInt(0, list.length - 1)];
    current_rectangle.setAttribute('fill', color_strings[getRandomInt(0, color_strings.length - 1)])
    await sleep(getRandomInt(1, 12));
  }
}

demo();
