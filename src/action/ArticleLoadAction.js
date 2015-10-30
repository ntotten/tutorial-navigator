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
    context.dispatch('LOAD_TUTORIAL_NAVIGATOR', {
      appType : payload.appType,
      tech1 : payload.tech1,
      tech2 : payload.tech2,
      baseUrl : payload.baseUrl
    })
    done();
  }).catch((err) => {
    context.dispatch('RECIEVE_ARTICLE_FAILURE', err);
    return done(err);
  });
}

export const ServiceName = "articleService";
