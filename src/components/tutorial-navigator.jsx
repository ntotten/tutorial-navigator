import React from 'react';
import Breadcrumbs from './breadcrumbs';
import QuickstartList from './quickstart-list';
import PlatformList from './platform-list';
import { connectToStores } from 'fluxible-addons-react';
import loadArticleAction from '../action/load-article-action';
import { getQuestion } from '../util/tutorials';
import TutorialStore from '../stores/tutorial-store';

class TutorialNavigator extends React.Component {
  
  render() {
    
    let {appType, platform} = this.props;

    let picker;
    if (appType) {
      picker = <PlatformList {...this.props} />;
    }
    else {
      picker = <QuickstartList {...this.props} />;
    }

    return (
      <div id="tutorial-navigator">
        <div className='js-tutorial-navigator'>
          <div className="banner tutorial-wizard">
            <div className="container">
              <h1>Documentation</h1>
              <p className='question-text'>{getQuestion(appType)}</p><br/>
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
  appType: React.PropTypes.string,
  platform: React.PropTypes.string
}

TutorialNavigator = connectToStores(TutorialNavigator, [TutorialStore], (context, props) => {
  return context.getStore(TutorialStore).getState();
});


export default TutorialNavigator;
