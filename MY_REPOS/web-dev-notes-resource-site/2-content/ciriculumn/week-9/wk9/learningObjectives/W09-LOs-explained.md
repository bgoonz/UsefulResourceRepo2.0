# CSS and AJAX (Week 9) - Learning Objectives

## Assessment Structure
- 2 hours, 10 minutes
- Mixture of multiple choice (30-35), free response (1-3) and VSCode (10-15) problems.
  - Free response just requires enough detail to answer the question, 1-3 sentences. As long as you are able to explain the concept and answer all aspects that it asks, you are good.
  - Coding problems come in two varieties:
    - Some will have specs to run (`npm test`) and check your work against (the AJAX project from Tuesday is good practice)
    - Some will have an HTML file with specific instructions for CSS rules to apply to achieve the desired styling, as well as some pictures to compare to (the practice assessment is a good example)
- Standard assessment procedures
  - You will be in an individual breakout room
  - Use a single monitor and share your screen
  - Only have open those resources needed to complete the assessment:
    - Zoom
    - VSCode
    - Browser with AAO and Progress Tracker (to ask questions)
    - Approved Resources for this assessment:
      - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS
      

## Basic CSS (W09D1) - Learning Objectives

### Basic CSS

1. How to import other CSS files into your CSS file
- We can use the `@import` tag in order to import other CSS files into our own.
- We often use this syntax when importing CSS hosted at some url like so:
```css
@import url('https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&display=swap');
```
- We can also use it for other CSS files that we have locally:
```css
@import 'other_styles.css';
```

2. Explain how CSS rules are applied based on their order and specificity
- `IDs` are unique, thus are considered highly specific since they always target one element. 
- Order of calculating the `score specificity` of selectors:
  1. who has the most `IDs`? If no one, then continue evaluating
  2. who has the most `classes`? If no one, then continue evaluating
  3. who has the most `tags`? If no one, then continue evaluating
  4. `last read` in the browser wins.
- Example:
```html
<div id="main-header" class="header large on special otherClass">Some content here<div>
```
```css
#main-header.large.on (1 ID, 2 classes, 0 tags) 
  VS.
div#main-header.header (1 ID, 1 class, 1 tag, last read(lower in the file))
```
  - The first selector is more specific and any conflicting styles would have these styles take precedence.
  - Both selectors have one ID, so we continue evaluating. Since the first selector has more classes, it is considered more specific.

3. Describe and apply element, id, and class selectors
- In order to target elements to apply styles in our css, we can utilize the element tag, id, or class selectors to make our selection as general or as specific as we'd like.
- Element: To select an element by tag name, we can simply use that name before our style:
```css
h1 {
  (styles for all h1 elements)
}
```
- ID: To select an element by ID, we use the `#` before the ID:
```css
#main-header{
  (styles to apply only to the element with the ID of "main-header")
}
```
- Class: To select elements that match a class, we use a `.` before the class name:
```css
.large {
  (styles to apply to all elements with the class "large")
}
```

4. Write "combinators" to create compound selector statements to target specific elements
- _Direct child selector_: the carrot, `>` means a **direct** child. It will not apply to deeply nested descendents, just those at the first nested level.
  - `ul > li`
- _All descendants/children selector_: denotes with a `space` in between selectors. Styles will apply to ALL nested tags that match.
  - `ul li`
- To compare these two categories, take a look at this sample HTML:
```html
<ul>
  <li>First</li>
  <li>Second</li>
  <div>
    <h3>Puppy!</h3>
    <img src="puppy.jpg" />
  </div>
  <div>
    <li>Nested li</li>
    <li>Other nested li</li>
  </div>
</ul>
```
  - Using `ul > li` will apply styles to the li with "First" and "Second", but not the nested lis.
  - Using `ul li` will apply styles to all four lis because it will target all descendents, not just direct children.
- _Multiple items selection_: `comma` deliniated selectors. We can apply the same styles to multiple elements by separating our selectors with commas. 
  - `body, div, p, span, ul, li`

5. Explain and apply pseudo selectors for specific elements in specific states (i.e. :hover)
- Pseudo selectors allow us to provide styling rules conditionally, based on the state of an element.
- The `:hover` selector, for example, will apply the styles if the user's cursor is on top of the element.
- In the below example, by hovering over the link, the color and font changes on the text and a border is applied. When the user moves their cursor off of the link, the `:hover` styles are no longer applied and it goes back to the styling associated with the standard `a` tag.
```html
<a class="btn" href="https://google.com">Link</a>
```
```css
a {
  color: #000fff;
  text-decoration: none;
}
a:hover {
  font-family: "Roboto Condensed", sans-serif;
  color: #4fc3f7;
  border: 2px solid #4fc3f7;
} 
```

