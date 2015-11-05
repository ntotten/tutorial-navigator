import { BaseStore } from 'fluxible/addons';

class TutorialStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.baseUrl = '';
    this.appType = null;
    this.tech1 = null;
    this.tech2 = null;
    this.quickstart = null;
    this.articleLoaded = false;
  }
  handleTutorialNavLoaded(payload) {
    this.appType = payload.appType;
    this.tech1 = payload.tech1;
    this.tech2 = payload.tech2;
    this.articleLoaded = payload.articleLoaded || false;
    this.emitChange();
  }
  handleSettingsLoaded(payload) {
    this.quickstart = payload.quickstart;
    this.baseUrl = payload.baseUrl;

    if (payload.selectedTutorial){
      this.appType = payload.selectedTutorial.appType;
      this.tech1 = payload.selectedTutorial.tech1;
      this.tech2 = payload.selectedTutorial.tech2;
      this.articleLoaded = true;
    }
    this.emitChange();
  }
  handleArticleSelected(payload){
    this.tech2 = payload.tech2;
    this.articleLoaded =  payload.articleLoaded;
    this.emitChange();
  }
  getState() {
    return {
      baseUrl: this.baseUrl,
      appType: this.appType,
      tech1: this.tech1,
      tech2: this.tech2,
      quickstart: this.quickstart,
      articleLoaded: this.articleLoaded
    };
  }
  getQuickstart() {
    return this.quickstart;
  }
  getBaseUrl(){
    return this.baseUrl;
  }
  dehydrate() {
    return this.getState();
  }
  rehydrate(state) {
    this.baseUrl = state.baseUrl,
    this.appType = state.appType;
    this.tech1 = state.tech1;
    this.tech2 = state.tech2;
    this.articleLoaded = state.articleLoaded;
    this.quickstart = state.quickstart;
  }
}

TutorialStore.storeName = 'TutorialStore';
TutorialStore.handlers = {
  'ARTICLE_LOADED': 'handleArticleSelected',
  'LOAD_TUTORIAL_NAVIGATOR': 'handleTutorialNavLoaded',
  'LOAD_SETTINGS': 'handleSettingsLoaded'
};

export default TutorialStore;
