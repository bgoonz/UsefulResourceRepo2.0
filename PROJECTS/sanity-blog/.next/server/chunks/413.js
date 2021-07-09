exports.id = 413;
exports.ids = [413];
exports.modules = {

/***/ 5213:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Avatar; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);


function Avatar({
  name,
  picture
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "flex items-center",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
      src: picture,
      className: "w-12 h-12 rounded-full mr-4",
      alt: name
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
      className: "text-xl font-bold",
      children: name
    })]
  });
}

/***/ }),

/***/ 1964:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Container; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Container({
  children
}) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
    className: "container mx-auto px-5",
    children: children
  });
}

/***/ }),

/***/ 5674:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ CoverImage; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4058);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var _lib_sanity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6023);




function CoverImage({
  title,
  url,
  imageObject,
  slug
}) {
  const image = /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
    width: 1240,
    height: 540,
    alt: `Cover Image for ${title}`,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("shadow-small", {
      "hover:shadow-medium transition-shadow duration-200": slug
    }),
    src: (0,_lib_sanity__WEBPACK_IMPORTED_MODULE_3__/* .imageBuilder */ .t3)(imageObject).width(1240).height(540).url()
  });

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
    className: "-mx-5 sm:mx-0",
    children: slug ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__.default, {
      as: `/posts/${slug}`,
      href: "/posts/[slug]",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
        "aria-label": title,
        children: image
      })
    }) : image
  });
}

/***/ }),

/***/ 6074:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Date; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3879);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_1__);


function Date({
  dateString
}) {
  if (!(0,date_fns__WEBPACK_IMPORTED_MODULE_1__.isValid)((0,date_fns__WEBPACK_IMPORTED_MODULE_1__.parseISO)(dateString))) {
    return "No date";
  }

  const date = (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.parseISO)(dateString);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
    dateTime: dateString,
    children: (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.format)(date, "LLLL	d, yyyy")
  });
}

/***/ }),

/***/ 7952:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ Layout; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: ./components/container.js
var container = __webpack_require__(1964);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(4058);
;// CONCATENATED MODULE: ./components/alert.js






function Alert({
  preview
}) {
  return /*#__PURE__*/_jsx("div", {
    className: cn("border-b", {
      "bg-accent-7 border-accent-7 text-white": preview,
      "bg-accent-1 border-accent-2": !preview
    }),
    children: /*#__PURE__*/_jsx(Container, {
      children: /*#__PURE__*/_jsx("div", {
        className: "py-2 text-center text-sm",
        children: preview ? /*#__PURE__*/_jsxs(_Fragment, {
          children: ["This page is a preview.", " ", /*#__PURE__*/_jsx("a", {
            href: "/api/exit-preview",
            className: "underline hover:text-cyan duration-200 transition-colors",
            children: "Click here"
          }), " ", "to exit preview mode."]
        }) : /*#__PURE__*/_jsxs(_Fragment, {
          children: ["The source code for this blog is", " ", /*#__PURE__*/_jsx("a", {
            href: `https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`,
            className: "underline hover:text-success duration-200 transition-colors",
            children: "available on GitHub"
          }), "."]
        })
      })
    })
  });
}
;// CONCATENATED MODULE: ./components/footer.js




function Footer() {
  return /*#__PURE__*/jsx_runtime_.jsx("footer", {
    className: "bg-accent-1 border-t border-accent-2",
    children: /*#__PURE__*/jsx_runtime_.jsx(container/* default */.Z, {
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "py-28 flex flex-col lg:flex-row items-center",
        children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
          className: "text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2",
          children: "Blog Home"
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2",
          children: [/*#__PURE__*/jsx_runtime_.jsx("a", {
            href: "https://bgoonz-blog.netlify.app/",
            className: "mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0",
            children: "Blog Home"
          }), /*#__PURE__*/jsx_runtime_.jsx("a", {
            href: `https://github.com/bgoonz/blog-w-comments`,
            className: "mx-3 font-bold hover:underline",
            children: "View on GitHub"
          })]
        })]
      })
    })
  });
}
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./lib/constants.js
var constants = __webpack_require__(8261);
;// CONCATENATED MODULE: ./components/meta.js




