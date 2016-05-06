import { BaseStore } from 'fluxible/addons';
import _ from 'lodash';

class ArticleStore extends BaseStore {
  
  constructor(dispatcher) {
    super(dispatcher);
    this.articles = [];
  }
  
  handleArticleLoaded(payload) {
    let {appType, platform} = payload;
    var article = _.find(this.articles, {appType, platform});
    if (article) {
      article = payload;
    } else {
      this.articles.push(payload);
    }
    this.emitChange();
  }
  
  handleArticleLoadFailure(payload) {
    // TODO: Handle the error
  }
  
  getArticleHtml(appType, platform) {
    var article = _.find(this.articles, {appType, platform});
    if (article) {
      return article.html;
    }
  }
  
  getState() {
    return {
      articles: this.articles,
      onDocumentLoaded : this.onDocumentLoaded
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
  'RECIEVE_ARTICLE_SUCCESS': 'handleArticleLoaded',
  'RECIEVE_ARTICLE_FAILURE': 'handleArticleLoadFailure'
};

export default ArticleStore;
