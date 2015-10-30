'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ArticleLoadAction;

var _utilTutorials = require('../util/Tutorials');

// var ServiceName = "articleService";

function ArticleLoadAction(context, payload, done) {
  context.getService(ServiceName).loadArticle(payload).then(function (html) {
    context.dispatch('RECIEVE_ARTICLE_SUCCESS', {
      appType: payload.appType,
      tech: payload.currentTech,
      html: html,
      onDocumentLoaded: payload.onDocumentLoaded
    });
    done();
  })['catch'](function (err) {
    context.dispatch('RECIEVE_ARTICLE_FAILURE', err);
    return done(err);
  });
}

var ServiceName = "articleService";
exports.ServiceName = ServiceName;