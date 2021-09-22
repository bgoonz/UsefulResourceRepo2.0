const Gpio = require('onoff').Gpio;
const LED = new Gpio(4, 'out');
const WIRE = new Gpio(2, 'in');

const blinkLED = () => {
  !LED.readSync() ? LED.writeSync(1) : LED.writeSync(0)
}

const blinkInterval = setInterval(blinkLED, 250);

module.exports = {
  endBlink: () => {
    clearInterval(blinkInterval);
    LED.writeSync(0);
    LED.unexport();
  }
}



