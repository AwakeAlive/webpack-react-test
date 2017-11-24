webpackJsonp([2],{

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(90);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _lodash2.default.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());

/***/ })

},[125]);