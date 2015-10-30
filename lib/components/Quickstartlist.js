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

var _Quickstart = require('./Quickstart');

var _Quickstart2 = _interopRequireDefault(_Quickstart);

var QuickstartList = (function (_React$Component) {
  _inherits(QuickstartList, _React$Component);

  function QuickstartList() {
    _classCallCheck(this, QuickstartList);

    _get(Object.getPrototypeOf(QuickstartList.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(QuickstartList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (typeof window !== 'undefined') {
        this.componentDidMountClient();
      }
    }
  }, {
    key: 'componentDidMountClient',
    value: function componentDidMountClient() {
      // Runs only on client, not on server
      if (this.props.onQuickstartLoaded) {
        this.props.onQuickstartLoaded.call(this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var list = [];
      var hide = !this.props.quickstart.apptypes ? 'hide ' : '';

      this.props.quickstart.apptypes.forEach((function (appType, i) {
        list.push(_react2['default'].createElement(_Quickstart2['default'], { key: i, model: appType, baseUrl: this.props.baseUrl, onDocumentLoaded: this.props.onDocumentLoaded, customNavigationAction: this.props.customNavigationAction }));
      }).bind(this));

      return _react2['default'].createElement(
        'div',
        { className: hide + "quickstart-list container" },
        _react2['default'].createElement(
          'div',
          { className: 'js-carousel', ref: 'carousel' },
          list
        )
      );
    }
  }]);

  return QuickstartList;
})(_react2['default'].Component);

exports['default'] = QuickstartList;
module.exports = exports['default'];