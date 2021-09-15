import Ember from 'ember';

export default Ember.Controller.extend({
  appName: 'Ember Twiddle',
  
  value: null,
  
  actions: {
  	showResult(result) {
      this.set('value', result);
    },
  },
});
