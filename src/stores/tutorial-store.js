import { BaseStore } from 'fluxible/addons';

class TutorialStore extends BaseStore {
  
  constructor(dispatcher) {
    super(dispatcher);
    this.quickstarts = null;
    this.appType = null;
    this.platform = null;
    this.articleLoaded = false;
  }
  
  handleTutorialNavigatorLoaded(payload) {
    this.appType = payload.appType;
    this.platform = payload.platform;
    this.article = payload.article;
    this.articleLoaded = payload.articleLoaded || false;
    this.emitChange();
  }
  
  handleSettingsLoaded(payload) {
    this.quickstarts = payload.quickstarts;
    let tutorial = payload.selectedTutorial;
    if (tutorial && tutorial.appType && tutorial.platform) {
      this.appType = tutorial.appType;
      this.platform = tutorial.platform;
      this.articleLoaded = true;
    }
    this.emitChange();
  }
  
  handleArticleLoaded(payload) {
    this.platform = payload.platform;
    this.articleLoaded = payload.articleLoaded;
    this.emitChange();
  }
  
  getState() {
    return {
      quickstarts: this.quickstarts,
      appType: this.appType,
      platform: this.platform,
      article: this.article,
      articleLoaded: this.articleLoaded
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
    this.articleLoaded = state.articleLoaded;
  }
  
}

TutorialStore.storeName = 'TutorialStore';
TutorialStore.handlers = {
  'ARTICLE_LOADED': 'handleArticleLoaded',
  'LOAD_TUTORIAL_NAVIGATOR': 'handleTutorialNavigatorLoaded',
  'LOAD_SETTINGS': 'handleSettingsLoaded'
};

export default TutorialStore;