6. Explain and apply the `::before` and `::after` pseudo elements, & Use the content CSS property to define the content of an element:
- The `::before` and `::after` pseudo elements can be used in CSS in order to add content at the very beginning or very end of an element.
- To specify what is going inside of this newly created element, we use the `content` property in the CSS.
- Example
```html
<h1>test</h1>
```
```css
h1::before {
    background-color: rebeccapurple;
    border-right: 1px solid yellow; 
    content: 'This is a...';
    margin-right: 4px;
    margin-left: 4px;
}   
h1::after {
    background-color: lightblue;
    border-right: 1px solid violet; 
    content: '...h1!';
    margin-right: 4px;
    margin-left: 4px;
}   
```
![pseudo-elements](pseudo-elements.png)

7. Style content on an HTML page targeting:
  - Type faces, sizes, styles, and weights
    - `font-size` : size of letters
    - `font-weight` : boldness of letters
    - `font-style` : italicization
    - `font-family` : actualy font
        - Some general font families: [ sans-serif, serif, cursive ]
  - Text transformation and alignment
    - `text-transform` : text casing
    - `text-decoration` : underlining
    - `text-align` : text justification (left, right, etc.)
  - Colors expresssed as names, hexadecimal RGB values, and decimal RGB values
    - The `color` css property changes the color of the _text_. 
    - The `background-color` css property does just what it says
    - We can use some keyword color names as values (blue, green, aqua, rebeccapurple, etc.)
    - We can also use hexadecimal values such as #FFFFFF (white). The hexadecimal values are the rgb values with each group of two digits representing the 0-255 range for red, green, and blue.
    - `rgb()` - takes in 3 integer values denoting levels of `red, green and blue`, with ranges of 0-255 each.
    - `rgba()` - Same as above but with additional argument (the 'a', or 'alpha' value) which represents how **transparent** the color will be (on a scale of 0-1, with 0 being completely transparent and 1 being opaque).
  - Everything about borders
    - The `border` property takes in three arguments:
      1. thickness: typically in pixels, how wide should the border be?
      2. line style: possible values include 'solid', 'dotted', 'dashed', etc.
      3. line color: what color the line should be, using any of the notations above
  - Shadows
    - Can be of two types, text or box.
    - The first two required arguments are the horizontal and vertical offset
    - An optional 'blur' argument to specify a radius for fading the shadow
    - An optional 'spread' argument (for box shadows) for adjusting the size of the shadow (positive makes the shadow larger, negative makes it smaller)
    - An optional 'color' argument for changing the color
    - An optional flag to make the shadow 'inset' instead of the default outset
  - Opacity (transparency)
    - Changes the overall transparency of an element.
    - Just like with rgba when defining a color, opacity takes an alpha value from 0 to 1, with 0 being completely transparent (not visible) and 1 (the default) being opaque.
  - Covering an element with a background image
    - We can use the `background-image` property, setting it's value to the url of a desired image.
    - We can point the url to an absolute path, such as an outside resource, or a relative location within our application
    - The `background-size` property will help us tell the browser how we want to scale/crop the image to fill the space.
      - `contain` will scale the image to the bounds of the container, potentially leaving some whitespace either vertically or horizontally so that the full image is seen
      - `cover` will scale the image but will completely fill the container, potentially cropping some portion of the image so that there is no whitespace
      - We can also specify percentages or units such as pixels that we would like the image to take up.
      - MDN has great examples of all of these options: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size 
    ```css
        #picture-here {
          <!-- absolute path -->
          background-image: url(https://appacademy.github.io/styleguide/assets/logo/logo-emblem-black-1000.png); 
          <!-- relative path -->
          background-image: url(ajax.svg); 
          background-size: cover;
          height: 100px;
          width: 100px;
        }
    ```

8. Explain the generic font names "serif", "sans-serif", and "monospace" and correctly identify examples of each
- These generic font names tell the browser and OS what generic category of font should be use without being as specific as one particular font. This can help to ensure that the basic style of the site is maintained across different platforms if we don't need to specify an exact font that we want to use.
- "Serif" fonts have the widenings at the end of the letters. A classic example is Times New Roman.
- "Sans-serif" fonts do not have serifs. The ends of the letters end with straight edges. This could be desirable in computing because small details like serifs could potentially be lost or display differently based on different screen sizes. Helvetica is an example of a sans-serif font.
- "Monospace" fonts have all characters taking up the exact same width. Sometimes referred to as typewriter fonts because each character stamped with a typewriter had to line up exactly (since the page moved a set amount for each character). Courier is an example of a monospaced font.

