exports.id = 46;
exports.ids = [46];
exports.modules = {

/***/ 6046:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iy": function() { return /* binding */ getPreviewPostBySlug; },
/* harmony export */   "h9": function() { return /* binding */ getAllPostsWithSlug; },
/* harmony export */   "DT": function() { return /* binding */ getAllPostsForHome; },
/* harmony export */   "ds": function() { return /* binding */ getPostAndMorePosts; }
/* harmony export */ });
/* harmony import */ var _sanity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6023);


const getUniquePosts = posts => {
  const slugs = new Set();
  return posts.filter(post => {
    if (slugs.has(post.slug)) {
      return false;
    } else {
      slugs.add(post.slug);
      return true;
    }
  });
};

const postFields = `
  _id,
  name,
  title,
  'date': publishedAt,
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url},
`;

const getClient = preview => preview ? _sanity__WEBPACK_IMPORTED_MODULE_0__/* .previewClient */ .S9 : _sanity__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP;

async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(`*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
    }`, {
    slug
  });
  return data[0];
}
async function getAllPostsWithSlug() {
  const data = await _sanity__WEBPACK_IMPORTED_MODULE_0__/* .default.fetch */ .ZP.fetch(`*[_type == "post"]{ 'slug': slug.current }`);
  return data;
}
async function getAllPostsForHome(preview) {
  const results = await getClient(preview).fetch(`*[_type == "post"] | order(publishedAt desc){
      ${postFields}
    }`);
  return getUniquePosts(results);
}
async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview);
  const [post, morePosts] = await Promise.all([curClient.fetch(`*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        body,
        'comments': *[
                      _type == "comment" && 
                      post._ref == ^ ._id ] {
          _id, 
          name, 
          email, 
          comment, 
          _createdAt
        }
      }`, {
    slug
  }).then(res => res === null || res === void 0 ? void 0 : res[0]), curClient.fetch(`*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
        body,
      }[0...2]`, {
    slug
  })]);
  return {
    post,
    morePosts: getUniquePosts(morePosts)
  };
}

/***/ }),

/***/ 6023:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t3": function() { return /* binding */ imageBuilder; },
/* harmony export */   "S9": function() { return /* binding */ previewClient; }
/* harmony export */ });
/* unused harmony exports usePreviewSubscription, client, getClient */
/* harmony import */ var next_sanity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7585);
/* harmony import */ var next_sanity__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_sanity__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const config = {
  dataset: "production",
  projectId: "ke5fae8i",
  useCdn: true
};
const imageBuilder = source => (0,next_sanity__WEBPACK_IMPORTED_MODULE_0__.createImageUrlBuilder)(config).image(source);
const usePreviewSubscription = (0,next_sanity__WEBPACK_IMPORTED_MODULE_0__.createPreviewSubscriptionHook)(config);
const client = (0,next_sanity__WEBPACK_IMPORTED_MODULE_0__.createClient)(config);
const previewClient = (0,next_sanity__WEBPACK_IMPORTED_MODULE_0__.createClient)(_objectSpread(_objectSpread({}, config), {}, {
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
}));
const getClient = usePreview => usePreview ? previewClient : client;
/* harmony default export */ __webpack_exports__["ZP"] = (client);

/***/ })

};
;