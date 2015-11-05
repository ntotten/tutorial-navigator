import React from 'react';
import TutorialStore from '../stores/tutorial-store';
import ArticleStore from '../stores/article-store';
import TutorialNavigator from '../components/tutorial-navigator';
import Breadcrumbs from '../components/breadcrumbs';
import { getPlatformName, getTechTitle } from '../util/tutorials';
import Tutorial from '../components/tutorial';
import { connectToStores, provideContext } from 'fluxible-addons-react';

class NavigatorAndTutorialView extends React.Component{
  render(){
    var view = <TutorialNavigator {...this.props} componentLoadedInBrowser={this.props.quickstartLoadedInBrowser}></TutorialNavigator>;
    if (this.props.articleLoaded){
      view = (<TutorialView {...this.props}></TutorialView>);
    }
    return view;
  }
}

NavigatorAndTutorialView.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

NavigatorAndTutorialView = provideContext(connectToStores(NavigatorAndTutorialView, [TutorialStore], (context, props) => {
  return context.getStore(TutorialStore).getState();
}));

class TutorialView extends React.Component{
  render(){
    var title1 = getTechTitle(this.props.quickstart, this.props.appType, this.props.tech1);
    var title2 = '';
    var pageTitle = title1;
    var hasTutorial2 = this.props.tech2 && this.props.tech2 !== 'no-api';
    var tutorial2Tab;

    if (hasTutorial2) {
      title2 = getTechTitle(this.props.quickstart, 'backend', this.props.tech2);
      pageTitle += ' + ' + title2;
      tutorial2Tab = (
        <Tutorial tabName="tutorial-2" appType="backend" tech={this.props.tech2} componentLoadedInBrowser={this.props.tutorialLoadedInBrowser}  />
      );
    }

      return (
        <div id="tutorial-template" className="docs-single animated fadeIn">
          <div className="navigation-bar">
            <div className="wrapper">
              <div className="container">
                <Breadcrumbs {...this.props} />
              </div>
            </div>
          </div>
          <div className="js-doc-template container">
            <div className="row">
                <div className="docs-content">
                  <h1 className="tutorial-title">{pageTitle}</h1>
                  <ul className={'nav nav-tabs' + (hasTutorial2 ? '' : ' hide')}>
                    <li className="active"><a href="#tutorial-1" data-toggle="tab">{title1}</a></li>
                    <li><a href="#tutorial-2" data-toggle="tab">{title2}</a></li>
                  </ul>
                  <div className="tab-content">
                    <Tutorial tabName="tutorial-1"
                      default={true}
                      appType={this.props.appType}
                      tech={this.props.tech1}
                      componentLoadedInBrowser={this.props.tutorialLoadedInBrowser} />
                    {tutorial2Tab}
                  </div>
                </div>
                <div id="try-banner">
                  <div className="try-banner">
                    <span>Try Auth0 for FREE</span>
                    <a href="javascript:signup()" className="btn btn-success btn-lg">Create free Account</a>
                  </div>
                </div>
              </div>
            </div>
      </div>);
  }
}

TutorialView.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

TutorialView = provideContext(connectToStores(TutorialView, [TutorialStore], (context, props) => {
  return context.getStore(TutorialStore).getState();
}));

export default NavigatorAndTutorialView;
