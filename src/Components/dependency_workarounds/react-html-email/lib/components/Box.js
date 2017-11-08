'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Box;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PropTypes = require('../PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Box(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ['children']);

  return _react2.default.createElement(
    'table',
    props,
    _react2.default.createElement(
      'tbody',
      null,
      children
    )
  );
}

Box.propTypes = {
  cellPadding: _propTypes2.default.number,
  cellSpacing: _propTypes2.default.number,
  border: _propTypes2.default.string,
  bgcolor: _propTypes2.default.string,
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  align: _propTypes2.default.oneOf(['left', 'center', 'right']),
  valign: _propTypes2.default.oneOf(['top', 'middle', 'bottom']),
  style: _PropTypes2.default.style,
  children: _propTypes2.default.node
};

Box.defaultProps = {
  cellPadding: 0,
  cellSpacing: 0,
  border: '0',
  align: 'left',
  valign: 'top',
  bgcolor: undefined,
  width: undefined,
  height: undefined,
  style: undefined,
  children: undefined
};