'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = initialSettingsAction;

function initialSettingsAction(context, payload) {
  context.dispatch('LOAD_SETTINGS', {
    quickstart: payload.quickstart,
    baseUrl: payload.baseUrl,
    navigation: payload.navigation
  });
}

;
module.exports = exports['default'];