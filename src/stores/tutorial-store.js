import {BaseStore} from 'fluxible/addons';
import _ from 'lodash';

class TutorialStore extends BaseStore {
  
  constructor(dispatcher) {
    super(dispatcher);
    this.quickstarts = null;
    this.currentQuickstartId = null;
    this.currentPlatformId = null;
    this.currentArticleId = null;
  }
  
  getQuickstarts() {
    return this.quickstarts;
  }
  
  getCurrentQuickstart() {
    if (this.currentQuickstartId) {
      return this.quickstarts[this.currentQuickstartId];
    }
    else {
      return undefined;
    }
  }
  
  getCurrentPlatform() {
    let quickstart = this.getCurrentQuickstart();
    if (quickstart && this.currentPlatformId) {
      return quickstart.platforms[this.currentPlatformId];
    }
    else {
      return undefined;
    }
  }
  
  getCurrentArticle() {
    let platform = this.getCurrentPlatform();
    if (platform && this.currentArticleId) {
      return _.find(platform.articles, {name: this.currentArticleId});
    }
  }
  
  handleTutorialNavigatorLoaded(payload) {
    this.currentQuickstartId = payload.quickstartId;
    this.currentPlatformId = payload.platformId;
    this.currentArticleId = payload.articleId;
    this.emitChange();
  }

  handleArticleSelected(payload) {
    this.currentPlatformId = payload.platformId;
    this.currentArticleId = payload.articleId;
    this.emitChange();
  }
  
  handleSettingsLoaded(payload) {
    this.quickstarts = payload.quickstarts;
    this.emitChange();
  }
  
  dehydrate() {
    return {
      quickstarts: this.quickstarts,
      currentQuickstartId: this.currentQuickstartId,
      currentPlatformId: this.currentPlatformId,
      currentArticleId: this.currentArticleId
    }
  }
  
  rehydrate(state) {
    this.quickstarts = state.quickstarts;
    this.currentQuickstartId = state.currentQuickstartId;
    this.currentPlatformId = state.currentPlatformId;
    this.currentArticleId = state.currentArticleId;
  }
  
}

TutorialStore.storeName = 'TutorialStore';
TutorialStore.handlers = {
  'ARTICLE_LOADED':          'handleArticleSelected',
  'LOAD_TUTORIAL_NAVIGATOR': 'handleTutorialNavigatorLoaded',
  'LOAD_SETTINGS':           'handleSettingsLoaded'
};

export default TutorialStore;
