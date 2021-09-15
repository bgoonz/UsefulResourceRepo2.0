# JavaScript Cheat Sheet

> JavaScript methods and functions, a guide to regular expressions and the XMLHttpRequest object.

### Regular Expres­sions Syntax

<table id="cheat_sheet_output_table"><tbody><tr><td><p>^</p></td><td><p>Start of string</p></td></tr><tr><td><p>$</p></td><td><p>End of string</p></td></tr><tr><td><p>.</p></td><td><p>Any single character</p></td></tr><tr><td><p>(a|b)</p></td><td><p>a or b</p></td></tr><tr><td><p>(...)</p></td><td><p>Group section</p></td></tr><tr><td><p>[abc]</p></td><td><p>In range (a, b or c)</p></td></tr><tr><td><p>[^abc]</p></td><td><p>Not in range</p></td></tr><tr><td><p>\s</p></td><td><p>White space</p></td></tr><tr><td><p>a?</p></td><td><p>Zero or one of a</p></td></tr><tr><td><p>a*</p></td><td><p>Zero or more of a</p></td></tr><tr><td><p>a*?</p></td><td><p>Zero or more, ungreedy</p></td></tr><tr><td><p>a+</p></td><td><p>One or more of a</p></td></tr><tr><td><p>a+?</p></td><td><p>One or more, ungreedy</p></td></tr><tr><td><p>a{3}</p></td><td><p>Exactly 3 of a</p></td></tr><tr><td><p>a{3,}</p></td><td><p>3 or more of a</p></td></tr><tr><td><p>a{,6}</p></td><td><p>Up to 6 of a</p></td></tr><tr><td><p>a{3,6}</p></td><td><p>3 to 6 of a</p></td></tr><tr><td><p>a{3,6}?</p></td><td><p>3 to 6 of a, ungreedy</p></td></tr><tr><td><p>\</p></td><td><p>Escape character</p></td></tr><tr><td><p>[:punct:]</p></td><td><p>Any punctu­ation symbol</p></td></tr><tr><td><p>[:space:]</p></td><td><p>Any space character</p></td></tr><tr><td><p>[:blank:]</p></td><td><p>Space or tab</p></td></tr></tbody></table>

### Pattern Modifiers

<table id="cheat_sheet_output_table"><tbody><tr><td><p>g</p></td><td><p>Global match</p></td></tr><tr><td><p>i&nbsp;*</p></td><td><p>Case-i­nse­nsitive</p></td></tr><tr><td><p>m&nbsp;*</p></td><td><p>Multiple lines</p></td></tr><tr><td><p>s&nbsp;*</p></td><td><p>Treat string as single line</p></td></tr><tr><td><p>x&nbsp;*</p></td><td><p>Allow comments and whitespace in pattern</p></td></tr><tr><td><p>e&nbsp;*</p></td><td><p>Evaluate replac­ement</p></td></tr><tr><td><p>U&nbsp;*</p></td><td><p>Ungreedy pattern</p></td></tr></tbody></table>

### JavaScript RegExp Object

<table id="cheat_sheet_output_table"><tbody><tr><td><p>compile()</p></td><td><p>lastParen</p></td></tr><tr><td><p>exec()</p></td><td><p>leftCO­ntext</p></td></tr><tr><td><p>global</p></td><td><p>multiline</p></td></tr><tr><td><p>ignoreCase</p></td><td><p>rightC­ontext</p></td></tr><tr><td><p>input</p></td><td><p>source</p></td></tr><tr><td><p>lastIndex</p></td><td><p>test()</p></td></tr><tr><td colspan="2"><p>lastMatch</p></td></tr></tbody></table>

 

### JavaScript Event Handlers

<table id="cheat_sheet_output_table"><tbody><tr><td><p>onabort</p></td><td><p>onmous­edown</p></td></tr><tr><td><p>onblur</p></td><td><p>onmous­emove</p></td></tr><tr><td><p>onchange</p></td><td><p>onmouseout</p></td></tr><tr><td><p>onclick</p></td><td><p>onmous­eover</p></td></tr><tr><td><p>ondblclick</p></td><td><p>onmouseup</p></td></tr><tr><td><p>ondragdrop</p></td><td><p>onmove</p></td></tr><tr><td><p>onerror</p></td><td><p>onreset</p></td></tr><tr><td><p>onfocus</p></td><td><p>onresize</p></td></tr><tr><td><p>onkeydown</p></td><td><p>onselect</p></td></tr><tr><td><p>onkeypress</p></td><td><p>onsubmit</p></td></tr><tr><td><p>onkeyup</p></td><td><p>onunload</p></td></tr><tr><td colspan="2"><p>onload</p></td></tr></tbody></table>

### JavaScript Arrays

<table id="cheat_sheet_output_table"><tbody><tr><td><p>concat()</p></td><td><p>slice()</p></td></tr><tr><td><p>join()</p></td><td><p>sort()</p></td></tr><tr><td><p>length</p></td><td><p>splice()</p></td></tr><tr><td><p>pop()</p></td><td><p>toSource()</p></td></tr><tr><td><p>push()</p></td><td><p>toString()</p></td></tr><tr><td><p>reverse()</p></td><td><p>unshift()</p></td></tr><tr><td><p>shift()</p></td><td><p>valueOf()</p></td></tr></tbody></table>

### JavaScript Numbers and Maths