9. Explain why using Web fonts helps with consistent experience across viewing devices:
- Using web fonts is great because it allows for `browser compatibility`.
- By downloading the font from an external resource and importing it into the styling, you are not relying on the browser to either have or not have the font available.

10. Explain absolute and relative length units in CSS
- There are a very large number of units that we can use in CSS.
- Absolute units are measurements independent of the user's window, other elements, etc. They are based off of real-world measurements.
- Relative units are based off of other objects, like the window (`vh` or `vw`), line height (`lh`), root element (`rem`), etc.
- An exhaustive list: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units
- Some commonly used examples:
  - Relative :
    - `rem` - relative to root 
    - `em` - relative to parent
    - `vh` - viewport height
    - `vw` - viewport width
  - Absolute Measure : 
    - `px` pixel
    - `pt` point
    - `cm` centimeter

11. Demonstrate how to link a stylesheet into an HTML page
- We can link to outside resources such as CSS stylesheets using the HTML `link` tag.
- The `link` element has to have the `rel` (relationship) and `href` (hypertext reference) attributes configured to indicate that this resource is a stylesheet and where it is coming from (a relative or absolute reference):
```html
<link rel="stylesheet" href="file.css">
```

12. Be able to calculate the specificity of CSS rules and determine which rule override the properties of another
- See LO #2: Explain how CSS rules are applied based on their order and specificity
- In general, specificity is determined by comparing the number of selectors associated with each category left to right until no tie exists: IDs, classes, element tags
- If there is still a tie, the last defined rule (lower in the file) is considered the most specific
- Specificity is used to determine which styles take presedence if there is a conflict. If there is no conflict, both styles are applied.

13. Use the `content` CSS property to define the content of an element
- See LO #6: Explain and apply the `::before` and `::after` pseudo elements, & Use the content CSS property to define the content of an element
- `content` lets us inject content into those pseudo elements, but if we wanted to adjust the content of an element that already exists within the HTML, we would want to use JavaScript, such as by changing its innerHTML property.


## AJAX (Asynchronous JavaScript and XML) (W09D2) - Learning Objectives

### AJAX
1. Explain what an AJAX request is
- An AJAX request is an asynchronous request that we send in order to get a response in the form of data from a server.
- Typically this response is in JSON, but previously was common to work with XML.
- The main difference between this approach and a traditional request is that the server is no longer responsible for updating the HTML and sending the whole page back; it sends the new/requested data and the JavaScript on the front end can change the HTML displayed directly within the browser.
- We shift a lot of the processing on to the individual user.
![ajax](ajax.svg)

2. Identifying the advantages of using an AJAX request.
- We don't have to refresh the entire HTML page.
- It's a smaller amount of data that needs to be transferred.
- We can push the processing and recreation of HTML elements on to the user.
  - This may not have been desired at the beginning of the internet with slow personal machines, but not even smaller connected machines like tablets and phones have plenty of processing power to do these tasks and alleviates the load on the servers.

3. Identify what the acronym AJAX means and how it relates to modern Web programming
- Asynchronous JavaScript and XML
- Asynchronous: We don't lock up the page when we are waiting on a response. We are still able to interact and the response's data will be handled whenever it returns.
- JavaScript: The engine behind AJAX. We use JavaScript to make the request to the server, then we also use it to process the response and make any updates to the DOM that are needed based on this new data.
- XML: The original format of the data that was sent back on the response. Nowadays we will almost always be using JSON as the format.

4. Describe the different steps in an AJAX request/response cycle
- An event listener is set up to wait for an specific action that will trigger a request to our server. Clicking on a button or submitting a form would be a popular example.
- When the event is triggered, we use JavaScript to formulate an appropriate request to a server. In our project we used `fetch` in order to send a request to a specific route on our server, along with an options object to indicate the methods, headers, etc., that differ from the default values, a body with necessary data, etc..
- The request is sent asynchronously to the server. The user is still able to interact with our application since the request is not blocking the call stack.
- The server receives the request and does whatever it needs to do on its end to create/read/update/destroy data related to the request. After it performs the requested action, it creates a response and sends it back to the client. This is almost always going to be in a JSON format.
- The client receives the response and is able to parse the data and do any updates that it needs to do to the DOM. In our project, we used a `.then` on our call to `fetch`, which allowed us to then convert the response's JSON into a usable POJO when the response came back. The data inside of this object is then accessible and used to manipulate the DOM.

