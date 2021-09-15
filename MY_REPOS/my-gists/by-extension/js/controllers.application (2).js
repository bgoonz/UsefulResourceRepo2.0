import Ember from 'ember';

export default Ember.Controller.extend({
  appName: 'Ember Twiddle',
  
  translation: `A long translation that contains <button>a button</button> that should be interactive`,
  
  actions: {
  	showThem() {
    	window.alert('Hellooooo');
    }
  }
});
