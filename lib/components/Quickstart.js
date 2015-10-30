'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actionNavigateAction = require('../action/NavigateAction');

var _actionNavigateAction2 = _interopRequireDefault(_actionNavigateAction);

var Quickstart = (function (_React$Component) {
  _inherits(Quickstart, _React$Component);

  function Quickstart() {
    _classCallCheck(this, Quickstart);

    _get(Object.getPrototypeOf(Quickstart.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Quickstart, [{
    key: 'handleClick',
    value: function handleClick(quickstart) {
      this.context.executeAction(this.props.customNavigationAction || _actionNavigateAction2['default'], {
        baseUrl: this.props.baseUrl,
        appType: quickstart.name
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var quickstart = this.props.model;
      var boundClick = this.handleClick.bind(this, quickstart);

      return _react2['default'].createElement(
        'div',
        { className: 'quickstart', 'data-type': quickstart.name, onClick: boundClick },
        _react2['default'].createElement('div', { className: 'symbol' }),
        _react2['default'].createElement(
          'strong',
          { className: 'title' },
          quickstart.title
        ),
        _react2['default'].createElement(
          'p',
          { className: 'description' },
          quickstart.description
        ),
        _react2['default'].createElement(
          'p',
          { className: 'sample' },
          quickstart.example
        ),
        _react2['default'].createElement(
          'div',
          { className: 'cta' },
          _react2['default'].createElement(
            'button',
            { className: 'btn btn-success btn-sm' },
            'Launch Quickstart'
          )
        )
      );
    }
  }]);

  return Quickstart;
})(_react2['default'].Component);

Quickstart.contextTypes = {
  executeAction: _react2['default'].PropTypes.func
};

exports['default'] = Quickstart;
module.exports = exports['default'];