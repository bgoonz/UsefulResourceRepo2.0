(function() {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 3435:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Index; },
  "getStaticProps": function() { return /* binding */ getStaticProps; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: ./components/container.js
var container = __webpack_require__(1964);
// EXTERNAL MODULE: ./components/more-stories.js + 1 modules
var more_stories = __webpack_require__(164);
// EXTERNAL MODULE: ./components/avatar.js
var avatar = __webpack_require__(5213);
// EXTERNAL MODULE: ./components/date.js
var components_date = __webpack_require__(6074);
// EXTERNAL MODULE: ./components/cover-image.js
var cover_image = __webpack_require__(5674);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./components/hero-post.js






function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("section", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "mb-8 md:mb-16",
      children: /*#__PURE__*/jsx_runtime_.jsx(cover_image/* default */.Z, {
        slug: slug,
        imageObject: coverImage,
        title: title,
        url: coverImage
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
          className: "mb-4 text-4xl lg:text-6xl leading-tight",
          children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            as: `/posts/${slug}`,
            href: "/posts/[slug]",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              className: "hover:underline",
              children: title
            })
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "mb-4 md:mb-0 text-lg",
          children: /*#__PURE__*/jsx_runtime_.jsx(components_date/* default */.Z, {
            dateString: date
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
          className: "text-lg leading-relaxed mb-4",
          children: excerpt
        }), /*#__PURE__*/jsx_runtime_.jsx(avatar/* default */.Z, {
          name: author === null || author === void 0 ? void 0 : author.name,
          picture: author === null || author === void 0 ? void 0 : author.picture
        })]
      })]
    })]
  });
}
// EXTERNAL MODULE: ./lib/constants.js
var constants = __webpack_require__(8261);
;// CONCATENATED MODULE: ./components/intro.js



function Intro() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("section", {
    className: "flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12",
    children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
      className: "text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8",
      children: "Blog."
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("h4", {
      className: "text-center md:text-left text-lg mt-5 md:pl-8",
      children: ["Bryan Guner Content Posting Blog using", " ", /*#__PURE__*/jsx_runtime_.jsx("a", {
        href: "https://blog-w-comments.vercel.app/",
        className: "underline hover:text-success duration-200 transition-colors",
        children: "Next.js"
      }), " ", "and", " ", /*#__PURE__*/jsx_runtime_.jsx("a", {
        href: constants/* CMS_URL */.oc,
        className: "underline hover:text-success duration-200 transition-colors",
        children: "Sanity.io"
      }), "."]
    })]
  });
}
// EXTERNAL MODULE: ./components/layout.js + 3 modules
var layout = __webpack_require__(7952);
// EXTERNAL MODULE: ./lib/api.js
var api = __webpack_require__(6046);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: ./pages/index.js











function Index({
  allPosts,
  preview
}) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(layout/* default */.Z, {
      preview: preview,
      children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("title", {
          children: ["Bryan Guner Blog Using CMS: ", constants/* CMS_NAME */.yf]
        })
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(container/* default */.Z, {
        children: [/*#__PURE__*/jsx_runtime_.jsx(Intro, {}), heroPost && /*#__PURE__*/jsx_runtime_.jsx(HeroPost, {
          title: heroPost.title,
          coverImage: heroPost.coverImage,
          date: heroPost.date,
          author: heroPost.author,
          slug: heroPost.slug,
          excerpt: heroPost.excerpt
        }), morePosts.length > 0 && /*#__PURE__*/jsx_runtime_.jsx(more_stories/* default */.Z, {
          posts: morePosts
        })]
      })]
    })
  });
}
async function getStaticProps({
  preview = false
}) {
  const allPosts = await (0,api/* getAllPostsForHome */.DT)(preview);
  return {
    props: {
      allPosts,
      preview
    },
    revalidate: 1
  };
}

/***/ }),

/***/ 4058:
/***/ (function(module) {

"use strict";
module.exports = require("classnames");;

/***/ }),

/***/ 3879:
/***/ (function(module) {

"use strict";
module.exports = require("date-fns");;

/***/ }),

/***/ 7585:
/***/ (function(module) {

"use strict";
module.exports = require("next-sanity");;

/***/ }),

/***/ 8417:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ 2238:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ 701:
/***/ (function(module) {

"use strict";
module.exports = require("next/head");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [664,46,413], function() { return __webpack_exec__(3435); });
module.exports = __webpack_exports__;

})();