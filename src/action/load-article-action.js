export default function loadArticleAction(context, payload, done) {
  return context.getService(ServiceName).loadArticle(payload)
  .then((html) => {
    context.dispatch('ARTICLE_LOADED', {
      payload: payload.payload,
      articleLoaded: true
    });
    context.dispatch('RECIEVE_ARTICLE_SUCCESS', {
      appType: payload.appType,
      payload: payload.payload,
      html: html,
      onDocumentLoaded: payload.onDocumentLoaded
    });
    if (done) done();
  }).catch((err) => {
    context.dispatch('RECIEVE_ARTICLE_FAILURE', err);
    if (done) done();
    return err;
  });
}

export const ServiceName = "articleService";
