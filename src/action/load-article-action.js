export default function loadArticleAction(context, payload, done) {
  return context.getService(ServiceName).loadArticle(payload)
  .then((html) => {
    context.dispatch('ARTICLE_LOAD_SUCCESS', {
      html,
      appType: payload.appType,
      platform: payload.platform,
      article: payload.article,
    });
    if (done) done();
  }).catch((err) => {
    context.dispatch('ARTICLE_LOAD_FAILURE', err);
    if (done) done();
    return err;
  });
}

export const ServiceName = "articleService";
