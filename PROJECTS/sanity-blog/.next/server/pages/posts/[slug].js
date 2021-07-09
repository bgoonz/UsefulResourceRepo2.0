(function() {
var exports = {};
exports.id = 922;
exports.ids = [922];
exports.modules = {

/***/ 3268:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Post; },
  "getStaticPaths": function() { return /* binding */ getStaticPaths; },
  "getStaticProps": function() { return /* binding */ getStaticProps; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: external "next/router"
var router_namespaceObject = require("next/router");;
;// CONCATENATED MODULE: external "next/error"
var error_namespaceObject = require("next/error");;
var error_default = /*#__PURE__*/__webpack_require__.n(error_namespaceObject);
// EXTERNAL MODULE: ./components/container.js
var container = __webpack_require__(1964);
// EXTERNAL MODULE: ./components/markdown-styles.module.css
var markdown_styles_module = __webpack_require__(7957);
var markdown_styles_module_default = /*#__PURE__*/__webpack_require__.n(markdown_styles_module);
;// CONCATENATED MODULE: external "@sanity/block-content-to-react"
var block_content_to_react_namespaceObject = require("@sanity/block-content-to-react");;
var block_content_to_react_default = /*#__PURE__*/__webpack_require__.n(block_content_to_react_namespaceObject);
;// CONCATENATED MODULE: ./components/post-body.js



function PostBody({
  content
}) {
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "max-w-2xl mx-auto",
    children: /*#__PURE__*/jsx_runtime_.jsx((block_content_to_react_default()), {
      blocks: content,
      projectId: "ke5fae8i",
      dataset: "production",
      className: (markdown_styles_module_default()).markdown
    })
  });
}
// EXTERNAL MODULE: ./components/more-stories.js + 1 modules
var more_stories = __webpack_require__(164);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./components/header.js



function Header() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("h2", {
      className: "text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8",
      children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        href: "/",
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          className: "hover:underline",
          children: "Blog"
        })
      }), "."]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: "github-corner",
        href: "https://github.com/bgoonz/blog-w-comments",
        "aria-label": "View source on Github",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("svg", {
          "aria-hidden": "true",
          width: 80,
          height: 80,
          viewBox: "0 0 250 250",
          style: {
            zIndex: 100000,
            fill: '#194ccdaf',
            color: '#fff',
            position: 'fixed',
            top: '20px',
            border: 0,
            left: '20px',
            transform: 'scale(-1.5, 1.5)'
          },
          children: [/*#__PURE__*/jsx_runtime_.jsx("path", {
            d: "M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"
          }), /*#__PURE__*/jsx_runtime_.jsx("path", {
            className: "octo-arm",
            d: "M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",
            fill: "currentColor",
            style: {
              transformOrigin: '130px 106px'
            }
          }), /*#__PURE__*/jsx_runtime_.jsx("path", {
            className: "octo-body",
            d: "M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",
            fill: "currentColor"
          })]
        })
      })
    })]
  });
}
// EXTERNAL MODULE: ./components/avatar.js
var avatar = __webpack_require__(5213);
// EXTERNAL MODULE: ./components/date.js
var components_date = __webpack_require__(6074);
// EXTERNAL MODULE: ./components/cover-image.js
var cover_image = __webpack_require__(5674);
;// CONCATENATED MODULE: ./components/post-title.js

function PostTitle({
  children
}) {
  return /*#__PURE__*/jsx_runtime_.jsx("h1", {
    className: "text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left",
    children: children
  });
}
// EXTERNAL MODULE: ./lib/sanity.js
var sanity = __webpack_require__(6023);
;// CONCATENATED MODULE: ./components/post-header.js








