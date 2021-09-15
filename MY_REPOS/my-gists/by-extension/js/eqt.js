// Expected Queueing Time
// https://docs.google.com/document/d/1Vgu7-R84Ym3lbfTRi98vpdspRr1UwORB4UV-p9K1FF0/edit
// Initial impl by Nicolás Peña (npm), Tim Dresser (tdresser)

// Usage:
//     var eqt = EQT.begin();
//     // ...
//     const {expectedQueueingTime} = EQT.end();
class EQT {
  constructor() {
    this.longTaskObserver;
    this.beginTime;
    this.endTime;
    this.taskDurations = [];
  }

  static begin() {
    const eqt = new EQT();
    eqt.beginTime = performance.now();
    eqt.longTaskObserver = new PerformanceObserver(entryList => {
      for (const entry of entryList.getEntries()) eqt.taskDurations.push(entry.duration);
    });
    eqt.longTaskObserver.observe({entryTypes: ['longtask']});
    return eqt;
  }

  end() {
    this.longTaskObserver.disconnect();
    this.endTime = performance.now();
    const totalDuration = this.endTime - this.beginTime;
    const expectedQueueingTime = this.taskDurations.reduce(
      (sum, duration) => (sum += (duration ** 2) / (2 * totalDuration)),
      0
    );
    return {expectedQueueingTime};
  }
};
