var Breadcrumbs = React.createClass({
  getAppTypeName: function(appType) {
    var options = {
      "spa": "Single Page App",
      "native-mobile": "Native Mobile App",
      "webapp": "Regular Web Application",
      "hybrid": "Hybrid Mobile App",
      "backend": "Backend/API"
    };

    return options[appType];
  },
  getPageTitle: function(appType, tech1, tech2) {
    var pageTitle = window.SITE_TITLE || document.title.split('-')[0].trim();
    if (appType && tech1 && tech2) {
      pageTitle += ' - Getting started with ' + this.props.getTechName(appType, tech1) + ' and ' + this.props.getTechName('backend', tech2);
    } else if (appType && tech1) {
      pageTitle += ' - ' + this.props.getTechName(appType, tech1) + ' Quickstarts';
    } else if (appType) {
      pageTitle += ' - ' + this.getAppTypeName(appType) + ' Quickstarts';
    }
    return pageTitle;
  },
  handleClick: function(appType, tech1) {
    if (!appType){
      if (!tech1){
        return this.props.onItemClick();
      }

      return this.props.onItemClick(appType);
    }

    return this.props.onItemClick(appType, tech1);
  },
  render: function() {
    var list = [];
    var tutorial = this.props.tutorial;

    if(tutorial.appType) {
      list.push(<a onClick={this.handleClick.bind(this, null)}><span className="text">Documentation</span></a>);
      list.push(<a onClick={this.handleClick.bind(this, null)}><i className="icon-budicon-461"></i><span className="text">{this.getAppTypeName(tutorial.appType)}</span></a>);
    } else {
      return (<div></div>);
    }

    if(tutorial.tech1) {
      list.push(<a onClick={this.handleClick.bind(this, tutorial.appType)}><i className="icon-budicon-461"></i><span className="text">{this.props.getTechName(tutorial.appType, tutorial.tech1)}</span></a>);
    }

    if(tutorial.tech2) {
      list.push(<a onClick={this.handleClick.bind(this, tutorial.appType, tutorial.tech1)}><i className="icon-budicon-461"></i><span className="text">{this.props.getTechName('backend', tutorial.tech2)}</span></a>);
    }

    document.title = this.getPageTitle(tutorial.appType, tutorial.tech1, tutorial.tech2);
    return (<div className="breadcrumbs">{list}</div>);
  }
});

module.exports = Breadcrumbs;
