$('#generate').on('click', function () {
  var num = +$('#num').val();
  generate(num);
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate(num) {
  var events = [];
  for(var i = 0; i < num; i++) {
    var event = {start: random(0, 690)};
    event.end = random(event.start + 20, 720);
    events.push(event);
  }
  console.log('SET OF EVENTS', JSON.stringify(events));
  console.time('layoutDay ' + num);
  layOutDay(events);
  console.timeEnd('layoutDay ' + num);
}
