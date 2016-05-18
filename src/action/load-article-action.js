import TutorialStore from '../stores/tutorial-store';
import ServiceKeys from '../services/keys';

export default function loadArticleAction(context, payload, done) {
  let articleService = context.getService(ServiceKeys.ArticleService);
  let quickstarts = context.getStore(TutorialStore).getQuickstarts();
  return articleService.loadArticle(quickstarts, payload)
  .then((html) => {
    context.dispatch('ARTICLE_LOAD_SUCCESS', {
      html,
      quickstartId: payload.quickstartId,
      platformId: payload.platformId,
      articleId: payload.articleId,
    });
    if (done) done();
  }).catch((err) => {
    context.dispatch('ARTICLE_LOAD_FAILURE', err);
    if (done) done();
    return err;
  });
}
