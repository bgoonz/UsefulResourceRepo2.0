'use strict';

import stringScore from './lib/score';
import cssSnippets from './lib/snippets';

const globalKeywords = ['auto', 'inherit', 'unset'];
const unitlessProperties = [
  'z-index',
  'line-height',
  'opacity',
  'font-weight',
  'zoom',
  'flex',
  'flex-grow',
  'flex-shrink',
];

const defaultOptions = {
  intUnit: 'px',
  floatUnit: 'em',
  unitAliases: {
    e: 'em',
    p: '%',
    x: 'ex',
    r: 'rem',
  },
  fuzzySearchMinScore: 0,
};

/**
 * For every node in given `tree`, finds matching snippet from `registry` and
 * updates node with snippet data.
 *
 * This resolver uses fuzzy matching for searching matched snippets and their
 * keyword values.
 */

export default function (tree, registry, options) {
  options = Object.assign({}, defaultOptions, options);
  options.unitAliases = Object.assign(
    {},
    defaultOptions.unitAliases,
    options && options.unitAliases
  );

  const snippets = convertToCSSSnippets(registry);

  tree.walk((node) => resolveNode(node, snippets, options));
  return tree;
}

export function convertToCSSSnippets(registry) {
  return cssSnippets(
    registry.all({
      type: 'string',
    })
  );
}

export { stringScore, cssSnippets };

/**
 * Resolves given node: finds matched CSS snippets using fuzzy match and resolves
 * keyword aliases from node value
 * @param  {Node} node
 * @param  {CSSSnippet[]} snippets
 * @param  {Object} options
 * @return {Node}
 */
function resolveNode(node, snippets, options) {
  const snippet = findBestMatch(
    node.name,
    snippets,
    'key',
    options.fuzzySearchMinScore
  );

  if (!snippet) {
    // Edge case: `!important` snippet
    return node.name === '!' ? setNodeAsText(node, '!important') : node;
  }

  return snippet.property
    ? resolveAsProperty(node, snippet, options)
    : resolveAsSnippet(node, snippet);
}

/**
 * Resolves given parsed abbreviation node as CSS property
 * @param {Node} node
 * @param {CSSSnippet} snippet
 * @param  {Object} formatOptions
 * @return {Node}
 */
function resolveAsProperty(node, snippet, formatOptions) {
  const abbr = node.name;
  node.name = snippet.property;

  if (node.value && typeof node.value === 'object') {
    // resolve keyword shortcuts
    const keywords = snippet.keywords();

    if (!node.value.size) {
      // no value defined, try to resolve unmatched part as a keyword alias
      let kw = findBestMatch(getUnmatchedPart(abbr, snippet.key), keywords);

      if (!kw) {
        // no matching value, try to get default one
        kw = snippet.defaultValue;
        if (kw && kw.indexOf('${') === -1) {
          // Quick and dirty test for existing field. If not, wrap
          // default value in a field
          kw = `\${1:${kw}}`;
        }
      }

      if (kw) {
        node.value.add(kw);
      }
    } else {
      // replace keyword aliases in current node value
      for (let i = 0, token; i < node.value.value.length; i++) {
        token = node.value.value[i];

        if (token === '!') {
          token = `${!i ? '${1} ' : ''}!important`;
        } else if (isKeyword(token)) {
          token =
            findBestMatch(token.value, keywords) ||
            findBestMatch(token.value, globalKeywords) ||
            token;
        } else if (isNumericValue(token)) {
          token = resolveNumericValue(node.name, token, formatOptions);
        }

        node.value.value[i] = token;
      }
    }
  }

  return node;
}

/**
 * Resolves given parsed abbreviation node as a snippet: a plain code chunk
 * @param {Node} node
 * @param {CSSSnippet} snippet
 * @return {Node}
 */
function resolveAsSnippet(node, snippet) {
  return setNodeAsText(node, snippet.value);
}

/**
 * Sets given parsed abbreviation node as a text snippet
 * @param {Node} node
 * @param {String} text
 * @return {Node}
 */
function setNodeAsText(node, text) {
  node.name = null;
  node.value = text;
  return node;
}

/**
 * Finds best matching item from `items` array
 * @param {String} abbr  Abbreviation to match
 * @param {Array}  items List of items for match
 * @param {String} [key] If `items` is a list of objects, use `key` as object
 * property to test against
 * @param {Number} fuzzySearchMinScore The minimum score the best matched item should have to be a valid match.
 * @return {*}
 */
function findBestMatch(abbr, items, key, fuzzySearchMinScore) {
  if (!abbr) {
    return null;
  }

  let matchedItem = null;
  let maxScore = 0;
  fuzzySearchMinScore = fuzzySearchMinScore || 0;

  for (let i = 0, item; i < items.length; i++) {
    item = items[i];
    const score = stringScore(abbr, getScoringPart(item, key));

    if (score === 1) {
      // direct hit, no need to look further
      return item;
    }

    if (score && score >= maxScore) {
      maxScore = score;
      matchedItem = item;
    }
  }

  return maxScore >= fuzzySearchMinScore ? matchedItem : null;
}

function getScoringPart(item, key) {
  const value = item && typeof item === 'object' ? item[key] : item;
  const m = (value || '').match(/^[\w-@]+/);
  return m ? m[0] : value;
}

/**
 * Returns a part of `abbr` that wasn’t directly matched agains `string`.
 * For example, if abbreviation `poas` is matched against `position`, the unmatched part will be `as`
 * since `a` wasn’t found in string stream
 * @param {String} abbr
 * @param {String} string
 * @return {String}
 */
function getUnmatchedPart(abbr, string) {
  for (let i = 0, lastPos = 0; i < abbr.length; i++) {
    lastPos = string.indexOf(abbr[i], lastPos);
    if (lastPos === -1) {
      return abbr.slice(i);
    }
    lastPos++;
  }

  return '';
}

/**
 * Check if given CSS value token is a keyword
 * @param {*} token
 * @return {Boolean}
 */
function isKeyword(token) {
  return tokenTypeOf(token, 'keyword');
}

/**
 * Check if given CSS value token is a numeric value
 * @param  {*}  token
 * @return {Boolean}
 */
function isNumericValue(token) {
  return tokenTypeOf(token, 'numeric');
}

function tokenTypeOf(token, type) {
  return token && typeof token === 'object' && token.type === type;
}

/**
 * Resolves numeric value for given CSS property
 * @param  {String} property    CSS property name
 * @param  {NumericValue} token CSS numeric value token
 * @param  {Object} formatOptions Formatting options for units
 * @return {NumericValue}
 */
function resolveNumericValue(property, token, formatOptions) {
  if (token.unit) {
    token.unit = formatOptions.unitAliases[token.unit] || token.unit;
  } else if (token.value !== 0 && unitlessProperties.indexOf(property) === -1) {
    // use `px` for integers, `em` for floats
    // NB: num|0 is a quick alternative to Math.round(0)
    token.unit =
      token.value === (token.value | 0)
        ? formatOptions.intUnit
        : formatOptions.floatUnit;
  }

  return token;
}
