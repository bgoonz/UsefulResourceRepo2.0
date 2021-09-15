import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['bgColor', 'textColor', 'value'],
  bgColor: 'tomato',
  textColor: 'white',
  value: 2
});
