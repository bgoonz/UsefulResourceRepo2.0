import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  
  result: 0,
  
  click() {
    this.set('result', Math.random());
    const result = this.get('result');
    
  	this.get('onResult')(result);
  }  
});
