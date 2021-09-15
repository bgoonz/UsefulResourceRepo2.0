"use strict";

var typpy = require("typpy"),
    iterateObj = require("iterate-object"),
    Err = require("err"),
    objDef = require("obj-def"),
    emptyObj = require("is-empty-obj"),
    cheerio = require("cheerio");

/**
 * scrapeItCore
 * The core scraping functionality of `scrape-it`.
 *
 * Scrapes the data in the provided element.
 *
 * For the format of the selector, please refer to the [Selectors section of the Cheerio library](https://github.com/cheeriojs/cheerio#-selector-context-root-)
 *
 * @name scrapeIt.scrapeHTML
 * @function
 * @param {Cheerio|String} $ The input element or the HTML as a string.
 * @param {Object} opts An object containing the scraping information.
 *
 *   If you want to scrape a list, you have to use the `listItem` selector:
 *
 *    - `listItem` (String): The list item selector.
 *    - `data` (Object): The fields to include in the list objects:
 *       - `<fieldName>` (Object|String): The selector or an object containing:
 *          - `selector` (String): The selector.
 *          - `convert` (Function): An optional function to change the value.
 *          - `how` (Function|String): A function or function name to access the
 *            value.
 *          - `attr` (String): If provided, the value will be taken based on
 *            the attribute name.
 *          - `trim` (Boolean): If `false`, the value will *not* be trimmed
 *            (default: `true`).
 *          - `closest` (String): If provided, returns the first ancestor of
 *            the given element.
 *          - `eq` (Number): If provided, it will select the *nth* element.
 *          - `texteq` (Number): If provided, it will select the *nth* direct text child.
 *            Deep text child selection is not possible yet.
 *            Overwrites the `how` key.
 *          - `listItem` (Object): An object, keeping the recursive schema of
 *            the `listItem` object. This can be used to create nested lists.
 *
 *   **Example**:
 *   ```js
 *   {
 *      articles: {
 *          listItem: ".article"
 *        , data: {
 *              createdAt: {
 *                  selector: ".date"
 *                , convert: x => new Date(x)
 *              }
 *            , title: "a.article-title"
 *            , tags: {
 *                  listItem: ".tags > span"
 *              }
 *            , content: {
 *                  selector: ".article-content"
 *                , how: "html"
 *              }
 *            , traverseOtherNode: {
 *                  selector: ".upperNode"
 *                , closest: "div"
 *                , convert: x => x.length
 *              }
 *          }
 *      }
 *   }
 *   ```
 *
 *   If you want to collect specific data from the page, just use the same
 *   schema used for the `data` field.
 *
 *   **Example**:
 *   ```js
 *   {
 *        title: ".header h1"
 *      , desc: ".header h2"
 *      , avatar: {
 *            selector: ".header img"
 *          , attr: "src"
 *        }
 *   }
 *   ```
 *
 *
 * @name scrapeItCore
 * @function
 * @returns {Object} The scraped data.
 */
module.exports = function ($, opts) {

    if (typeof $ === "string") {
        $ = cheerio.load($);
    }

    // Normalizes the option
    var normalizeOpt = function normalizeOpt(v) {
        if (typpy(v, String)) {
            v = { selector: v };
        }
        objDef(v, "data", {});
        objDef(v, "how", "text", true);
        if (v.attr) {
            v.how = function ($elm) {
                return $elm.attr(v.attr);
            };
        }
        objDef(v, "trimValue", true);
        objDef(v, "closest", "");
        return v;
    };

    // Recursively handles the data
    var handleDataObj = function handleDataObj(data, $context) {
        var pageData = {};
        iterateObj(data, function (cOpt, optName) {

            cOpt = normalizeOpt(cOpt);
            cOpt.name = optName;

            var $cContext = $context === $ ? undefined : $context;
            if (!$cContext && !cOpt.selector && !cOpt.listItem) {
                throw new Err("There is no element selected for the '<option.name>' field. Please provide a selector, list item or use nested object structure.", {
                    option: cOpt,
                    code: "NO_ELEMENT_SELECTED"
                });
            }

            var $elm = cOpt.selector ? $(cOpt.selector, $cContext) : $cContext;

            // Handle lists
            if (cOpt.listItem) {
                var docs = pageData[cOpt.name] = [],
                    $items = $(cOpt.listItem, $cContext),
                    isEmpty = emptyObj(cOpt.data);

                if (isEmpty) {
                    cOpt.data.___raw = {};
                }

                for (var i = 0; i < $items.length; ++i) {
                    var cDoc = handleDataObj(cOpt.data, $items.eq(i));
                    var convert = cOpt.convert || function (x) {
                        return x;
                    };
                    docs.push(convert(cDoc.___raw || cDoc));
                }
            } else {

                if (typpy(cOpt.eq, Number)) {
                    $elm = $elm.eq(cOpt.eq);
                }

                if (typpy(cOpt.texteq, Number)) {
                    var children = $elm.contents(),
                        textCounter = 0,
                        found = false;

                    for (var _i = 0, child; child = children[_i]; _i++) {
                        if (child.type === "text") {
                            if (textCounter == cOpt.texteq) {
                                $elm = child;
                                found = true;
                                break;
                            }
                            textCounter++;
                        }
                    }

                    if (!found) {
                        $elm = cheerio.load("");
                    }

                    cOpt.how = function (elm) {
                        return elm.data;
                    };
                }

                // Handle closest
                if (cOpt.closest) {
                    $elm = $elm.closest(cOpt.closest);
                }

                if (!emptyObj(cOpt.data)) {
                    pageData[cOpt.name] = handleDataObj(cOpt.data, $elm);
                    return pageData;
                }

                var value = typpy(cOpt.how, Function) ? cOpt.how($elm) : $elm[cOpt.how]();
                value = value === undefined ? "" : value;
                if (cOpt.trimValue && typpy(value, String)) {
                    value = value.trim();
                }

                if (cOpt.convert) {
                    value = cOpt.convert(value, $elm);
                }

                pageData[cOpt.name] = value;
            }
        });
        return pageData;
    };

    return handleDataObj(opts);
};