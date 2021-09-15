function exponentialBackoff(i, dt) {
  const f = j => j >= 0 ? Math.exp(j/3)*dt : 0
  const ret = f(i)-f(i-1)
  if(ret < dt) {
    return dt
  } else {
    return ret
  }
}

function retryCheck(test, callback, failedCallback, max_retries, max_wait_time, i) {
  max_retries = typeof max_retries === 'undefined' ? 20 : max_retries;
  max_wait_time = typeof max_wait_time === 'undefined' ? 30000 : max_wait_time;
  i = typeof i === 'undefined' ? 0 : i;
  console.log("  retryCheck max_retries = %s, max_wait_time = %s, i = %s", max_retries, max_wait_time, i)
  if(max_retries <= 0 || max_wait_time <= 0) {
    console.log('retryCheck not found, doing nothing');
    failedCallback();
  } else {
    if(! test()) {
      const dt = exponentialBackoff(i, 25)
      setTimeout(() => retryCheck(test, callback, failedCallback, max_retries-1, max_wait_time-dt, i+1), dt)
    } else {
      callback();
    }
  }
}

retryCheck(() => Math.random() < 0.1, () => console.log('success'), () => console.log('failure'))