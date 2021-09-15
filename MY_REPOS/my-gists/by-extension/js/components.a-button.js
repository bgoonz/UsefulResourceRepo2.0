import Ember from 'ember';

var htmlEscapes = [  
  {
    char: /&/gim,
  	repl: '&amp;',
  },
  {
    char: /</gim,
    repl: '&lt;',
  },
  {
    char: />/gim,
    repl: '&gt;',
  },
  {
    char: /"/gim,
   	repl: '&quot;',
  },
  { 
    char: /'/gim,
    repl: '&#39;'
  }
];

function escapeHTML(str) {
	return htmlEscapes.reduce((acc, { char, repl }) => 
    acc.replace(char, repl), str);
}

export default Ember.Component.extend({
  translation: '',
  
  text: Ember.computed('translation', function () {
    let translation = this.get('translation');
    
    // Escape HTML (if you have lodash, use _.escape)
    translation = escapeHTML(translation);
    
    //  Unescape only the button
    translation = translation
      .replace(/&lt;(\/?)button&gt;/gi, '<$1button>');
      
    return Ember.String.htmlSafe(translation);
  }),
  
  onButtonClick: () => {},
  
  click(event) {
		if (event.target.tagName.toLowerCase() === 'button') {
    	console.log('Clicked button, do something');
      
      this.get('onButtonClick')();
    } else {
    	console.log('clicked elsewhere, ignore');
    }
  }
});
