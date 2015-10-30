/* global fetch */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utilTutorials = require('../util/Tutorials');

exports['default'] = {
  loadArticle: function loadArticle(payload) {
    var url = (payload.baseUrl || '') + '/' + (0, _utilTutorials.getPlatformSlug)(payload.appType) + '/' + (payload.currentTech + '?' + payload.appType + '=' + payload.tech1 + '&e=1');
    if (payload.tech2) {
      url += '&api=' + payload.tech2;
    }

    if (payload.clientId) {
      url += '&a=' + payload.clientId;
    }

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 400) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.status = response.status;
        error.response = response;
        throw error;
      }
    }

    return fetch(url, {
      credentials: 'include'
    }).then(checkStatus).then(function (response) {
      return response.text();
    });
  }
};
module.exports = exports['default'];