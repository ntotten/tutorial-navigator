'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fluxibleAddons = require('fluxible/addons');

var TutorialStore = (function (_BaseStore) {
  _inherits(TutorialStore, _BaseStore);

  function TutorialStore(dispatcher) {
    _classCallCheck(this, TutorialStore);

    _get(Object.getPrototypeOf(TutorialStore.prototype), 'constructor', this).call(this, dispatcher);
    this.baseUrl = '';
    this.appType = null;
    this.tech1 = null;
    this.tech2 = null;
    this.quickstart = null;
  }

  _createClass(TutorialStore, [{
    key: 'handleTutorialNavLoaded',
    value: function handleTutorialNavLoaded(payload) {
      this.appType = payload.appType;
      this.tech1 = payload.tech1;
      this.tech2 = payload.tech2;
      this.emitChange();
    }
  }, {
    key: 'handleSettingsLoaded',
    value: function handleSettingsLoaded(payload) {
      this.quickstart = payload.quickstart;
      this.baseUrl = payload.baseUrl;
      this.emitChange();
    }
  }, {
    key: 'getState',
    value: function getState() {
      return {
        baseUrl: this.baseUrl,
        appType: this.appType,
        tech1: this.tech1,
        tech2: this.tech2,
        quickstart: this.quickstart
      };
    }
  }, {
    key: 'getQuickstart',
    value: function getQuickstart() {
      return this.quickstart;
    }
  }, {
    key: 'getBaseUrl',
    value: function getBaseUrl() {
      return this.baseUrl;
    }
  }, {
    key: 'dehydrate',
    value: function dehydrate() {
      return this.getState();
    }
  }, {
    key: 'rehydrate',
    value: function rehydrate(state) {
      this.baseUrl = state.baseUrl, this.appType = state.appType;
      this.tech1 = state.tech1;
      this.tech2 = state.tech2;
      this.quickstart = state.quickstart;
    }
  }]);

  return TutorialStore;
})(_fluxibleAddons.BaseStore);

TutorialStore.storeName = 'TutorialStore';
TutorialStore.handlers = {
  'LOAD_TUTORIAL_NAVIGATOR': 'handleTutorialNavLoaded',
  'LOAD_SETTINGS': 'handleSettingsLoaded'
};

exports['default'] = TutorialStore;
module.exports = exports['default'];