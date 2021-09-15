// Action signature should be descriptive so IDE could use it.
var actionSet = createActions({
  /**
   * @param {object} data
   * @param {string} data.name
   * @param {string} data.value
   */ 
  a: function actionMiddleware(data) {
    // Case validate data
    if (validate(data)) {
      throw new TypeError();
    }
    
    // Case forward action
    if (forwardAction) {
      this.cancelAction();
      actionSet.b({
        name: data.name
      });
      return;
    }
    
    if (wait) {
      this.cancelAction();
      delayPromise(1000).then(actionSet.a);
      return;
    }
    
    if (doNotDispatchAction) {
      this.cancelAction();
      return;
    }
  },
  /**
   * @param {object} data
   * @param {string} data.name
   */ 
  b: function (data) {}
});
