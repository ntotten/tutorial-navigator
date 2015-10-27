var Breadcrumbs = require('./breadcrumb');
var JSONP  = require('jsonp');
var Q = require('q');
var Tutorial = React.createClass({
  getInitialState: function() {
    return {
      content1: null,
      content2: null,
      ready: false
    };
  },
  getParam: function(appType) {
    var options = {
      "spa": "frontend",
      "native-mobile": "mobile",
      "webapp": "backend",
      "hybrid": "hybrid",
      "backend": "api"
    };

    return options[appType];
  },
  setUrlParams: function(url) {
    var tutorial = this.props.tutorial;
    var url = url;

    url += '&' + this.getParam(tutorial.appType) + '=' + tutorial.tech1;

    if(tutorial.tech2) {
      url += '&api=' + tutorial.tech2;
    }

    if(tutorial.clientID) {
      url += '&a=' + tutorial.clientID;
    }

    return url;
  },
  fetchDocument: function(url, toUpdate, jsonp) {
    var tutorial = this.props.tutorial;
    var deffered = Q.defer();
    var baseUrl = tutorial.docsDomain || '';
    var prefix = tutorial.basePath || '';
    var uri = this.setUrlParams(baseUrl + prefix + url + '?e=1');

    JSONP(uri, { name: jsonp }, function(err, data){
      if (err){
        return console.log(err);
      }

      deffered.resolve(data);
    });

    return deffered.promise;
  },
  getBreadcrumbs: function() {
    return this.refs.breadcrumbs.getDOMNode().cloneNode(true);
  },
  getTitle: function(state) {
    var tutorial = this.props.tutorial;
    var title1 = this.props.getTechName(tutorial.appType, tutorial.tech1);
    var title2 = '';
    var title = title1 + ' Tutorial';

    if(state.content1 && state.content2) {
      title2 = this.props.getTechName('backend', tutorial.tech2);
      title = title1 + ' + ' + title2;
    }

    return {
      tutorial: title,
      tech1: title1,
      tech2: title2
    };
  },
  updateTemplate: function(state) {
    var template = this.props.template;
    var tutorial = this.props.tutorial;
    var titles = this.getTitle(state);

    if (template.querySelector('.tutorial-title') != null){
      template.querySelector('.tutorial-title').textContent = titles.tutorial;
    }

    if (template.querySelector('.breadcrumbs') != null){
      template.querySelector('.breadcrumbs').outerHTML = this.getBreadcrumbs().outerHTML;
    }

    if(state.content1) {
      template.querySelector('#tutorial-1').innerHTML = state.content1;
      var lis = template.querySelectorAll('.nav-tabs li')
      if (lis.length > 0){
        lis[0].querySelector('a').innerText = titles.tech2;
      }
    }

    if(state.content2) {
      template.querySelector('#tutorial-2').innerHTML = state.content2;
      var lis = template.querySelectorAll('.nav-tabs li')
      if (lis.length > 1){
        lis[1].querySelector('a').innerText = titles.tech2;
      }
    }

    // Remove duplicate titles
    [].forEach.call(template.querySelectorAll('.tab-pane h1:first-child, .tab-pane h2:first-child'), function(el) {
      el.parentNode.removeChild(el);
    });

    template.querySelector('.nav-tabs').classList.toggle('hide');
    var tabs = template.querySelector('.tab-pane');

    [].forEach.call(tabs, function(tab) {
      tab.classList.remove('active');
    });

    if (tabs.length > 0 && tabs[0].classList.indexOf('active') === -1){
      tabs[0].classList.add('active');
    }

    template.classList.remove('hide');

    if (this.props.onLoad){
      this.props.onLoad(template);
    }
  },
  emptyTemplate: function(template) {
    if (template.querySelector('.tab-pane, .nav-tabs li a, .tutorial-title, .sidebar-sbs ul') !== null){
      template.querySelector('.tab-pane, .nav-tabs li a, .tutorial-title, .sidebar-sbs ul').innerHTML =  '';
    }
  },
  resetTemplate: function(template) {
    if (template.className.indexOf('hide') == -1){
      template.className += ' hide';
    }

    this.emptyTemplate(template);
    if (this.props.onReset) {
      this.props.onReset(template);
    }
  },
  onReady: function(result) {
    var content1 = result[0];
    var content2 = result[1];

    if(!content2.html) {
      this.setState({
        ready: true,
        content1: content1.html
      });

      return this.updateTemplate(this.state);
    }

    if(content1 && content2) {
      this.setState({
        ready: true,
        content1: content1.html,
        content2: content2.html
      });

      return this.updateTemplate(this.state);
    }
  },
  componentDidMount: function() {
    var tutorial = this.props.tutorial;

    this.resetTemplate(this.props.template);

    if(!tutorial.showTutorial) {
      return;
    }

    if(tutorial.tutorialUrls.length > 1) {
      return Q.all([
        this.fetchDocument(tutorial.tutorialUrls[0], 'content1', '__a0tn1'),
        this.fetchDocument(tutorial.tutorialUrls[1], 'content2', '__a0tn2')
      ]).then(this.onReady);
    }

    return Q.all([
      this.fetchDocument(tutorial.tutorialUrls[0], 'content1', '__a0tn1')
    ]).then(this.onReady);

  },
  render: function() {
    return (
      <div>
        <div className="hide">
          <Breadcrumbs ref="breadcrumbs" tutorial={this.props.tutorial} getTechName={this.props.getTechName} onItemClick={this.props.onItemClick}  />
        </div>
        <div className={(!this.state.ready) ? 'loading-tutorial' : 'hide' }>
          <div className="auth0-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Tutorial;
