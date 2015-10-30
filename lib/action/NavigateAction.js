'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = NavigateAction;

function NavigateAction(context, payload) {
  return context.dispatch('LOAD_TUTORIAL_NAVIGATOR', {
    appType: payload.appType,
    tech1: payload.tech1,
    tech2: payload.tech2,
    baseUrl: payload.baseUrl
  });
}

;
module.exports = exports['default'];