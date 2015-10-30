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

var _utilTutorials = require('../util/Tutorials');

var _actionNavigateAction = require('../action/NavigateAction');

var _actionNavigateAction2 = _interopRequireDefault(_actionNavigateAction);

var _storesTutorialStore = require('../stores/TutorialStore');

var _storesTutorialStore2 = _interopRequireDefault(_storesTutorialStore);

var _fluxibleAddonsReact = require('fluxible-addons-react');

var Breadcrumbs = (function (_React$Component) {
  _inherits(Breadcrumbs, _React$Component);

  function Breadcrumbs() {
    _classCallCheck(this, Breadcrumbs);

    _get(Object.getPrototypeOf(Breadcrumbs.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Breadcrumbs, [{
    key: 'navigate',
    value: function navigate(props) {
      var action = this.props.customNavigationAction || _actionNavigateAction2['default'];
      this.context.executeAction(action, {
        baseUrl: props.baseUrl,
        appType: props.appType,
        tech1: props.tech1,
        tech2: props.tech2
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var list = [];
      var p = this.props;
      if (p.appType) {
        list.push(_react2['default'].createElement(
          'a',
          { key: 'base', onClick: this.navigate.bind(this, {}) },
          _react2['default'].createElement(
            'span',
            { className: 'text' },
            'Documentation'
          )
        ));
        list.push(_react2['default'].createElement(
          'a',
          { key: 'apptype', onClick: this.navigate.bind(this, { appType: this.props.appType }) },
          _react2['default'].createElement('i', { className: 'icon-budicon-461' }),
          _react2['default'].createElement(
            'span',
            { className: 'text' },
            (0, _utilTutorials.getPlatformName)(p.appType)
          )
        ));
      } else {
        return _react2['default'].createElement('div', null);
      }

      if (p.tech1) {
        list.push(_react2['default'].createElement(
          'a',
          { key: 'tech1', onClick: this.navigate.bind(this, { appType: this.props.appType, tech1: this.props.tech1 }) },
          _react2['default'].createElement('i', { className: 'icon-budicon-461' }),
          _react2['default'].createElement(
            'span',
            { className: 'text' },
            (0, _utilTutorials.getTechTitle)(p.quickstart, p.appType, p.tech1)
          )
        ));
      }

      if (p.tech2 && p.tech2 !== 'no-api') {
        list.push(_react2['default'].createElement(
          'a',
          { key: 'tech2', onClick: this.navigate.bind(this, { appType: this.props.appType, tech1: this.props.tech1, tech2: this.props.tech2 }) },
          _react2['default'].createElement('i', { className: 'icon-budicon-461' }),
          _react2['default'].createElement(
            'span',
            { className: 'text' },
            (0, _utilTutorials.getTechTitle)(p.quickstart, 'backend', p.tech2)
          )
        ));
      }

      return _react2['default'].createElement(
        'div',
        { className: 'breadcrumbs' },
        list
      );
    }
  }]);

  return Breadcrumbs;
})(_react2['default'].Component);

Breadcrumbs.contextTypes = {
  getStore: _react2['default'].PropTypes.func,
  executeAction: _react2['default'].PropTypes.func
};

Breadcrumbs = (0, _fluxibleAddonsReact.connectToStores)(Breadcrumbs, [_storesTutorialStore2['default']], function (context, props) {
  return context.getStore(_storesTutorialStore2['default']).getState();
});

exports['default'] = Breadcrumbs;
module.exports = exports['default'];