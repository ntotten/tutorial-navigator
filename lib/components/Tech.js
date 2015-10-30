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

var _actionArticleLoadAction = require('../action/ArticleLoadAction');

var _actionArticleLoadAction2 = _interopRequireDefault(_actionArticleLoadAction);

var Tech = (function (_React$Component) {
  _inherits(Tech, _React$Component);

  function Tech() {
    _classCallCheck(this, Tech);

    _get(Object.getPrototypeOf(Tech.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Tech, [{
    key: 'handleClick',
    value: function handleClick(tech) {
      var action;
      var payload = { appType: this.props.appType, baseUrl: this.props.baseUrl || '' };
      if (this.props.tech1) {
        payload.tech1 = this.props.tech1;
        payload.tech2 = tech.name;
        payload.currentTech = this.props.tech1;
        action = this.props.customNavigationAction || _actionArticleLoadAction2['default'];
      } else {
        payload.tech1 = tech.name;
        action = this.props.customNavigationAction || _actionNavigateAction2['default'];
      }

      this.context.executeAction(action, payload);
    }
  }, {
    key: 'render',
    value: function render() {
      var tech = this.props.tech;
      var style = {
        animationDelay: this.props.delay + 'ms',
        WebkitAnimationDelay: this.props.delay + 'ms',
        animationDuration: '200ms',
        WebkitAnimationDuration: '200ms',
        animationTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        WebkitAnimationTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      };

      return _react2['default'].createElement(
        'li',
        { className: 'animated scaleIn', style: style },
        _react2['default'].createElement(
          'div',
          { 'data-name': tech.name, className: 'circle-logo', onClick: this.handleClick.bind(this, tech) },
          _react2['default'].createElement('div', { className: 'logo' }),
          _react2['default'].createElement(
            'div',
            { className: 'title' },
            tech.title
          )
        )
      );
    }
  }]);

  return Tech;
})(_react2['default'].Component);

Tech.contextTypes = {
  executeAction: _react2['default'].PropTypes.func
};

exports['default'] = Tech;
module.exports = exports['default'];