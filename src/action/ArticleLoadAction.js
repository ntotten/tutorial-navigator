import { loadArticle } from '../util/Tutorials';

// var ServiceName = "articleService";

export default function ArticleLoadAction(context, payload, done) {
  context.getService(ServiceName).loadArticle(payload).then((html) => {
    context.dispatch('RECIEVE_ARTICLE_SUCCESS', {
      appType: payload.appType,
      tech: payload.currentTech,
      html: html,
      onDocumentLoaded : payload.onDocumentLoaded
    });
    done();
  }).catch((err) => {
    context.dispatch('RECIEVE_ARTICLE_FAILURE', err);
    return done(err);
  });
}

export const ServiceName = "articleService";
