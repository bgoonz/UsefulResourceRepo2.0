// Add any library to application
((library = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js') => {
	var element = document.createElement('script');
	element.src = library;
	element.type = 'text/javascript';
	document.head.appendChild(element);
})();

// Trace any properties
const traceProperty = (object, property) => {
  let value = object[property];
  Object.defineProperty(object, property, {
    get () {
      console.trace(`${property} requested`);
      return value;
    },
    set (newValue) {
      console.trace(`setting ${property} to `, newValue);
      value = newValue;
    },
  })
};