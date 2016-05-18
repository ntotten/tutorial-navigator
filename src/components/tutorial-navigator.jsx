import React from 'react';
import Breadcrumbs from './breadcrumbs';
import QuickstartList from './quickstart-list';
import PlatformList from './platform-list';
import { connectToStores } from 'fluxible-addons-react';
import loadArticleAction from '../action/load-article-action';
import TutorialStore from '../stores/tutorial-store';

class TutorialNavigator extends React.Component {
  
  render() {
    
    let {quickstarts, appType} = this.props;

    let picker;
    if (appType) {
      let platforms = quickstarts[appType].platforms;
      picker = <PlatformList quickstart={quickstarts[appType]} platforms={platforms} {...this.props} />;
    }
    else {
      picker = <QuickstartList quickstarts={quickstarts} {...this.props} />;
    }
    
    let question;
    if (quickstarts && appType) {
      question = quickstarts[appType].question;
    }
    else {
      question = "Getting started? Try our quickstarts."
    }

    return (
      <div id="tutorial-navigator">
        <div className='js-tutorial-navigator'>
          <div className="banner tutorial-wizard">
            <div className="container">
              <h1>Documentation</h1>
              <p className='question-text'>{question}</p><br/>
              <Breadcrumbs {...this.props} />
            </div>
            {picker}
          </div>
        </div>
      </div>
    );
  }
  
}

TutorialNavigator.propTypes = {
  quickstarts: React.PropTypes.object,
  appType: React.PropTypes.string
}

TutorialNavigator = connectToStores(TutorialNavigator, [TutorialStore], (context, props) => {
  return context.getStore(TutorialStore).getState();
});


export default TutorialNavigator;
