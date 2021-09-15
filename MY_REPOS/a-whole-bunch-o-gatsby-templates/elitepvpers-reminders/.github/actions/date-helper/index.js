const core = require('@actions/core');

function nWeekday(year, month, weekday = 2) {

  let day, counter, date;

  day = 1;
  counter = 0;
  date = new Date(year, month, day);
  while (date.getMonth() === month) {
      if (date.getDay() === weekday) { // Sun=0, Mon=1, Tue=2, etc.
          counter += 1;
      }
      day += 1;
      date = new Date(year, month, day);
  }
  return counter;
}

try {
  const date = new Date()
  const numberOfTuesdays = nWeekday(date.getFullYear(), date.getMonth())
  const nthTuesday = Math.ceil(date.getDate() / 7)

  core.debug(`Current date: ${date} - Number of Tuesdays: ${numberOfTuesdays} - nthTuesday: ${nthTuesday}`)

  let routine

  switch (nthTuesday) {
    case 1:
      routine = 1
      break;
    case 2:
      routine = 2
      break;
    case 3:
      routine = 3
      break;
    case 4:
      if (numberOfTuesdays === 5) {
        routine = 1
      } else {
        routine = 4
      }
      break;
    case 5:
      routine = 4
      break;
    default:
      routine = 1
      break;
  }

  core.debug(`Routine: ${routine}`)
  core.setOutput('routine', routine)
} catch (error) {
  core.setFailed(error.message)
}