5. Fully use the fetch API to make dynamic Web pages without refreshing the page
- Look over the AJAX project Catstagram. Be comfortable with creating many different request types, such as `GET`, `PATCH`, `POST`, and `DELETE`.
- Be comfortable with using both the `.then` promise chains that we used in the project as well as how we could convert them into an async/await format:
```javascript
// Using Promise chains for .then and .catch
document.querySelector('#downvote').addEventListener('click', () => {
	fetch('http://localhost:3000/kitten/downvote', { method: 'PATCH' })
		.then(handleResponse) // handleResponse defined below for reference
    .then(updateImageScore) // updateImageScore defined below for reference
    .catch(handleError); // handleError defined below for reference
});

// Using async/await
document.querySelector('#downvote').addEventListener('click', async () => { // Notice the async keyword on the callback definition!
// We create a standard try/catch block
  try {
    // We await each asynchronous function call
    const resJSON = await fetch('http://localhost:3000/kitten/downvote', { method: 'PATCH' });
    const resObj = await handleResponse(resJSON);
    // updateImageScore is synchronous, so we do not have to await its response
    updateImageScore(resObj);
  } catch (e) {
    handleError(e)
  }
});

// Functions used above, for reference
const handleResponse = (response) => {
	stopLoader();
	clearError();

	if (!response.ok) {
		throw response;
	}
	return response.json();
};

const handleError = (error) => {
	if (error.json) {
		error.json().then((errorJSON) => {
			document.querySelector('.error').innerHTML = `Error occured: ${errorJSON.message}`;
		});
	} else {
		console.error(error);
		alert('Something went wrong. Please try again!');
	}
};

const updateImageScore = (data) => {
	const { score } = data;
	document.querySelector('.score').innerHTML = score;
};
```


## Media Queries, Positioning, and Layouts (W09D3) - Learning Objectives

### Media Queries
1. Identify the different types of media that a media query can target: 
- `all` - we are not distinguishing between the following (this is default)
- `print` - i.e. anytime a document is set to print mode, with intention of printing. 
- `screen` - phones, tablets, computers, smart devices, etc. 
- `speech` - for use with speech synthesizers

2. Explain how the media features (and prefixed subfeatures) of "aspect ratio", "height", "orientation", and "width" are applied
- We can specify the media features that we want to trigger our styles being applied. They can be thought of as conditionals that, if true, will apply additional styles (or overwrite previously applied styles).
- To indicate a media feature that we would like to specify, we place it in parentheses after our `@media` keyword. We can combine multiple features and even include the media type by using the `and` operator:
```css
html {
  background-color: white;
  color: #333333;
}

@media screen and (min-width: 301px) and (max-width: 600px) {
  html {
    background-color: #333333;
    color: white;
  }
}
```
- The different features that we can target are:
  - `aspect-ratio`: The ratio of width-to-height of the user's viewport (for example, a window that is 1600 pixels wide and 800 pixels tall will have an aspect ratio of 2). We will most often use this with a `min-` or `max-` prefix instead of setting one specific value.
  - `height`: the height of the viewport, typically in pixels. Most often used with a `min-` or `max-` prefix to set a bounds instead of a specific value.
  - `width`: the width of the viewport, typically in pixels. Most often used with a `min-` or `max-` prefix to set a bounds instead of a specific value.
  - `orientation`: An indicator of whether our viewport is wider than it is tall (`landscape`) or taller than it is wide (`portrait`). Since we are just using these exact values, we do not use any prefixes.

3. Use media queries to change the styles of content in an HTML page to achieve a desired effect
- Be able to set conditions for bounds on your device that will trigger a different style. For example, if our viewport shrinks below a certain height we could remove a menu by setting its `display` property to `none`, or if we have a color background we can change it to white for `print` media, etc.
- A code example: Given the following CSS rule, write a media query that would change the `product-index` container so the items appear in a verticle fashion for a viewport width less than or equal to 300px:
```css
.product-index {
  display: flex;
}

.product-index__item {
  background-color: blue;
}
```
- The media query we could write to accomplish this:
```css
@media screen and (max-width: 300px) {
  .product-index {
    flex-direction: column;
  }
}
``` 


