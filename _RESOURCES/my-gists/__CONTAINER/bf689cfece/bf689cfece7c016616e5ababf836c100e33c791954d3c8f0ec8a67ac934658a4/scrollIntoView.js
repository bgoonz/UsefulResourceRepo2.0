/*!
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 */
 
/**
 * Better Element.scrollIntoView() implementation
 * 
 * @see https://github.com/jquery/jquery-ui/blob/master/ui/menu.js#L409-L425
 * 
 * @param {jQuery} $item
 * @param {jQuery} $parent
 */
function scrollIntoView($item, $parent) {
    var borderTop = parseFloat($.css($parent[0], 'borderTopWidth')) || 0,
        paddingTop = parseFloat($.css($parent[0], 'paddingTop')) || 0,
        offset = $item.offset().top - $parent.offset().top - borderTop - paddingTop,
        scroll = $parent.scrollTop(),
        elementHeight = $parent.height(),
        itemHeight = $item.outerHeight();

        if (offset < 0) {
            $parent.scrollTop(scroll + offset);
        } else if (offset + itemHeight > elementHeight) {
            $parent.scrollTop(scroll + offset - elementHeight + itemHeight);
        }
};
