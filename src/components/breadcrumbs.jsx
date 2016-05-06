import React from 'react';
import { getPlatformName, getTechTitle } from '../util/tutorials';
import navigateAction from '../action/navigate-action';
import TutorialStore from '../stores/tutorial-store';
import { connectToStores } from 'fluxible-addons-react';

class Breadcrumbs extends React.Component {
  
  navigate(params) {
    var action = this.props.customNavigationAction || navigateAction;
    this.context.executeAction(action, {
      appType: params.appType,
      platform: params.platform
    });
  }
  
  render() {
    let crumbs = [];
    let {quickstart, appType, platform} = this.props;
    
    if (!appType) {
      return <div/>;
    }
    
    if (appType) {
      crumbs.push(
        <a key="base" onClick={this.navigate.bind(this, {})}>
          <span className="text">Documentation</span>
        </a>
      );
      crumbs.push(
        <a key="apptype" onClick={this.navigate.bind(this, {appType})}>
          <i className="icon-budicon-461"></i><span className="text">{getPlatformName(appType)}</span>
        </a>
      );
    }

    if (platform) {
      crumbs.push(
        <a key="platform" onClick={this.navigate.bind(this, {appType, platform})}>
          <i className="icon-budicon-461"></i><span className="text">{getTechTitle(quickstart, appType, platform)}</span>
        </a>
      );
    }

    return <div className="breadcrumbs">{crumbs}</div>;
  }
  
}

Breadcrumbs.propTypes = {
  appType: React.PropTypes.string,
  platform: React.PropTypes.string,
  customNavigationAction: React.PropTypes.func
}

Breadcrumbs.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func,
};

Breadcrumbs = connectToStores(Breadcrumbs, [TutorialStore], (context, props) => {
  return context.getStore(TutorialStore).getState();
});

export default Breadcrumbs;
