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

var _Tech = require('./Tech');

var _Tech2 = _interopRequireDefault(_Tech);

var _utilTutorials = require('../util/Tutorials');

var TechList = (function (_React$Component) {
  _inherits(TechList, _React$Component);

  function TechList() {
    _classCallCheck(this, TechList);

    _get(Object.getPrototypeOf(TechList.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TechList, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var collection = [];
      var classString = '';

      var platformType = this.props.appType;
      if (this.props.tech1) {
        platformType = 'backend';
      }

      var skippable = true;
      if (platformType === 'backend' || platformType === 'webapp') {
        skippable = false;
      }

      (0, _utilTutorials.getPlatformCollection)(this.props.quickstart, platformType).forEach(function (tech, i) {
        var time = 20 * i;

        collection.push(_react2['default'].createElement(_Tech2['default'], { key: i,
          delay: time,
          skippable: skippable,
          baseUrl: _this.props.baseUrl,
          tech: tech,
          tech1: _this.props.tech1,
          appType: _this.props.appType,
          onDocumentLoaded: _this.props.onDocumentLoaded,
          customNavigationAction: _this.props.customNavigationAction }));
      });

      return _react2['default'].createElement(
        'div',
        { className: classString + "container" },
        _react2['default'].createElement(
          'ul',
          { className: 'circle-list' },
          collection
        )
      );
    }
  }]);

  return TechList;
})(_react2['default'].Component);

exports['default'] = TechList;
module.exports = exports['default'];