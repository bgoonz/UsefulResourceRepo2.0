"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BaseSyntax2 = _interopRequireDefault(require("./BaseSyntax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The class to define the ExportNamedDeclaration syntax.
 */
var ExportNamedDeclaration = /*#__PURE__*/function (_BaseSyntax) {
  _inherits(ExportNamedDeclaration, _BaseSyntax);

  var _super = _createSuper(ExportNamedDeclaration);

  /**
   * Constructed with either declaration or specifiers.
   * @param {Object} cfg
   * @param {Object} cfg.declaration Any *Declaration node (optional)
   * @param {Object[]} cfg.specifiers List of specifiers (optional)
   * @param {Object[]} cfg.comments Comments data (optional)
   */
  function ExportNamedDeclaration(_ref) {
    var _this;

    var declaration = _ref.declaration,
        specifiers = _ref.specifiers,
        comments = _ref.comments;

    _classCallCheck(this, ExportNamedDeclaration);

    _this = _super.call(this, 'ExportNamedDeclaration');
    _this.declaration = declaration;
    _this.specifiers = specifiers;
    _this.comments = comments;
    return _this;
  }

  return ExportNamedDeclaration;
}(_BaseSyntax2["default"]);

exports["default"] = ExportNamedDeclaration;