### Layout and the Box Model
1. Describe how:
- padding and margins work in the box model
  - I like to think of padding, borders, margins as a puffy jacket. The content is just me, but when I put on a puffy jacket, I'm adding some space between me and my borders (the outside of my jacket). If the outside of my jacket is the border, the margin is then how far away do I want to be from anything else. Margin is my social distancing :)
  - `padding` - the innermost part of the box model -- creating space around an element's content before its border.
  - `margin` - the space between one html element and another html element
  - One thing to note is that margins will collapse. If I'm comfortable with being 10 pixels away from my neighbor but my neighbor wants to be 15 pixels away from everyone, overall we are going to be 15 pixels away. I don't need an extra 10 pixels for myself, 15 pixels satisfy both of our requests.
  - The `box-sizing` property will also affect how these values are calculated.
    - With a value of `content-box`, setting a width or height on an element is only considering the content itself. Any padding and border that we add on is going to be in addition to this specification.
      - A 100px wide div with padding of 10px and a 5px border means the content will still be 100px wide, 10px padding on each side, and a 5px border on each side, totaling 130px before our margin starts. Increasing padding or border will expand outward instead of eating into the content.
    - With a value of `border-box`, setting a width or height on an element is going to consider the content, padding, and border as part of that width or height calculation.
      - A 100px wide div with padding of 10px and a 5px border means the content will end up being 70px wide, 10px padding on each side, and a 5px border on each side. Increasing padding or border will eat into the content instead of expanding outward.

- the browser positions a fixed positioned element
  - `position: fixed` - always relative to the document, not any particular parent, and are unaffected by scrolling. It will always show up at that exact location on the screen, no matter where the user is scrolled to.

- the browser positions a relatively positioned element
  - `position: relative` - positioned relative to where it would normally be located; i.e. the element is still in the flow of the document, but now left/right/top/bottom/z-index will affect how it is actually displayed.

- the browser positions absolutely positioned elements with and without a relatively positioned parent element
  - `position: absolute` - the element is removed from the flow of the document and other elements will behave as if it’s not even there. If its positioning is affected by a left/right/top/bottom property, it will use its closest `position: relative` parent as the starting point. If no parent is positioned relatively it will use the document in general as its reference.

- the browser positions a static positioned element
  - `position: static` - this is the default positioning, so you won't see it written out that often. Elements are in their normal page flow, one after the other. The positioning properties left/right/top/bottom/z-index do not affect statically positioned elements. If we want to use these properties we would need to change the positioning to one of the previously mentioned values.

2. Identify elements rendered with specific padding and margin settings
- Recognize that padding is the area between content and borders.
  - When `box-sizing` is set to `content-box`, this will extend our overall width/height. When it is set to `border-box`, this will eat into our content area.
  - Stylings such as `background-color` that affect our content area will generally also apply to our padding.
- Recognize that margin is the area between elements' borders.
  - Margins collapse, meaning if two neighboring elements each have a margin set, the smallest value that will satisfy both constraints will be used.
  - If Element A has a margin of 10px and Element B, its neighbor, has a margin of 15px, the space between these elements will be 15px. The 15px space accomodates both the 10px requirement from Element A and the 15px requirement from Element B.

3. Apply padding and margins to HTML elements to achieve a desired layout
- When adding padding and margins we can specify each edge of our box separately, or use some shorthand.
- To define them separately, we can use the `-left`, `-right`, `-top`, and `-bottom` suffixes on `padding` and `margin` to specify that specific side.
  - `margin-right: 5px` will add a 5px margin ONLY to the right side.
- To define them together we can use some shorthand:
  - Providing one value will assign that amount to all four sides
    - `margin: 5px` will add a 5px margin on all sides
  - Providing two values will assign the first value as the top and bottom and the second value as the right and left
    - `margin: 5px 10px` will add a 5px top and bottom margin and a 10px right and left margin.
  - Providing four values will assign them in clockwise order, starting from the top
    - `margin: 5px 10px 15px 10px` will add a 5px top margin, 10px right margin, 15px bottom margin, and 10px left margin.

4. Apply positioning settings to HTML elements (fixed, relative, and absolute) to achieve a desired layout. (Sticky positioning is not supported on some older but still used browsers, so it will not be assessed, but can useful.)
- This is an application of LO #1 from this category.
- Some example knowledge:
  - If we want an element to always show up in the top right corner of the page, know that we should use `position: fixed` with a specific value for `top` and `right` properties to set it in that corner.
  - If we want an element to be 20 pixels to the right of its parent, outside the normal page flow, we should make the parent `position: relative` and have the child `position: absolute` with a `right: 20px` property in order to set it positioned to that relative parent.

