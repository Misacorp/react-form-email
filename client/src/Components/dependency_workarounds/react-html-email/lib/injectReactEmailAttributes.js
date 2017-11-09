'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailAttributes = exports.DOMProperty = undefined;
exports.default = injectReactEmailAttributes;

require('react-dom');

var _DOMProperty = require('react-dom/lib/DOMProperty');

var _DOMProperty2 = _interopRequireDefault(_DOMProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ensure base DOM properties are already injected
exports.DOMProperty = _DOMProperty2.default;
var emailAttributes = exports.emailAttributes = {
  Properties: {
    align: 0,
    valign: 0,
    bgcolor: 0,
    border: 0
  }
};

var injected = false;

function injectReactEmailAttributes() {
  if (injected) {
    return;
  }

  // make React accept some HTML attributes useful to emails
  _DOMProperty2.default.injection.injectDOMPropertyConfig(emailAttributes);

  injected = true;
}