<table id="cheat_sheet_output_table"><tbody><tr><td><p>abs()</p></td><td><p>min()</p></td></tr><tr><td><p>acos()</p></td><td><p>NEGATI­VE_­INF­INITY</p></td></tr><tr><td><p>asin()</p></td><td><p>PI</p></td></tr><tr><td><p>atan()</p></td><td><p>POSITI­VE_­INF­INITY</p></td></tr><tr><td><p>atan2()</p></td><td><p>pow()</p></td></tr><tr><td><p>ceil()</p></td><td><p>random()</p></td></tr><tr><td><p>cos()</p></td><td><p>round()</p></td></tr><tr><td><p>E</p></td><td><p>sin()</p></td></tr><tr><td><p>exp()</p></td><td><p>sqrt()</p></td></tr><tr><td><p>floor()</p></td><td><p>SQRT1_2</p></td></tr><tr><td><p>LN10</p></td><td><p>SQRT2</p></td></tr><tr><td><p>LN2</p></td><td><p>tan()</p></td></tr><tr><td><p>log()</p></td><td><p>toSource()</p></td></tr><tr><td><p>LOG10E</p></td><td><p>toExpo­nen­tial()</p></td></tr><tr><td><p>LOG2E</p></td><td><p>toFixed()</p></td></tr><tr><td><p>max()</p></td><td><p>toPrec­ision()</p></td></tr><tr><td><p>MAX_VALUE</p></td><td><p>toString()</p></td></tr><tr><td><p>MIN_VALUE</p></td><td><p>valueOf()</p></td></tr><tr><td colspan="2"><p>NaN</p></td></tr></tbody></table>

### JavaScript Booleans

<table id="cheat_sheet_output_table"><tbody><tr><td><p>toSource()</p></td><td><p>valueOf()</p></td></tr><tr><td colspan="2"><p>toString()</p></td></tr></tbody></table>

 

### JavaScript Dates

<table id="cheat_sheet_output_table"><tbody><tr><td><p>Date()</p></td><td><p>setMonth()</p></td></tr><tr><td><p>getDate()</p></td><td><p>setFul­lYear()</p></td></tr><tr><td><p>getDay()</p></td><td><p>setHours()</p></td></tr><tr><td><p>getMonth</p></td><td><p>setMin­utes()</p></td></tr><tr><td><p>getFul­lYear</p></td><td><p>setSec­onds()</p></td></tr><tr><td><p>getYear</p></td><td><p>setMil­lis­eco­nds()</p></td></tr><tr><td><p>getHours</p></td><td><p>setTime()</p></td></tr><tr><td><p>getMinutes</p></td><td><p>setUTC­Date()</p></td></tr><tr><td><p>getSeconds</p></td><td><p>setUTC­Day()</p></td></tr><tr><td><p>getMil­lis­econds</p></td><td><p>setUTC­Month()</p></td></tr><tr><td><p>getTime</p></td><td><p>setUTC­Ful­lYear()</p></td></tr><tr><td><p>getTim­ezo­neO­ffset()</p></td><td><p>setUTC­Hours()</p></td></tr><tr><td><p>getUTC­Date()</p></td><td><p>setUTC­Min­utes()</p></td></tr><tr><td><p>getUTC­Day()</p></td><td><p>setUTC­Sec­onds()</p></td></tr><tr><td><p>getUTC­Month()</p></td><td><p>setUTC­Mil­lis­eco­nds()</p></td></tr><tr><td><p>getUTC­Ful­lYear()</p></td><td><p>toSource()</p></td></tr><tr><td><p>getUTC­Hours()</p></td><td><p>toString()</p></td></tr><tr><td><p>getUTC­Min­utes()</p></td><td><p>toGMTS­tring()</p></td></tr><tr><td><p>getUTC­Sec­onds()</p></td><td><p>toUTCS­tring()</p></td></tr><tr><td><p>getUTC­Mil­lis­eco­nds()</p></td><td><p>toLoca­leS­tring()</p></td></tr><tr><td><p>parse()</p></td><td><p>UTC()</p></td></tr><tr><td><p>setDate()</p></td><td><p>valueOf()</p></td></tr></tbody></table>

### JavaScript Strings

<table id="cheat_sheet_output_table"><tbody><tr><td><p>charAt()</p></td><td><p>slice()</p></td></tr><tr><td><p>charCo­deAt()</p></td><td><p>split() x</p></td></tr><tr><td><p>concat()</p></td><td><p>substr()</p></td></tr><tr><td><p>fromCh­arC­ode()</p></td><td><p>substr­ing()</p></td></tr><tr><td><p>indexOf()</p></td><td><p>toLowe­rCase()</p></td></tr><tr><td><p>lastIn­dexOf()</p></td><td><p>toUppe­rCase()</p></td></tr><tr><td><p>length</p></td><td><p>toLoca­leL­owe­rCase()</p></td></tr><tr><td><p>locale­Com­pare()</p></td><td><p>toLoca­leU­ppe­rCase()</p></td></tr><tr><td><p>match() x</p></td><td><p>toSource()</p></td></tr><tr><td><p>replace() x</p></td><td><p>valueOf()</p></td></tr><tr><td colspan="2"><p>search() x</p></td></tr></tbody></table>

String object methods with an x support regular expres­sions.

### JavaScript Functions

<table id="cheat_sheet_output_table"><tbody><tr><td><p>decode­URI()</p></td><td><p>isNaN()</p></td></tr><tr><td><p>decode­URI­Com­pon­ent()</p></td><td><p>Number()</p></td></tr><tr><td><p>encode­URI()</p></td><td><p>parseF­loat()</p></td></tr><tr><td><p>encode­URI­Com­pon­ent()</p></td><td><p>parseInt()</p></td></tr><tr><td><p>escape()</p></td><td><p>String()</p></td></tr><tr><td><p>eval()</p></td><td><p>unescape()</p></td></tr><tr><td colspan="2"><p>isFinite()</p></td></tr></tbody></table>