5. Identify which HTML elements have a default "inline" display value
- Common elements that default to `inline` include `span`, `a`, `input`, `button`, `img` tags, etc.
- An exhaustive list: https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
- `inline` display values will result in the element being displayed next to each other in a single line until it fills up the available space.
- The `width` and `height` properties do not affect how the element is displayed.
- `padding`, `margin`, and `border` can still be used, but will not affect other `inline` elements. For example, setting a margin of 100px will still have the other inline elements display directly next to it, but the block element that comes later on in the document on its own line will still be pushed down.

6. Identify which HTML elements have a default "block" display value
- Common elements that default to `block` include `div`, `p`, headers like `h1`, `ul`, `li` tags, etc.
- An exhaustive list: https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
- `block` display values will result in elements being displayed on a new line.
- The `width` and `height` properties are respected.

7. Describe and use z-index positioning of elements
- The `z-index` can be useful in setting an element on different layers of the page, its third dimension. These different layers are purely visual, they do not affect the layout and positioning of other elements.
- A positive `z-index` means we want that element on top. We can think of it as the line coming straight out of the screen. We want that element closer to the user.
- A negative `z-index` means we want the element behind other elements, pushed away from the user.


### Flexible Box Layout
1. Explain how flexible box layout lays out elements
- Flex box allows for easy responsive design by displaying items in a flexible container, where a `container`'s height/width will adjust to the viewport.
- Flex box is an easy way for us to tell our browser that we want all of the elements in our container laid out in a row or column, and how those elements should be positioned, grow/shrink, and wrap across that axis.

2. Use the `flex` property to specify grow, shrink, and basis values.
- The `flex` property is a combination of three different properties: `flex-grow`, `flex-shrink`, and `flex-basis`.
- `flex-grow`:
  - Determines how much of the extra space within the container the element will take up.
  - The default value is 0, meaning it will not grow at all.
  - Setting a `flex-grow` property to different values for elements within the same container sets up a ratio for how much of the extra space should be alotted to the different elements to grow into.
- `flex-shrink` :
  - Similar to `flex-grow`, this property determines what factor the element should shrink by when the container is not large enough to fit all elements.
  - The default value is 1. A value of 0 means it will not shrink at all.
  - If all elements have the same `flex-shrink` value, they will all shrink at the same rate. Larger values will shrink at a faster rate than smaller values.
- `flex-basis` :
  - The initial main size of the element.
  - The default value is 'auto', meaning it will use the width of the element.
  - We can specify specific absolute lengths, like 20px, percentages, like 25%, or use automatic sizing keywords like `content` to assign the size required to fit all of the element's content.

3. Use the `flex-direction` property to direct the layout of the content
- We can specify if we would like our container to display our content in a row or a column using `flex-direction`.
- The default for flex box containers is `row`, but we can use `column` to display our content vertically.

4. Use the `flex-wrap` property to affect the wrap of content layout within an element using flexible box layout
- Instead of trying to fit all items on one line by shrinking them, we can also wrap elements to a new line by setting `flex-wrap: wrap`.
- `nowrap` is the default value
- `wrap-reverse` will stack our rows or columns in the reverse order (our second row will display on top or our second column will display to the left, for example)

5. Use `align-self`, `justify-content`, and `align-items` to change the way that children elements are laid out in a flexible box layout
- These properties affect how an individual element is laid out across the main axis of a flex-box layout.
- `justify-content` is always concerned with positioning ALONG the main axis.
  - If we are displaying our content in a row, `justify-content` will determine how the elements are positioned horizontally along that row.
  - If we are displaying our content in a column, `justify-content` will determine how the elements are positioned vertically along that column.
- `align-items` is always concerned with positioning ACROSS the main axis.
  - If we are displaying our content in a row, `align-items` will determine how the elements are positioned vertically across that row.
  - If we are displaying our content in a column, `align-items` will determine how the elements are positioned horizontally across that column.
- `align-self` allows us to selectively tell an element that we want it to align itself differently compared to the standard `align-items` rule.
  - If we have all of our items centered vertically along our row but we want one item to be at the top of the container instead, we can apply an `align-self: flex-start`, for example, which would keep all of the other elements in line and just bump this element up to the top of the row.

6. Use the `order` property to change the order in which elements will appear in a flexible box layout
- `order` can be used to rearrange individual elements
- The default value is 0. Higher numbers will push the element to be later in the ordering.
- If we want a specific element to be at the very beginning, we could assign it an `order: -1`. If all of the other elements are left to default (0), it will be the lowest value and be shown first.
- This only affects the visual display of the elements, not how the HTML is constructed, tab orders, speech, etc.

