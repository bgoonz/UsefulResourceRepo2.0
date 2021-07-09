/*
func: An anonymous function. 
*/
function ( param ) {}
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqAfter: Insert content, specified by the parameter, after each element in the set of matched elements. 
*/
$( selector ).after( content );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqAjax: Perform an asynchronous HTTP( Ajax ) request. 
*/
$.ajax( {
  type: "method",
  url: "url",
  data: "data",
  dataType: "dataType",
  success: function ( response ) {}
} );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqAjaxAspNetWebService: Perform an asynchronous HTTP( Ajax ) request to a ASP.NET web service. 
*/
$.ajax( {
  type: "POST",
  contentType: "application/json; charset=utf-8",
  dataType: "dataType",
  url: "url",
  data: "data",
  success: function ( response ) {}
} );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqAppend: Insert content, specified by the parameter, to the end of each element in the set of matched elements. 
*/
$( selector ).append( content );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqAppendTo: Insert every element in the set of matched elements to the end of the target. 
*/
$( content ).appendTo( selector );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqAttrGet: Get the value of an attribute for the first element in the set of matched elements. 
*/
$( selector ).attr( attributeName );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqAttrRemove: Remove an attribute from each element in the set of matched elements. 
*/
$( selector ).removeAttr( attributeName );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqAttrSet: Set one or more attributes for the set of matched elements. 
*/
$( selector ).attr( attributeName, value );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqAttrSetFn: Set one or more attributes for the set of matched elements. 
*/
$( selector ).attr( attributeName, function ( index, attr ) {} );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqAttrSetObj: Set one or more attributes for the set of matched elements. 
*/
$( selector ).attr( {
  name: value
} );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqBefore: Insert content, specified by the parameter, before each element in the set of matched elements. 
*/
$( selector ).before( content );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqBind: Attach a handler to an event for the elements. 
*/
$( selector ).bind( eventType, function ( e ) {} );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqBindWithData: Attach a handler to an event for the elements. 
*/
$( selector ).bind( eventType, eventData, function ( e ) {} );
/*
 */
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqBlur: Bind an event handler to the "blur" event, or trigger that event on an element. 
*/
$( selector ).blur( function ( e ) {
  e.preventDefault();
} );
/*
 */
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqChange: Bind an event handler to the "change" event, or trigger that event on an element. 
*/
$( selector ).change( function ( e ) {
  e.preventDefault();
} );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqClassAdd: Adds the specified class( es ) to each of the set of matched elements. 
*/
$( selector ).addClass( className );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
/*
jqClassRemove: Remove a single class, multiple classes, or all classes from each element in the set of matched elements. 
*/
$( selector ).removeClass( className );
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).toggleClass( className );
/*
jqClassToggle: Add or remove one or more classes from each element in the set of matched elements, depending on either the class 's presence. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).toggleClass( className,
  switch );
/*
jqClassToggleSwitch: Add or remove one or more classes from each element in the set of matched elements, depending on either the class 's presence or the value of the switch argument. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).click( function ( e ) {
  e.preventDefault();
} );
/*
jqClick: Bind an event handler to the "click" event, or trigger that event on an element. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).clone();
/*
jqClone: Create a deep copy of the set of matched elements. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).clone( true );
/*
jqCloneWithEvents: Create a deep copy of the set of matched elements. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).css( propertyName );
/*
jqCssGet: Get the computed style properties for the first element in the set of matched elements. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).css( propertyName, value );
/*
jqCssSet: Set one or more CSS properties for the set of matched elements. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).css( {
  propertyName: value
} );
/*
jqCssSetObj: Set one or more CSS properties for the set of matched elements. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).data( key );
/*
jqDataGet: Return the value at the named data store for the first element in the jQuery collection, as set by data( name, value ) or by an HTML5 data - * attribute. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).removeData( element );
/*
jqDataRemove: Remove a previously - stored piece of data. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).data( key, value );
/*
jqDataSet: Store arbitrary data associated with the matched elements. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).data( {
  key: value
} );
/*
jqDataSetObj: Store arbitrary data associated with the matched elements. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).die( eventType );
/*
jqDie: Remove event handlers previously attached using.live() from the elements. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).die();
/*
jqDieAll: Remove event handlers previously attached using.live() from the elements. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( selector ).die( eventType, handler );
/*
jqDieFn: Remove event handlers previously attached using.live() from the elements. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( document ).ready( function () {} );
/*
jqDocReady: Function to execute when the DOM is fully loaded. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$( function () {} );
/*
jqDocReadyShort: Function to execute when the DOM is fully loaded. 
*/
//-------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
$.each( collection, function ( indexInArray, valueOfElement ) {} );
/*
jqEach: A generic iterator function, which can be used to seamlessly iterate over both objects and arrays.Arrays and array - like objects with a length property( such as afunction 's arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties. jqEachElement Iterate over a jQuery object, executing afunctionfor each matched element. jqEmpty Remove all child nodes of the set of matched elements from the DOM. jqFadeIn Display the matched elements by fading them to opaque. jqFadeInFull Display the matched elements by fading them to opaque. jqFadeOut Hide the matched elements by fading them to transparent. jqFadeOutFull Hide the matched elements by fading them to transparent. jqFadeTo Adjust the opacity of the matched elements. jqFadeToFull Adjust the opacity of the matched elements. jqFind Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element. jqFocus Bind an event handler to the "focus" event, or trigger that event on an element. jqGet Load data from the server using a HTTP GET request. jqGetJson Load JSON - encoded data from the server using a GET HTTP request. jqGetScript Load a  file from the server using a GET HTTP request, then execute it. jqHasClass Determine whether any of the matched elements are assigned the given class. jqHeightGet Get the current computed heightfor the first element in the set of matched elements. jqHeightSet Set the CSS height of every matched element. jqHide Hide the matched elements. jqHideFull Hide the matched elements. jqHover Bind two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements. jqHtmlGet Get the HTML contents of the first element in the set of matched elements. jqHtmlSet Set the HTML contents of each element in the set of matched elements. jqInnerHeight Get the current computed heightfor the first element in the set of matched elements, including padding but not border. jqInnerWidth Get the current computed inner widthfor the first element in the set of matched elements, including padding but not border. jqInsertAfter Insert every element in the set of matched elements after the target. jqInsertBefore Insert every element in the set of matched elements before the target. jqKeyDown Bind an event handler to the "keydown" event, or trigger that event on an element. jqKeyPress Bind an event handler to the "keypress" event, or trigger that event on an element. jqKeyUp Bind an event handler to the "keyup" event, or trigger that event on an element. jqLoadGet Load data from the server and place the returned HTML into the matched element. jqLoadPost Load data from the server and place the returned HTML into the matched element. jqMap Translate all items in an array or object to new array of items. jqMouseDown Bind an event handler to the "mousedown" event, or trigger that event on an element. jqMouseEnter Bind an event handler to be fired when the mouse enters an element, or trigger that handler on an element. jqMouseLeave Bind an event handler to be fired when the mouse leaves an element, or trigger that handler on an element. jqMouseMove Bind an event handler to the "mousemove" event, or trigger that event on an element. jqMouseOut Bind an event handler to the "mouseout" event, or trigger that event on an element. jqMouseOver Bind an event handler to the "mouseover" event, or trigger that event on an element. jqMouseUp Bind an event handler to the "mouseup" event, or trigger that event on an element. jqNamespace A namespace template.ref: http: //enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad--habits-part-1/ jqOff Detach an event handler from one or more events on the selected elements. jqOffSel Detach an event handler from one or more events on the document with the specified selector. jqOffsetGet Get the current coordinates of the first element, or set the coordinates of every element, in the set of matched elements, relative to the document. jqOffsetParent Get the closest ancestor element that is positioned. jqOn Attach an event handlerfunctionfor one or more events to the selected elements. jqOne Attach a handler to an eventfor the elements.The handler is executed at most once per element per event type. jqOneWithData Attach a handler to an eventfor the elements.The handler is executed at most once per element per event type. jqOnSel Attach an event handlerfunctionfor one or more events to the document filtered by the selector. jqOuterHeight Get the current computed heightfor the first element in the set of matched elements, including padding, border, and optionally margin.Returns a number( without "px" ) representation of the value or nullif called on an empty set of elements. jqOuterWidth Get the current computed widthfor the first element in the set of matched elements, including padding and border. jqPlugin Plugin template. jqPosition Get the current coordinates of the first element in the set of matched elements, relative to the offset parent. jqPost Load data from the server using a HTTP POST request. jqPrepend Insert content, specified by the parameter, to the beginning of each element in the set of matched elements. jqPrependTo Insert every element in the set of matched elements to the beginning of the target. jqRemove Remove the set of matched elements from the DOM. jqRemoveExp Remove the set of matched elements from the DOM. jqReplaceAll Replace each target element with the set of matched elements. jqReplaceWith Replace each element in the set of matched elements with the provided new content andreturn the set of elements that was removed. jqResize Bind an event handler to the "resize" event, or trigger that event on an element. jqScroll Bind an event handler to the "scroll" event, or trigger that event on an element. jqScrollLeftGet Get the current horizontal position of the scroll barfor the first element in the set of matched elements. jqScrollLeftSet Set the current horizontal position of the scroll barfor each of the set of matched elements. jqScrollTopGet Get the current vertical position of the scroll barfor the first element in the set of matched elements or set the vertical position of the scroll barfor every matched element. jqScrollTopSet Set the current vertical position of the scroll barfor each of the set of matched elements. jqSelect Bind an event handler to the "select" event, or trigger that event on an element. jqSelectTrigger Bind an event handler to the "select" event, or trigger that event on an element. jqShow Display the matched elements. jqShowFull Display the matched elements. jqSlideDown Display the matched elements with a sliding motion. jqSlideDownFull Display the matched elements with a sliding motion. jqSlideToggle Display or hide the matched elements with a sliding motion. jqSlideToggleFull Display or hide the matched elements with a sliding motion. jqSlideUp Display the matched elements with a sliding motion. jqSlideUpFull Display the matched elements with a sliding motion. jqSubmit Bind an event handler to the "submit" event, or trigger that event on an element. jqSubmitTrigger Bind an event handler to the "submit" event, or trigger that event on an element. jqTextGet Get the combined text contents of each element in the set of matched elements, including their descendants. jqTextSet Set the content of each element in the set of matched elements to the specified text. jqToggle Display or hide the matched elements. jqToggleFull Display or hide the matched elements. jqToggleSwitch Display or hide the matched elements. jqTrigger Execute all handlers and behaviors attached to the matched elementsfor the given event type. jqTriggerHandler Execute all handlers attached to an elementfor an event. jqTriggerHandlerWithData Execute all handlers attached to an elementfor an event. jqTriggerWithData Execute all handlers and behaviors attached to the matched elementsfor the given event type. jqUnbind Remove a previously - attached event handler from the elements. jqUnbindAll Remove a previously - attached event handler from the elements. jqUnload Bind an event handler to the "unload" event. jqValGet Get the current value of the first element in the set of matched elements. jqValSet Set the value of each element in the set of matched elements. jqWidthGet Get the current computed widthfor the first element in the set of matched elements. jqWidthSet Set the CSS width of each element in the set of matched elements. jqWrap Wrap an HTML structure around each element in the set of matched elements. jqWrapAll Wrap an HTML structure around all elements in the set of matched elements. jqWrapInner Wrap an HTML structure around the content of each element in the set of matched elements.
*/