function Meta() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
    children: [/*#__PURE__*/jsx_runtime_.jsx("link", {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png"
    }), /*#__PURE__*/jsx_runtime_.jsx("link", {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png"
    }), /*#__PURE__*/jsx_runtime_.jsx("link", {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png"
    }), /*#__PURE__*/jsx_runtime_.jsx("link", {
      rel: "manifest",
      href: "/favicon/site.webmanifest"
    }), /*#__PURE__*/jsx_runtime_.jsx("link", {
      rel: "mask-icon",
      href: "/favicon/safari-pinned-tab.svg",
      color: "#000000"
    }), /*#__PURE__*/jsx_runtime_.jsx("link", {
      rel: "shortcut icon",
      href: "/favicon/favicon.ico"
    }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
      name: "msapplication-TileColor",
      content: "#000000"
    }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
      name: "msapplication-config",
      content: "/favicon/browserconfig.xml"
    }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
      name: "theme-color",
      content: "#000"
    }), /*#__PURE__*/jsx_runtime_.jsx("link", {
      rel: "alternate",
      type: "application/rss+xml",
      href: "/feed.xml"
    }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
      name: "description",
      content: `Bryan Guner Content Blog`
    }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
      property: "og:image",
      content: constants/* HOME_OG_IMAGE_URL */.vC
    })]
  });
}
;// CONCATENATED MODULE: ./components/layout.js






function Layout({
  preview,
  children
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(Meta, {}), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "min-h-screen",
      children: /*#__PURE__*/jsx_runtime_.jsx("main", {
        children: children
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(Footer, {})]
  });
}

/***/ }),

/***/ 164:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ MoreStories; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: ./components/avatar.js
var avatar = __webpack_require__(5213);
// EXTERNAL MODULE: ./components/date.js
var components_date = __webpack_require__(6074);
// EXTERNAL MODULE: ./components/cover-image.js
var cover_image = __webpack_require__(5674);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: ./lib/sanity.js
var sanity = __webpack_require__(6023);
;// CONCATENATED MODULE: ./components/post-preview.js







function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "mb-5",
      children: /*#__PURE__*/jsx_runtime_.jsx(cover_image/* default */.Z, {
        slug: slug,
        title: title,
        imageObject: coverImage,
        url: (0,sanity/* imageBuilder */.t3)(coverImage).url()
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("h3", {
      className: "text-3xl mb-3 leading-snug",
      children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        as: `/posts/${slug}`,
        href: "/posts/[slug]",
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          className: "hover:underline",
          children: title
        })
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "text-lg mb-4",
      children: /*#__PURE__*/jsx_runtime_.jsx(components_date/* default */.Z, {
        dateString: date
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      className: "text-lg leading-relaxed mb-4",
      children: excerpt
    }), /*#__PURE__*/jsx_runtime_.jsx(avatar/* default */.Z, {
      name: author === null || author === void 0 ? void 0 : author.name,
      picture: author === null || author === void 0 ? void 0 : author.picture
    })]
  });
}
;// CONCATENATED MODULE: ./components/more-stories.js



function MoreStories({
  posts
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("section", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
      className: "mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight",
      children: "More Stories"
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32",
      children: posts.map(post => /*#__PURE__*/jsx_runtime_.jsx(PostPreview, {
        title: post.title,
        coverImage: post.coverImage,
        date: post.date,
        author: post.author,
        slug: post.slug,
        excerpt: post.excerpt
      }, post.slug))
    })]
  });
}

/***/ }),

