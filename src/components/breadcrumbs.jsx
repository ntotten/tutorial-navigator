import React from 'react';
import { getPlatformName, getTechTitle } from '../util/tutorials';
import navigateAction from '../action/navigate-action';
import TutorialStore from '../stores/tutorial-store';
import { connectToStores } from 'fluxible-addons-react';
import _ from 'lodash';

class Breadcrumbs extends React.Component {
  
  navigate(params) {
    let {customNavigationAction} = this.props;
    var action = customNavigationAction || navigateAction;
    this.context.executeAction(action, {
      appType: params.appType,
      platform: params.platform,
      article: params.article
    });
  }
  
  render() {
    let crumbs = [];
    let {quickstarts, appType, platform, article} = this.props;
    
    if (!appType) {
      return <div/>;
    }
    
    if (appType) {
      let title = quickstarts[appType].title;
      crumbs.push(
        <a key="base" onClick={this.navigate.bind(this, {})}>
          <span className="text">Documentation</span>
        </a>
      );
      crumbs.push(
        <a key="apptype" onClick={this.navigate.bind(this, {appType})}>
          <i className="icon-budicon-461"></i><span className="text">{title}</span>
        </a>
      );
    }

    if (platform) {
      let meta = quickstarts[appType].platforms[platform];
      
      crumbs.push(
        <a key="platform" onClick={this.navigate.bind(this, {appType, platform, article: meta.articles[0].name})}>
          <i className="icon-budicon-461"></i><span className="text">{meta.title}</span>
        </a>
      );
      
      if (meta.articles.length > 1) {
        let currentArticle = _.find(quickstarts[appType].platforms[platform].articles, {name: article});
        crumbs.push(
          <a key="article" onClick={this.navigate.bind(this, {appType, platform, article})}>
            <i className="icon-budicon-461"></i><span className="text">{currentArticle.title}</span>
          </a>
        );
      }
    }

    return <div className="breadcrumbs">{crumbs}</div>;
  }
  
}

Breadcrumbs.propTypes = {
  appType: React.PropTypes.string,
  platform: React.PropTypes.string,
  article: React.PropTypes.string,
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
