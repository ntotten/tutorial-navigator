var $ = require('jquery');
var jsonp = require('jsonp').get;
var Q = require('Q');
var Dispatcher = require('flux').Dispatcher;
// var tnpackage = require('../../build/tutorial-navigator.standalone');
//
// var TutorialNavigator = tnpackage.TutorialNavigator;
// var TutorialStore = tnpackage.TutorialStore;
// var ArticleStore = tnpackage.ArticleStore;
// var loadSettingsAction = tnpackage.loadSettingsAction;
// var Dispatcher = tnpackage.Dispatcher;
// var articleService = tnpackage.articleService;
// var NavigatorAndTutorialView = tnpackage.NavigatorAndTutorialView;

var dispatcher = new Dispatcher();

var stores = [];
stores[TutorialStore.name] = new TutorialStore(dispatcher);
stores[ArticleStore.name] = new ArticleStore(dispatcher);

dispatcher.register(function(payload){
  var list = [TutorialStore, ArticleStore];
  for (var i = 0; i < list.length; i++) {
    var store = list[i];
    for (var handler in store.handlers) {
      if (handler === payload.event){
        stores[store.name][store.handlers[handler]](payload);
      }
    }
  }
})

var context = {
  _dispatcher: dispatcher,
  dispatch: function(type, payload){
    payload['event'] = type;
    this._dispatcher.dispatch(payload);
  },
  getStore: function(Store){
    return stores[Store.name];
  },
  executeAction: function(action, payload, done){
    if (!done){
      done = function(){};
    }
    return action(context, payload, done);
  },
  getService: function(serviceName){
    return {
      loadArticle : loadArticle
    }
  }
};

var opts = {
    baseUrl : 'http://auth0.com/docs',
    clientId : client,
    quickstart : {
      apptypes : data.app_types,
      clientPlatforms : data.client_platforms,
      hybridPlatforms : data.hybrid_platforms,
      nativePlatforms : data.native_platforms,
      serverApis : data.server_apis,
      serverPlatforms : data.server_platforms
    }
};

loadSettingsAction(context, opts);

if (selectedTutorial && selectedTutorial.appType && selectedTutorial.tech1 && selectedTutorial.tech2){
  loadArticleAction(context, selectedTutorial);
}

React.render(
    React.createElement(NavigatorAndTutorialView, { context : context }),
    $('#app').get(0)
);
