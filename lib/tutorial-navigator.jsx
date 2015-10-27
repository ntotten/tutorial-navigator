/** @jsx React.DOM */
var Q = require('q');
var Breadcrumbs = require('./breadcrumb');
var QuickstartList = require('./quickstartlist');
var TechList = require('./techlist');
var Tutorial = require('./tutorial');

var TutorialNavigator = React.createClass({
  updateTutorial: function(change) {
    this.setState(change);
  },
  handleSkip: function() {
    this.triggerNavigation(this.state.appType, this.state.tech1, 'no-api');
  },
  getInitialState: function () {
    return {
      question: "Getting started? Try our quickstarts.",
      appType: null,
      options: null,
      skippable: null,
      tech1: null,
      tech2: null,
      tutorialUrls: [],
      showTutorial: false,
      path: '',
      docsDomain: this.props.docsDomain || '',
      basePath: this.props.basePath || '',
      clientID: (this.props.userTenants && this.props.userTenants.length > 0) ? this.props.userTenants[0].clients[0].clientID : null
    };
  },
  getQuestion: function(platformType) {
    var questions = {
      "spa": "What technology will you use in the FrontEnd?",
      "native-mobile": "Select a native SDK",
      "webapp": "What technology are you using for your WebApp?",
      "hybrid": "Select a Hybrid SDK",
      "backend": "Select an API or Backend platform"
    };

    return questions[platformType];
  },
  getOptions: function(platformType) {
    if(!platformType || !this.state.platforms) {
      return false;
    }

    var options = {
      "spa": this.state.platforms.clientPlatforms || this.state.platforms.client_platforms,
      "native-mobile": this.state.platforms.nativePlatforms || this.state.platforms.native_platforms,
      "webapp": this.state.platforms.serverPlatforms || this.state.platforms.server_platforms,
      "hybrid": this.state.platforms.hybridPlatforms || this.state.platforms.hybrid_platforms,
      "backend": this.state.platforms.serverApis || this.state.platforms.server_apis
    };

    return options[platformType];
  },
  getTechName: function(platformType, tech) {
    var collection = this.getOptions(platformType);

    var result = collection.filter(function(e){ return e.name == tech; });

    if(collection && result.length) {
      return result[0].title;
    }
  },
  getPlatformPath: function(platformType) {
    var paths = {
      "spa": "client-platforms",
      "native-mobile": "native-platforms",
      "webapp": "server-platforms",
      "hybrid": "native-platforms",
      "backend": "server-apis"
    };

    return '/' + paths[platformType] + '/';
  },
  componentDidUpdate: function() {
    if (this.props.onTutorialUpdate){
      return this.props.onTutorialUpdate(this.state);
    }
  },
  componentWillMount: function() {
    var component = this;
    this.getPlaforms();

    var basePath = component.props.basePath;

    if (component.props.routing && page){
      page(basePath + '/', function() {
        component.setState(component.getInitialState());
      });

      page(basePath + '/quickstart/', function() {
        component.setState(component.getInitialState());
      });

      page(basePath + '/quickstart/:apptype?', function(ctx) {
        component.appTypeChange(ctx.params.apptype);
      });

      page(basePath + '/quickstart/:apptype/:platform?', function(ctx) {
        component.platformChange(ctx.params.apptype, ctx.params.platform);
      });

      page(basePath + '/quickstart/:apptype/:platform/:api?', function(ctx) {
        component.apiChange(ctx.params.apptype, ctx.params.platform, ctx.params.api);
      });

      page();
    }

    if (component.props.selectedTutorial){
      component.triggerNavigation(component.props.selectedTutorial.apptype, component.props.selectedTutorial.platform, component.props.selectedTutorial.serverApi);
    }
  },
  getPlaforms: function(){
    if (this.props.platforms) {
        var deferred = Q.defer();
        deferred.resolve(this.props.platforms);
        return deferred.promise.then(this.setPlatformState.bind(this));
    }

    return this.props.platformsFetchFn().then(this.setPlatformState.bind(this));
  },
  setPlatformState: function(data){
    this.setState({ platforms : data });
  },
  getTenantSwitcher: function() {
    if(!this.props.userTenants || this.props.userTenants.length < 2) {
      return false;
    }

    return (
      <TenantSwitcher tenants={this.props.userTenants} updateTutorial={this.updateTutorial} tutorial={this.state} />
    );
  },
  appTypeChange: function(appType){
    this.setState({
      question: this.getQuestion(appType),
      options: appType,
      appType: appType,
      path: '/quickstart/' + appType,
      tutorialUrls: [],
      skippable: false,
      tech1: null,
      tech2: null,
      showTutorial: false
    });
  },
  platformChange: function(appType, platform){
    var platformPath = this.getPlatformPath(appType);

    if(appType !== 'backend' && appType !== 'webapp') {
      this.setState({
        options: 'backend',
        appType: appType,
        question: "Will you use a Backend or API with your application?",
        skippable: true,
        tech1: platform,
        tech2: null,
        path: '/quickstart/' + appType + [platformPath + platform],
        tutorialUrls: [platformPath + platform],
        showTutorial: false
      });
    } else {
      this.setState({
        options: null,
        appType: appType,
        question: null,
        skippable: false,
        tech1: platform,
        tech2: null,
        path: '/quickstart/' + appType + [platformPath + platform],
        tutorialUrls: [platformPath + platform],
        showTutorial: true,
        noApi: null
      });
    }
  },
  apiChange: function(appType, platform, api){
    var platformPath = this.getPlatformPath(appType);
    var tech2 = api;
    var tutorialUrls = [platformPath + platform, '/server-apis/' + api];
    var noApi = null;

    if(api === 'no-api') {
      tech2 = null;
      tutorialUrls = [platformPath + platform]
      noApi = true;
    }

    this.setState({
      options: 'backend',
      appType: appType,
      skippable: false,
      tech1: platform,
      tech2: tech2,
      path: '/quickstart/' + appType + [platformPath + platform, '/server-apis/' + api],
      tutorialUrls: tutorialUrls,
      showTutorial: true,
      noApi: noApi
    });
  },
  triggerNavigation: function(appType, platform, api){
    var useRouter = this.props.routing && page,
        basePath = this.props.basePath;;

    if (!api) {
      if (!platform) {
        if (!appType){
          return useRouter ? page(basePath + '/quickstart/') : this.setState(this.getInitialState());
        }

        return useRouter ? page(basePath + '/quickstart/' + appType) : this.appTypeChange(appType);
      }

      return useRouter ? page(basePath + '/quickstart/' + appType + '/' + platform) : this.platformChange(appType, platform);
    }

    return useRouter ? page(basePath + '/quickstart/' + appType + '/' + platform + '/' + api) : this.apiChange(appType, platform, api);
  },
  render: function() {
    var hasMoreTenants = this.props.userTenants && this.props.userTenants.length > 1;
    var appTypes = this.state.platforms ? (this.state.platforms.apptypes || this.state.platforms.app_types) : [];

    return (
      <div className={(this.state.showTutorial) ? 'js-tutorial-navigator is-result' : 'js-tutorial-navigator'}>
        <div className="banner tutorial-wizard">
          <div className="container">
            <h1>Documentation</h1>

            <p className={(hasMoreTenants && !this.state.appType) ? 'hide' : 'question-text'}>{this.state.question}</p>

            {this.getTenantSwitcher()}

            <button href="#" data-skip onClick={this.handleSkip} className={(this.state.skippable) ? '' : 'hide' }>No, skip this</button>
            <br />
            <Breadcrumbs tutorial={this.state} getTechName={this.getTechName} onItemClick={this.triggerNavigation}  />
          </div>

          <QuickstartList onQuickstartListLoading={this.props.onQuickstartListLoading} onQuickstartListLoaded={this.props.onQuickstartListLoaded} quickstarts={appTypes} getQuestion={this.getQuestion} tutorial={this.state} onItemClick={this.triggerNavigation} />
          <TechList getOptions={this.getOptions} tutorial={this.state} onItemClick={this.triggerNavigation} />
        </div>

        <div className="tutorial-content">
          <Tutorial
            key={this.state.showTutorial}
            tutorial={this.state}
            getTechName={this.getTechName}
            template={this.props.singleTpl}
            onLoad={this.props.onTutorialLoad}
            onReset={this.props.onTutorialReset}
            onItemClick={this.triggerNavigation}
            />
        </div>

      </div>
    );
  }
});

module.exports = TutorialNavigator;
