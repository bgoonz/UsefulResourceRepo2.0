// countDownWhile(start, end)

function countDownWhile(start, end) {
  while (start >= end) {
    console.log(`While: ${start}`);
    start--;
  }
}

// countDownFor(start, end)
function countDownFor(start, end) {
  for (; start >= end; start--) {
    console.log(`For: ${start}`);
  }
}

countDownWhile(10, 0);
countDownFor(10, 0);
