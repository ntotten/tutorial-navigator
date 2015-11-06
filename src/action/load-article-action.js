import { loadArticle } from '../util/tutorials';

export default function loadArticleAction(context, payload, done) {
  return context.getService(ServiceName).loadArticle(payload).then((html) => {
    context.dispatch('ARTICLE_LOADED', {
      tech2 : payload.tech2,
      articleLoaded : true
    });
    context.dispatch('RECIEVE_ARTICLE_SUCCESS', {
      appType: payload.appType,
      tech: payload.currentTech,
      html: html,
      onDocumentLoaded : payload.onDocumentLoaded
    });
    if (done){
      done();
    }
  }).catch((err) => {
    context.dispatch('RECIEVE_ARTICLE_FAILURE', err);
    if (done){
      done(err);
    }
    return err;
  });
}

export const ServiceName = "articleService";
