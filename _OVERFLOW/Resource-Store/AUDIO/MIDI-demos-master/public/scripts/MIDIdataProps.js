function MIDIdataProps(screenEl, data) {
  this.screen = screenEl;
  this.note = data[1];
  this.velocity = data[2];

}
MIDIdataProps.prototype.midiOn = function() {
  return '[144,'+this.note+','+this.velocity+']';
}
MIDIdataProps.prototype.midiOff = function() {
  return '[128,'+this.note+','+this.velocity+']';
}
// TODO write linear transform function and test
MIDIdataProps.prototype.leftPos = function() {
  var leftPos = linearTransform(0, 100, 31, 96);
  return leftPos;
}
MIDIdataProps.prototype.colour = function() {
  return 'hsla('+( Math.floor(Math.pow(this.note,2)/24) )+',50%,60%,1)';
}
MIDIdataProps.prototype.emoji = function() {
  var a = 144 + 96;
  var b = 159; // magical part for this range of emoji
  var c = this.note + 85; // Puts us in the correct range
  var d = 128; // More emoji range magic

  var onArray = new Uint8Array([a, b, c, d]);
  var decoder = new TextDecoder();
  var emoji = decoder.decode(onArray, {stream: true});
  return emoji;
}
MIDIdataProps.prototype.firework = function() {
  var fireHtml = '<span>*</span><span>*</span><span>*</span><span>*</span><span>*</span><span>*</span><span>*</span><span>*</span><span>*</span><span>*</span><span>*</span><span>*</span>';
  return fireHtml;
}


