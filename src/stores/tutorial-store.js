import { BaseStore } from 'fluxible/addons';

class TutorialStore extends BaseStore {
  
  constructor(dispatcher) {
    super(dispatcher);
    this.quickstarts = null;
    this.appType = null;
    this.platform = null;
    this.article = null;
  }
  
  handleTutorialNavigatorLoaded(payload) {
    this.appType = payload.appType;
    this.platform = payload.platform;
    this.article = payload.article;
    this.emitChange();
  }

  handleArticleSelected(payload) {
    this.platform = payload.platform;
    this.article = payload.article;
    this.emitChange();
  }
  
  handleSettingsLoaded(payload) {
    this.quickstarts = payload.quickstarts;
    // TODO: selectedTutorial?
    this.emitChange();
  }
  
  getState() {
    return {
      quickstarts: this.quickstarts,
      appType: this.appType,
      platform: this.platform,
      article: this.article
    };
  }
  
  getQuickstarts() {
    return this.quickstarts;
  }
  
  dehydrate() {
    return this.getState();
  }
  
  rehydrate(state) {
    this.quickstarts = state.quickstarts;
    this.appType = state.appType;
    this.platform = state.platform;
    this.article = state.article;
  }
  
}

TutorialStore.storeName = 'TutorialStore';
TutorialStore.handlers = {
  'ARTICLE_LOADED':          'handleArticleSelected',
  'LOAD_TUTORIAL_NAVIGATOR': 'handleTutorialNavigatorLoaded',
  'LOAD_SETTINGS':           'handleSettingsLoaded'
};

export default TutorialStore;
