//import TenantSwitcher from './TenantSwitcher';
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Breadcrumbs = require('./Breadcrumbs');

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _QuickstartList = require('./QuickstartList');

var _QuickstartList2 = _interopRequireDefault(_QuickstartList);

var _TechList = require('./TechList');

var _TechList2 = _interopRequireDefault(_TechList);

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _actionNavigateAction = require('../action/NavigateAction');

var _actionNavigateAction2 = _interopRequireDefault(_actionNavigateAction);

var _utilTutorials = require('../util/Tutorials');

var _storesTutorialStore = require('../stores/TutorialStore');

var _storesTutorialStore2 = _interopRequireDefault(_storesTutorialStore);

var TutorialNavigator = (function (_React$Component) {
  _inherits(TutorialNavigator, _React$Component);

  function TutorialNavigator() {
    _classCallCheck(this, TutorialNavigator);

    _get(Object.getPrototypeOf(TutorialNavigator.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TutorialNavigator, [{
    key: 'handleSkip',
    value: function handleSkip() {
      var action = this.props.customNavigationAction || _actionNavigateAction2['default'];
      this.context.executeAction(action, {
        appType: this.props.appType,
        baseUrl: this.props.baseUrl,
        tech1: this.props.tech1,
        tech2: 'no-api'
      });
    }
  }, {
    key: 'getTenantSwitcher',
    value: function getTenantSwitcher() {
      if (!this.props.userTenants || this.props.userTenants.length < 2) {
        return false;
      }

      return _react2['default'].createElement(TenantSwitcher, null);
    }
  }, {
    key: 'render',
    value: function render() {
      var hasMoreTenants = this.props.userTenants && this.props.userTenants.length > 1;

      var picker;
      if (this.props.appType) {
        picker = _react2['default'].createElement(_TechList2['default'], this.props);
      } else {
        picker = _react2['default'].createElement(_QuickstartList2['default'], this.props);
      }

      var appType = this.props.appType;
      var tech1 = this.props.tech1;
      var skippable = false;
      var question = (0, _utilTutorials.getQuestion)(this.props.appType);
      if (appType && tech1) {
        if (appType === 'native-mobile') {
          skippable = true;
        } else if (appType === 'spa') {
          skippable = true;
        } else if (appType === 'hybrid') {
          skippable = true;
        }
        question = (0, _utilTutorials.getQuestion)('backend');
      }

      return _react2['default'].createElement(
        'div',
        { id: 'tutorial-navigator' },
        _react2['default'].createElement(
          'div',
          { className: 'js-tutorial-navigator' },
          _react2['default'].createElement(
            'div',
            { className: 'banner tutorial-wizard' },
            _react2['default'].createElement(
              'div',
              { className: 'container' },
              _react2['default'].createElement(
                'h1',
                null,
                'Documentation'
              ),
              _react2['default'].createElement(
                'p',
                { className: hasMoreTenants && !this.props.appType ? 'hide' : 'question-text' },
                question
              ),
              this.getTenantSwitcher(),
              _react2['default'].createElement(
                'button',
                { href: '#', 'data-skip': true, onClick: this.handleSkip.bind(this),
                  className: skippable ? '' : 'hide' },
                'No, skip this'
              ),
              _react2['default'].createElement('br', null),
              _react2['default'].createElement(_Breadcrumbs2['default'], _extends({}, this.props, { customNavigationAction: this.props.customNavigationAction }))
            ),
            picker
          )
        )
      );
    }
  }]);

  return TutorialNavigator;
})(_react2['default'].Component);

TutorialNavigator.contextTypes = {
  getStore: _react2['default'].PropTypes.func,
  executeAction: _react2['default'].PropTypes.func
};

TutorialNavigator = (0, _fluxibleAddonsReact.connectToStores)(TutorialNavigator, [_storesTutorialStore2['default']], function (context, props) {
  return context.getStore(_storesTutorialStore2['default']).getState();
});

exports['default'] = TutorialNavigator;
module.exports = exports['default'];