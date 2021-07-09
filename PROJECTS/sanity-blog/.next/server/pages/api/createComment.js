(function() {
var exports = {};
exports.id = 320;
exports.ids = [320];
exports.modules = {

/***/ 6208:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ createComment; }
});

;// CONCATENATED MODULE: external "@sanity/client"
var client_namespaceObject = require("@sanity/client");;
var client_default = /*#__PURE__*/__webpack_require__.n(client_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/createComment.js

const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN
};
const client = client_default()(config);
async function createComment(req, res) {
  const {
    _id,
    name,
    email,
    comment
  } = JSON.parse(req.body);

  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id
      },
      name,
      email,
      comment
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Couldn't submit comment`,
      err
    });
  }

  return res.status(200).json({
    message: "Comment submitted"
  });
}

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(6208));
module.exports = __webpack_exports__;

})();