function PostHeader({
  title,
  coverImage,
  date,
  author
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(PostTitle, {
      children: title
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "hidden md:block md:mb-12",
      children: /*#__PURE__*/jsx_runtime_.jsx(avatar/* default */.Z, {
        name: author === null || author === void 0 ? void 0 : author.name,
        picture: author === null || author === void 0 ? void 0 : author.picture
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "mb-8 md:mb-16 -mx-5 sm:mx-0",
      children: /*#__PURE__*/jsx_runtime_.jsx(cover_image/* default */.Z, {
        title: title,
        imageObject: coverImage,
        url: coverImage
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "max-w-2xl mx-auto",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "block md:hidden mb-6",
        children: /*#__PURE__*/jsx_runtime_.jsx(avatar/* default */.Z, {
          name: author === null || author === void 0 ? void 0 : author.name,
          picture: author === null || author === void 0 ? void 0 : author.picture
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "mb-6 text-lg",
        children: /*#__PURE__*/jsx_runtime_.jsx(components_date/* default */.Z, {
          dateString: date
        })
      })]
    })]
  });
}
;// CONCATENATED MODULE: ./components/comments.js




function Comments({
  comments = []
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
      className: "mt-10 mb-4 text-4xl lg:text-6xl leading-tight",
      children: "Comments:"
    }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
      children: comments === null || comments === void 0 ? void 0 : comments.map(({
        _id,
        _createdAt,
        name,
        email,
        comment
      }) => /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
        className: "mb-5",
        children: [/*#__PURE__*/jsx_runtime_.jsx("hr", {
          className: "mb-5"
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("h4", {
          className: "mb-2 leading-tight",
          children: [/*#__PURE__*/jsx_runtime_.jsx("a", {
            href: `mailto:${email}`,
            children: name
          }), " (", /*#__PURE__*/jsx_runtime_.jsx(components_date/* default */.Z, {
            dateString: _createdAt
          }), ")"]
        }), /*#__PURE__*/jsx_runtime_.jsx("p", {
          children: comment
        }), /*#__PURE__*/jsx_runtime_.jsx("hr", {
          className: "mt-5 mb-5"
        })]
      }, _id))
    })]
  });
}
;// CONCATENATED MODULE: ./components/section-separator.js

function SectionSeparator() {
  return /*#__PURE__*/jsx_runtime_.jsx("hr", {
    className: "border-accent-2 mt-28 mb-24"
  });
}
// EXTERNAL MODULE: ./components/layout.js + 3 modules
var layout = __webpack_require__(7952);
// EXTERNAL MODULE: ./lib/api.js
var api = __webpack_require__(6046);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./lib/constants.js
var constants = __webpack_require__(8261);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
;// CONCATENATED MODULE: external "react-hook-form"
var external_react_hook_form_namespaceObject = require("react-hook-form");;
;// CONCATENATED MODULE: ./components/form.js




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function Form({
  _id
}) {
  const {
    0: formData,
    1: setFormData
  } = (0,external_react_.useState)();
  const {
    0: isSubmitting,
    1: setIsSubmitting
  } = (0,external_react_.useState)(false);
  const {
    0: hasSubmitted,
    1: setHasSubmitted
  } = (0,external_react_.useState)(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = (0,external_react_hook_form_namespaceObject.useForm)();

  const onSubmit = async data => {
    setIsSubmitting(true);
    let response;
    setFormData(data);

    try {
      response = await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
        type: "application/json"
      });
      setIsSubmitting(false);
      setHasSubmitted(true);
    } catch (err) {
      setFormData(err);
    }
  };

  if (isSubmitting) {
    return /*#__PURE__*/jsx_runtime_.jsx("h3", {
      children: "Submitting comment\u2026"
    });
  }

  if (hasSubmitted) {
    return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
        children: "Thanks for your comment!"
      }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
          children: ["Name: ", formData.name, " ", /*#__PURE__*/jsx_runtime_.jsx("br", {}), "Email: ", formData.email, " ", /*#__PURE__*/jsx_runtime_.jsx("br", {}), "Comment: ", formData.comment]
        })
      })]
    });
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
    onSubmit: handleSubmit(onSubmit),
    className: "w-full max-w-lg",
    disabled: true,
    children: [/*#__PURE__*/jsx_runtime_.jsx("input", _objectSpread(_objectSpread({}, register("_id")), {}, {
      type: "hidden",
      name: "_id",
      value: _id
    })), /*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
      className: "block mb-5",
      children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "text-gray-700",
        children: "Name"
      }), /*#__PURE__*/jsx_runtime_.jsx("input", _objectSpread(_objectSpread({
        name: "name"
      }, register("name", {
        required: true
      })), {}, {
        className: "shadow border rounded py-2 px-3 form-input mt-1 block w-full",
        placeholder: "John Appleseed"
      }))]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
      className: "block mb-5",
      children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "text-gray-700",
        children: "Email"
      }), /*#__PURE__*/jsx_runtime_.jsx("input", _objectSpread(_objectSpread({
        name: "email",
        type: "email"
      }, register("email", {
        required: true
      })), {}, {
        className: "shadow border rounded py-2 px-3 form-input mt-1 block w-full",
        placeholder: "your@email.com"
      }))]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
      className: "block mb-5",
      children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "text-gray-700",
        children: "Comment"
      }), /*#__PURE__*/jsx_runtime_.jsx("textarea", _objectSpread(_objectSpread({}, register("comment", {
        required: true
      })), {}, {
        name: "comment",
        className: "shadow border rounded py-2 px-3  form-textarea mt-1 block w-full",
        rows: "8",
        placeholder: "Enter some long form content."
      }))]
    }), errors.exampleRequired && /*#__PURE__*/jsx_runtime_.jsx("span", {
      children: "This field is required"
    }), /*#__PURE__*/jsx_runtime_.jsx("input", {
      type: "submit",
      className: "shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
    })]
  });
}
;// CONCATENATED MODULE: ./pages/posts/[slug].js


















