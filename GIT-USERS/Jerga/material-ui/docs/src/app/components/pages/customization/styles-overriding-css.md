### Overriding with CSS Styles

The **second way** to override the style of the components is to use the _css-style_ approach.

Every component provides a `className` property. Those properties are always applied to the _root_ element.

Note that CSS properties defined inline are given priority over those defined
in a CSS class. You need to use `!important` to take precedence over the inline style.
