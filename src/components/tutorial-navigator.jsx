//import TenantSwitcher from './TenantSwitcher';
import React from 'react';
import Breadcrumbs from './breadcrumbs';
import QuickstartList from './quickstart-list';
import TechList from './tech-list';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import loadArticleAction from '../action/load-article-action';
import { getQuestion } from '../util/tutorials';
import TutorialStore from '../stores/tutorial-store';

class TutorialNavigator extends React.Component {
  handleSkip() {
    var action = this.props.customNavigationAction || loadArticleAction;
    this.context.executeAction(action, {
      appType: this.props.appType,
      tech1: this.props.tech1,
      currentTech: this.props.tech1,
      tech2: 'no-api',
    });
  }
  getTenantSwitcher() {
    if(!this.props.userTenants || this.props.userTenants.length < 2) {
      return false;
    }

    return (
      <TenantSwitcher />
    );
  }
  render() {
    var hasMoreTenants = this.props.userTenants && this.props.userTenants.length > 1;

    var picker;
    if (this.props.appType) {
      picker = (<TechList {...this.props} />);
    } else {
      picker = (<QuickstartList {...this.props} />);
    }

    var appType = this.props.appType;
    var tech1 = this.props.tech1;
    var skippable = false;
    var question = getQuestion(this.props.appType);
    if (appType && tech1) {
      if (appType === 'native-mobile') {
        skippable = true;
      } else if (appType === 'spa') {
        skippable = true;
      } else if (appType === 'hybrid') {
        skippable = true;
      }
      question = getQuestion('backend');
    }

    return (
      <div id="tutorial-navigator">
        <div className='js-tutorial-navigator'>
          <div className="banner tutorial-wizard">
            <div className="container">
              <h1>Documentation</h1>

              <p className={(hasMoreTenants && !this.props.appType) ? 'hide' : 'question-text'}>{question}</p>

              {this.getTenantSwitcher()}

              <button href="#" data-skip onClick={this.handleSkip.bind(this)}
                className={(skippable) ? '' : 'hide' }>No, skip this</button>
              <br />
              <Breadcrumbs {...this.props} customNavigationAction={this.props.customNavigationAction} />

            </div>

            {picker}

          </div>
        </div>
      </div>
    );
  }
}

TutorialNavigator.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func,
};

TutorialNavigator = connectToStores(TutorialNavigator, [TutorialStore], (context, props) => {
  return context.getStore(TutorialStore).getState();
});


export default TutorialNavigator;