### Grid Layout
1. Explain how grid layout lays out elements
- The grid layout style divides your document into smaller sections that can be organized and customised via the css grid layout properties. The number of rows and columns, and their respective dimensions can be set. 

2. Use the `grid-template-columns`, `grid-template-rows`, and `grid-template` properties to specify the layout of the grid using relative and absolute measures
- `grid-template-columns` allows us to take in any number of arguments to signify the dimensions for the corresponding column. Passing two values means we are creating two columns for our grid, for example.
- `grid-template-rows` allows us to take in any number of arguments to signify the dimensions for the corresponding row. Passing two values means we are creating two rows for our grid, for example.
- `grid-template` is shorthand to allow us to define rows and columns at once. We do so by providing our row values, then a `/` then the column values, such as `grid-template: 100px 1fr / 50px 200px 50px`. We can also provide additional arguments to for area names, with many additional optional syntaxes. Personally I think these can get confusing to parse, but if you're curious, take a look at the MDN docs: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template

3. Use `grid-template-areas` to label areas of a grid and `grid-area` to assign an element to the area
- Areas are a great way for us to lump multiple sections of our grid together into one space.
- With our column and row dimensions defined, we can assign section names using the `grid-template-areas` property on the container.
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header"
    "main . sidebar"
    "footer footer footer";
}
```
- Using the same name assigns the rows and columns to be grouped into one section.
- Now that those areas are defined, we can use the `grid-area` property on an individual element to add it to that section of the grid:
```css
.item-1 {
  grid-area: header;
}
.item-2 {
  grid-area: main;
}
.item-3 {
  grid-area: sidebar;
}
.item-4 {
  grid-area: footer;
}
```

4. Use `column-gap`, `row-gap`, and `gap` (previously `grid-column-gap`, `grid-row-gap`, and `grid-gap`) to set the "gutter" areas between elements in a grid layout
- The `gap` properties can be used to define space that we want to maintain between our rows and columns.
- By default, our rows and columns are all directly next to each other, but giving these properties values creates a "gutter" between the sections.

5. Use `grid-column-start`/`grid-column-end` and `grid-row-start`/`grid-row-end` to create spans across multiple columns and rows with positive integers, negative integers, and in conjunction with the "span" operator
- When we are assigning an item to be placed in the grid, we can indicate in our CSS what row/column we want the element to stretch across.
- The `-start` values are the grid lines that we want our element to begin at. The left-most and top-most grid lines (outside borders) begin at 1 and count upwards as we move right and down the grid.
- Similarly, the `-end` values are where the element will stretch to.
- Negative numbers can also be used to indicate counting from bottom/right instead of top/left.
- Instead of providing a specific row/column number, we can use `span` to indicate we want to continue across a certain number of rows/columns. For example, `grid-column-end: span 2` will go across two columns instead of specifying a specific column number.

6. Explain and use the shorthand versions of `grid-column` and `grid-row` to define how an element will span a grid layout
- `grid-column` is a combination of `grid-column-start and grid-column-end`, allowing us to provide both values in one line, separated by `/`.
  - `grid-column: 1 / 3;` will assign this element to stretch from column 1 to 3 (the first two columns of the graph.)
- `grid-row` is a combination of `grid-row-start and grid-row-end`, allowing us to provide both values in one line, separated by `/`.
  - `grid-row: 4 / span 4;` will assign this element to stretch from row 4, spanning the next four rows.

7. Use the `order` property to change the default order in which items are laid out
- Similar to the order used in flex box, we can assign a specific order for elements when they are assigned to a row or column section.
- Look at LO #6 of Flex Box for more specifics, but generally a higher order value will come later in the visual placement.

8. Explain and use the "fr" unit of measure
- `fr` indicates the fraction of available space
- It can be very useful when combined with other measurements. For example, if we have three rows and want our first row to be 50px high, then split the remaining area between two parts to the second row and one part to the third row, we can say `grid-template-rows: 50px 2fr 1fr`. This will always take 50px for the first row, then divide up the rest based on the fractions.

9. Use `justify-items`, `align-items`, `justify-content` and `align-content` to layout items in each grid area
- `justify-items` and `align-items` will position items within the respective section of the grid.
  - `justify-items` will position the items horizontally within the box
  - `align-items` will position the items vertically within the box
  - We can think of these similarly to justifying and aligning with a flex-box that has the default `row` direction.
- `justify-content` and `align-content` will position the grid itself within the container, assuming it does not fill the full container.
  - This can come up when we define specific absolute values for columns/rows that don't add up to the whole container size.


## Interactivity and BEM (W09D4) - Learning Objectives

### Interactivity
1. Use the "hover" pseudo-class to be able to make changes to elements when the device pointer is over an element
- The browser will automatically add the `:hover` pseudo-class to an element when the user's pointer is on it.
- This can be useful to provide visual clues that the element is interactable like a button or link or even for providing functionality, like changing the display value of a child from `none` to `block` to make a drop-down menu appear.

2. Describe and use the `transition` property to show animated changes due to class and pseudo-class CSS rule application
- `transition-property`
  - The name or names of properties to which transitions should apply
  - Default value: `all`, meaning every difference in style will be affected by these transition rules.
- `transition-duration`
  - The duration over which transition occurs
  - Default value: 0s, meanine the transition will occur instantly. This may be useful if you only want a delay and then the changes to all happen at once.
- `transition-timing-function`
  - Determines how the intermediate values for a transition are calculated.
  - Default value: `ease`, which shows a slow transition at the beginning, speeds up in the middle, then slows down at the end.
  - Other popular values are `linear`, `ease-in`, and `ease-out`. These can become more complicated if you use a custom function with `cubic-bezier` or `steps`.
- `transition-delay`
  - How long to wait between when the property's assigned value has changed (either through CSS like a :hover or JavaScript) and when the transition begins
- `transition` is shorthand for `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`
  - If any of the properties are omitted, their default values will be used.
  - We can define transitions on multiple properties by separating their definitions with commas. In the following example we define a transition on background-color with a duration of 2s and a transition on color with a duration of 1s and delay of 1s:
  ```css
  .nav__button--active:hover {
    transition: background-color 2s, color 1s 1s;
  }
  ```

3. Describe and use the `overflow`, `overflow-x`, and `overflow-y` properties to effect clipping and scrolling on elements
- The `overflow` property will account for any extended content, horizontal or vertical. If we'd like to distinguish, we can use `overflow-x` and `overflow-y`.
- `overflow: auto` - hides any content that exceeds the container size, adding a scroll bar if needed to show that content.  
- `overflow: scroll` - always adds a scroll bar, even if  it would not be needed with the content.
- `overflow: hidden` - clips any content that exceeds the container size. No scroll is added, so the user will not to see anything that extends beyond the container.
- `overflow: visible` - the content is allowed to extend beyond the container without clipping or scrolling, potentially spilling into other elements.


### Block, Element, Modifier (BEM)
1. Describe what Block means in BEM.
- "A standalone entity that is meaningful on its own."
- Typically this means a group of elements that form some sort of unit/feature together, but could also be applied to a single element if it has enough significance and stand-alone meaning.

2. Describe what Element means in BEM.
- "Part of a block and has no standalone meaning."
- If a component wouldn't mean anything or its meaning would be lost/changed if it was moved to another location, it generally means that it is an element of some larger block.

3. Describe what Modifier means in BEM.
- "A flag on blocks or elements. Use them to change appearance, behavior or state."
- These classes are typically added in our JavaScript in order to modify the standard styling.
- If the user clicks on a "Dark Mode" button and we want to change the background color of an element, we could have a `.block__elem--dark-mode` class that is added in response to that click that alters the color.
- If we are only allowed to have eight elements in our bag, we can have a `.bag__add-btn--disabled` class that gets added to our button on the eighth addition that sets our cursor property to `not-allowed`, helping the user understand they should not click the button any more.

4. Identify CSS class names that follow the BEM principle.
- In general, each section of the BEM naming convention should only use letters, numbers, dashes, or underscores.
- For longer/more complicated names, we typically replace spaces that we would use in English with a dash.
- We use two underscores to separate the block from the element name and two dashes to separate the modifier from the block or element that it is modifying.
```css
/* Here we have a block called "nav" that we have associated with a "dark" modifier */
/* Use modifier class name as selector. */
.nav--dark {
}

/* We are selecting the nested "list-container" element when our "nav" block has the "dark" modifier */
/* Alter elements based on a block-level modifier. */
.nav--dark .nav__list-container {
}

/* We are selecting the "list-container" element of the "nav" block when this element has been given the "shadow" modifier */
/* Element modifier: */
.nav__list-container--shadow {
}
```
- It's important to note that we are creating whole new classes when we are talking about these modifiers. `.nav__list-container--shadow` is all one class that we created in order to make styles specifically for adding a shadow on the list container.
