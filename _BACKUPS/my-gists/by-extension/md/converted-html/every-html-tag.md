This is heading 1
=================

This is heading 2
-----------------

### This is heading 3

#### This is heading 4

##### This is heading 5

###### This is heading 6

**- Bold text **- Important text** *- Italic text* *- Emphasized text* - Marked text <span class="small">- Small text</span> <s>- Deleted text</s> <span class="underline">- Inserted text</span> <sub>-\ Subscript\ text</sub> <sup>-\ Superscript\ text</sup>**

The easiest thing you can do in HTML is write a sentence. To do this you need to know one of the very basic and easy to use tags - the

  
“Use q for short quotes”

> The blockquote tag should be used when we want to talk about some long quote that is quoted from another source.

> your very long and interesting probably quote.

![What your image is about](https://i.redd.it/tfugj4n3l6ez.png) [MDN](https://developer.mozilla.org/en-US/)

This is done with the target attribute. The target attribute specifies where to open the linked document and it can have one of the following values:

1.  list item 1
2.  list item 2
3.  list item N

-   list item 1
-   list item 2
-   list item N

<table><thead><tr class="header"><th>table row 1 first square</th><th>table row 1 second square</th></tr></thead><tbody><tr class="odd"><td>table row 2 first square</td><td>table row 2 second square</td></tr><tr class="even"><td>table row 2 first square</td><td>table row 2 second square</td></tr></tbody></table>

The paragraph is a block-level element.

A block-level element always starts on a new line and takes up the full width available (stretches out to the left and right as far as it can).

Examples of block-level elements: div h1 - h6 p form

This span is an inline element

This An inline element occupies only the space bounded by the tags that define the inline element. Generally, inline elements may contain only data and other inline elements. The following example demonstrates the inline element's influence: is an inline element

Lisbon
------

Div Element The div element belongs to the block-level group, often used as a container for other HTML elements. The div element has no required attributes, but both style and class are common. When used together with CSS, the div element can be used to style blocks of content, as we can see in the example below:

My super <span style="color: red">Span Element The span element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang. The span is very much like a div element, but div is a block-level element whereas a span is an inline element.</span> Heading
================================================================================================================================================================================================================================================================================================================================================================================================================================================

Classes Using the html class attribute makes it possible to define equal styles, for elements with the same class name.

`         `

      
        div.cities {
          background-color: black;
          color: white;
          margin: 20px 0 20px 0;
          padding: 20px;
        }
      

London
------

London is the capital of England.

Kingston
--------

Kingston is the capital city of Jamaica.

Tokyo
-----

Tokyo is the capital of Japan, the center of the Greater Tokyo Area, and the most populous metropolitan area in the world.

My Ultra <span class="note">Important</span> Heading
====================================================

This is some random but <span class="note">important</span> text.

The button tag defines a clickable button.

These buttons work and behave in exactly the same way as our counterparts above. In addition to submitting the form, you can make them disabled, add an accesskey or even specify a tabindex.

tag is that you can put useful HTML elements inside them, like images:

    <button type="submit"><img src="" alt="" /> Submit</button>

"Buttons created with the **BUTTON** element function just like buttons created with the **INPUT** element,  
but they offer richer rendering possibilities: the **BUTTON** tag may have content.  
For example:  
a **BUTTON** element that contains an image functions like and may resemble an **INPUT** element whose type is set to “image",  
but the **BUTTON** element type allows content." W3

    <div class="buttons">
        <button type="submit" class="positive">
            <img src="/images/icons/tick.png" alt=""/>
            Save
        </button>    <a href="/password/reset/">
            <img src="/images/icons/textfield_key.png" alt=""/>
            Change Password
        </a>    <a href="#" class="negative">
            <img src="/images/icons/cross.png" alt=""/>
            Cancel
        </a>
    </div>

*Tip*: Always specify the type attribute for a button element.  
Different browsers use different default types for the button element.

Styles and Sizes (With Bootstrap)
---------------------------------

Great Work!  
As we know, this is where we would start using only CSS to style and size our buttons..? No!  
We are introducing you to Bootstrap (the most popular HTML, CSS, and JavaScript framework for developing responsive,  
mobile-first web sites) because it´s an easier way to get the job done!

### Do you prefer larger or smaller buttons?

Add .btn-lg (large), .btn-md(medium), .btn-sm(small), or .btn-xs(extra-small) for additional sizes.

    <button type="button" class="btn btn-primary btn-lg">Large</button>
    <button type="button" class="btn btn-primary btn-md">Medium</button>
    <button type="button" class="btn btn-primary btn-sm">Small</button>
    <button type="button" class="btn btn-primary btn-xs">XSmall</button>

Create block level buttons — those that span the full width of a parent—by adding *.btn-block*:

    <button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>

After you decide the size of your buttons it´s time to style them!  
Bootstrap provides different styles of buttons:

-   Basic
-   Default
-   Primary
-   Success
-   Info
-   Warning
-   Danger
-   Link

<!-- -->

    <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
    <button type="button" class="btn btn-primary">Primary</button>
    <!-- Secondary, outline button -->
    <button type="button" class="btn btn-secondary">Secondary</button>
    <!-- Indicates a successful or positive action -->
    <button type="button" class="btn btn-success">Success</button>
    <!-- Contextual button for informational alert messages -->
    <button type="button" class="btn btn-info">Info</button>
    <!-- Indicates caution should be taken with this action -->
    <button type="button" class="btn btn-warning">Warning</button>
    <!-- Indicates a dangerous or potentially negative action -->
    <button type="button" class="btn btn-danger">Danger</button>
    <!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
    <button type="button" class="btn btn-link">Link</button>

### Outline buttons

Replace the default modifier classes with the *.btn-outline-* ones to remove all background images and colors on any button.

    <button type="button" class="btn btn-outline-primary">Primary</button>
    <button type="button" class="btn btn-outline-secondary">Secondary</button>
    <button type="button" class="btn btn-outline-success">Success</button>
    <button type="button" class="btn btn-outline-info">Info</button>
    <button type="button" class="btn btn-outline-warning">Warning</button>
    <button type="button" class="btn btn-outline-danger">Danger</button>

### Great resources to learn HTML5

<https://developer.mozilla.org/en-US/docs/Web/HTML/Element>
