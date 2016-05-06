import { BaseStore } from 'fluxible/addons';

class TutorialStore extends BaseStore {
  
  constructor(dispatcher) {
    super(dispatcher);
    this.quickstart = null;
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
    this.quickstart = payload.quickstart;
    let tutorial = payload.selectedTutorial;
    if (tutorial && tutorial.appType && tutorial.tech) {
      this.appType = tutorial.appType;
      this.tech = tutorial.tech;
      this.articleLoaded = true;
    }
    this.emitChange();
  }
  
  handleArticleLoaded(payload){
    this.tech = payload.tech;
    this.articleLoaded = payload.articleLoaded;
    this.emitChange();
  }
  
  getState() {
    return {
      appType: this.appType,
      tech: this.tech,
      quickstart: this.quickstart,
      articleLoaded: this.articleLoaded
    };
  }
  
  getQuickstart() {
    return this.quickstart;
  }
  
  dehydrate() {
    return this.getState();
  }
  
  rehydrate(state) {
    this.appType = state.appType;
    this.tech = state.tech;
    this.articleLoaded = state.articleLoaded;
    this.quickstart = state.quickstart;
  }
  
}

TutorialStore.storeName = 'TutorialStore';
TutorialStore.handlers = {
  'ARTICLE_LOADED': 'handleArticleLoaded',
  'LOAD_TUTORIAL_NAVIGATOR': 'handleTutorialNavigatorLoaded',
  'LOAD_SETTINGS': 'handleSettingsLoaded'
};

export default TutorialStore;