/***/ 8261:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "yf": function() { return /* binding */ CMS_NAME; },
/* harmony export */   "oc": function() { return /* binding */ CMS_URL; },
/* harmony export */   "vC": function() { return /* binding */ HOME_OG_IMAGE_URL; }
/* harmony export */ });
/* unused harmony export EXAMPLE_PATH */
const EXAMPLE_PATH = "cms-sanity";
const CMS_NAME = "Sanity";
const CMS_URL = "https://sanity.io/";
const HOME_OG_IMAGE_URL = "https://og-image.now.sh/Next.js%20Blog%20Example%20with%20**Sanity**.png?theme=light&md=1&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&images=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB2aWV3Qm94PSIwIDAgMTA1IDIyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMWVtIj48dGl0bGU%2BU2FuaXR5PC90aXRsZT48cGF0aCBvcGFjaXR5PSIwLjciIGQ9Ik03OC4xNzkzIDcuOTkyNjFWMjEuMDAyOEg3My45MDMxVjEwLjIxMzhMNzguMTc5MyA3Ljk5MjYxWiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg%2BPHBhdGggb3BhY2l0eT0iMC43IiBkPSJNMjAuOTUxMSAyMS4zM0wzMC45NDQgMTYuMTA1MUwyOS43MTIxIDEyLjkxNDFMMjMuMTMzMiAxNS45ODIxTDIwLjk1MTEgMjEuMzNaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD48cGF0aCBvcGFjaXR5PSIwLjUiIGQ9Ik03My45MDMxIDEwLjIwMjdMODQuNzQ0MyA0LjY1NDc3TDgyLjkxMjYgMS41NTcxTDczLjkwMzEgNS45NTk5N1YxMC4yMDI3WiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg%2BPHBhdGggb3BhY2l0eT0iMC43IiBkPSJNNDMuMzcwNSA2Ljk2MjMzVjIxLjAwMjhIMzkuMjkyN1YxLjAwNzE0TDQzLjM3MDUgNi45NjIzM1oiIGZpbGw9ImN1cnJlbnRDb2xvciI%2BPC9wYXRoPjxwYXRoIG9wYWNpdHk9IjAuNSIgZD0iTTI3LjEyOTkgNi4xODYxN0wyMC45NTExIDIxLjMzTDE3Ljc3MzEgMTguNTk0M0wyNS4xMzUzIDEuMDA3MTRMMjcuMTI5OSA2LjE4NjE3WiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg%2BPHBhdGggZD0iTTI1LjEzNTMgMS4wMDcxNEgyOS4zNDc3TDM3LjEzODYgMjEuMDAyOEgzMi44MjY5TDI1LjEzNTMgMS4wMDcxNFoiIGZpbGw9ImN1cnJlbnRDb2xvciI%2BPC9wYXRoPjxwYXRoIGQ9Ik00NC4wMDEyIDEuMDA3MTRMNTIuOTgyNCAxNC42NjgyVjIxLjAwMjhMMzkuMjkyNyAxLjAwNzE0SDQ0LjAwMTJaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD48cGF0aCBkPSJNNjQuOTE4MyAxLjAwNzE0SDYwLjY3MzlWMjEuMDA2M0g2NC45MTgzVjEuMDA3MTRaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD48cGF0aCBkPSJNNzMuOTAzMSA0LjY1NDc0SDY3LjM3VjEuMDA3MTRIODIuNTg2N0w4NC43NDQzIDQuNjU0NzRINzguMTc5M0g3My45MDMxWiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg%2BPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNOTcuMjc1NCAxMy40MTUzVjIxLjAwMjhIOTMuMDYyOVYxMy40MTUzIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD48cGF0aCBkPSJNOTMuMDYyOSAxMy40MTUyTDEwMC4xOTEgMS4wMDcxNEgxMDQuNjY2TDk3LjI3NTQgMTMuNDE1Mkg5My4wNjI5WiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg%2BPHBhdGggb3BhY2l0eT0iMC43IiBkPSJNOTMuMDYzIDEzLjQxNTJMODUuNzM2MyAxLjAwNzE0SDkwLjM0NTZMOTUuMzA5MiA5LjUxMDA4TDkzLjA2MyAxMy40MTUyWiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg%2BPHBhdGggZD0iTTEuOTYxMjYgMy4zMTQ3OUMxLjk2MTI2IDYuMDk5MjEgMy43MTE0NSA3Ljc1NTk1IDcuMjE1MzYgOC42Mjk1NkwxMC45MjgzIDkuNDc1MzNDMTQuMjQ0NCAxMC4yMjM2IDE2LjI2MzkgMTIuMDgyMiAxNi4yNjM5IDE1LjExMDNDMTYuMjg5NyAxNi40Mjk1IDE1Ljg1MzEgMTcuNzE3MyAxNS4wMjc0IDE4Ljc1NzlDMTUuMDI3NCAxNS43MzY4IDEzLjQzNjcgMTQuMTA0NCA5LjU5OTcyIDEzLjEyMjlMNS45NTQwOSAxMi4zMDg1QzMuMDM0NzUgMTEuNjU0MSAwLjc4MTQ3OCAxMC4xMjYyIDAuNzgxNDc4IDYuODM3MDlDMC43NjYxMjMgNS41NjY5MyAxLjE4MTE2IDQuMzI3ODEgMS45NjEyNiAzLjMxNDc5IiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD48cGF0aCBvcGFjaXR5PSIwLjciIGQ9Ik01Mi45ODI0IDEzLjY0MTVWMS4wMDcxNEg1Ny4wNjAyVjIxLjAwMjhINTIuOTgyNFYxMy42NDE1WiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg%2BPHBhdGggb3BhY2l0eT0iMC43IiBkPSJNMTIuNzQ1OCAxNC4zNjg5QzE0LjMyOTQgMTUuMzY0MyAxNS4wMjM4IDE2Ljc1NjUgMTUuMDIzOCAxOC43NTQ0QzEzLjcxMyAyMC40MDQxIDExLjQxMDEgMjEuMzMgOC43MDMzMyAyMS4zM0M0LjE0NzE4IDIxLjMzIDAuOTU4NTc3IDE5LjEyNjggMC4yNSAxNS4yOTgySDQuNjI1NDdDNS4xODg3OCAxNy4wNTU5IDYuNjgwMzQgMTcuODcwMyA4LjY3MTQ0IDE3Ljg3MDNDMTEuMTAxOSAxNy44NzAzIDEyLjcxNzQgMTYuNTk2NCAxMi43NDkzIDE0LjM2MTkiIGZpbGw9ImN1cnJlbnRDb2xvciI%2BPC9wYXRoPjxwYXRoIG9wYWNpdHk9IjAuNyIgZD0iTTQuMjM1NjcgNy40NDI2N0MzLjUxMjUgNy4wMjA0NSAyLjkxOTIgNi40MTM3NSAyLjUxODczIDUuNjg2OTdDMi4xMTgyNyA0Ljk2MDE5IDEuOTI1NTggNC4xNDA0NSAxLjk2MTEzIDMuMzE0NzZDMy4yMjU5NCAxLjY3ODkxIDUuNDI2MDggMC42Nzk5OTMgOC4xMDgwNCAwLjY3OTk5M0MxMi43NDkyIDAuNjc5OTkzIDE1LjQzNDcgMy4wODg1MiAxNi4wOTcyIDYuNDc4NTZIMTEuODg4M0MxMS40MjQyIDUuMTQyMDMgMTAuMjYyMSA0LjEwMTM2IDguMTQzNDcgNC4xMDEzNkM1Ljg3OTU3IDQuMTAxMzYgNC4zMzQ4NyA1LjM5NjExIDQuMjQ2MjkgNy40NDI2NyIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg%2BPC9zdmc%2B&widths=undefined&widths=auto&heights=250&heights=150";

/***/ }),

/***/ 4453:
/***/ (function() {

/* (ignored) */

/***/ })

};
;