function Post({
  post,
  morePosts,
  preview
}) {
  const router = (0,router_namespaceObject.useRouter)();

  if (!router.isFallback && !(post !== null && post !== void 0 && post.slug)) {
    return /*#__PURE__*/jsx_runtime_.jsx((error_default()), {
      statusCode: 404
    });
  }

  return /*#__PURE__*/jsx_runtime_.jsx(layout/* default */.Z, {
    preview: preview,
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(container/* default */.Z, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(Header, {}), router.isFallback ? /*#__PURE__*/jsx_runtime_.jsx(PostTitle, {
        children: "Loading\u2026"
      }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("article", {
          children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("title", {
              children: [post.title, " | Next.js Blog Example with ", constants/* CMS_NAME */.yf]
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(PostHeader, {
            title: post.title,
            coverImage: post.coverImage,
            date: post.date,
            author: post.author
          }), /*#__PURE__*/jsx_runtime_.jsx(PostBody, {
            content: post.body
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx(Comments, {
          comments: post.comments
        }), /*#__PURE__*/jsx_runtime_.jsx(Form, {
          _id: post._id
        }), /*#__PURE__*/jsx_runtime_.jsx(SectionSeparator, {}), morePosts.length > 0 && /*#__PURE__*/jsx_runtime_.jsx(more_stories/* default */.Z, {
          posts: morePosts
        })]
      })]
    })
  });
}
async function getStaticProps({
  params,
  preview = false
}) {
  const data = await (0,api/* getPostAndMorePosts */.ds)(params.slug, preview);
  return {
    props: {
      preview,
      post: (data === null || data === void 0 ? void 0 : data.post) || null,
      morePosts: (data === null || data === void 0 ? void 0 : data.morePosts) || null
    },
    revalidate: 1
  };
}
async function getStaticPaths() {
  const allPosts = await (0,api/* getAllPostsWithSlug */.h9)();
  return {
    paths: (allPosts === null || allPosts === void 0 ? void 0 : allPosts.map(post => ({
      params: {
        slug: post.slug
      }
    }))) || [],
    fallback: true
  };
}

/***/ }),

/***/ 7957:
/***/ (function(module) {

// Exports
module.exports = {
	"markdown": "markdown-styles_markdown__1x9gM"
};


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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [664,46,413], function() { return __webpack_exec__(3268); });
module.exports = __webpack_exports__;

})();