'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fluxibleAddons = require('fluxible/addons');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var ArticleStore = (function (_BaseStore) {
  _inherits(ArticleStore, _BaseStore);

  function ArticleStore(dispatcher) {
    _classCallCheck(this, ArticleStore);

    _get(Object.getPrototypeOf(ArticleStore.prototype), 'constructor', this).call(this, dispatcher);
    this.articles = [];
    this.onDocumentLoaded = null;
  }

  _createClass(ArticleStore, [{
    key: 'handleArticledLoaded',
    value: function handleArticledLoaded(payload) {
      var article = _lodash2['default'].find(this.articles, { appType: payload.appType, tech: payload.tech });
      if (article) {
        article = payload;
      } else {
        this.articles.push(payload);
      }
      this.emitChange();
    }
  }, {
    key: 'handleArticledLoadFailure',
    value: function handleArticledLoadFailure(payload) {
      // TODO: Handle the error
    }
  }, {
    key: 'getArticleHtml',
    value: function getArticleHtml(appType, tech) {
      var article = _lodash2['default'].find(this.articles, { appType: appType, tech: tech });
      if (article) {
        return article.html;
      }
    }
  }, {
    key: 'getState',
    value: function getState() {
      return {
        articles: this.articles,
        onDocumentLoaded: this.onDocumentLoaded
      };
    }
  }, {
    key: 'dehydrate',
    value: function dehydrate() {
      return this.getState();
    }
  }, {
    key: 'rehydrate',
    value: function rehydrate(state) {
      this.articles = state.articles;
      this.onDocumentLoaded = state.onDocumentLoaded;
    }
  }]);

  return ArticleStore;
})(_fluxibleAddons.BaseStore);

ArticleStore.storeName = 'ArticleStore';
ArticleStore.handlers = {
  'RECIEVE_ARTICLE_SUCCESS': 'handleArticledLoaded',
  'RECIEVE_ARTICLE_FAILURE': 'handleArticledLoadFailure'
};

exports['default'] = ArticleStore;
module.exports = exports['default'];