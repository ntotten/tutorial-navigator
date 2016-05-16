import { BaseStore } from 'fluxible/addons';
import _ from 'lodash';

class ArticleStore extends BaseStore {
  
  constructor(dispatcher) {
    super(dispatcher);
    this.articles = [];
  }
  
  handleArticleLoaded(payload) {
    let {appType, platform, article, html} = payload;
    let key = this.getKeyForArticle(appType, platform, article);
    this.articles[key] = html;
    this.emitChange();
  }
  
  handleArticleLoadFailure(payload) {
    // TODO: Handle the error
  }
  
  getArticleHtml(appType, platform, article) {
    let key = this.getKeyForArticle(appType, platform, article);
    return this.articles[key] || undefined;
  }
  
  getKeyForArticle(appType, platform, article) {
    return [appType, platform, article].join('/');
  }
  
  getState() {
    return {
      articles: this.articles,
      onDocumentLoaded: this.onDocumentLoaded
    };
  }
  
  dehydrate() {
    return this.getState();
  }
  
  rehydrate(state) {
    this.articles = state.articles;
  }
  
}

ArticleStore.storeName = 'ArticleStore';
ArticleStore.handlers = {
  'ARTICLE_LOAD_SUCCESS': 'handleArticleLoaded',
  'ARTICLE_LOAD_FAILURE': 'handleArticleLoadFailure'
};

export default ArticleStore;
