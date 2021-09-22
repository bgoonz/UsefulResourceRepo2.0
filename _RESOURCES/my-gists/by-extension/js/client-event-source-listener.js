if (!!window.EventSource) {
  const source = new EventSource('/api/bubble-sort');
  source.onmessage = (e) => {
    const data = JSON.parse(e.data);
    // data parsed
  };

  source.onopen = () => {
    console.log('connected!');
  };

  source.onerror = (e) => {
    if (e.target.readyState === EventSource.CLOSED) {
      console.log('closed');
    } else if (e.target.readyState === EventSource.CONNECTING) {
      console.log('trying to connect');
    }
  };
} else {
  console.log("Your browser doesn't support SSE");
}