import React from 'react';
import QuickstartList from './quickstart-list';
import PlatformList from './platform-list';
import TutorialStore from '../stores/tutorial-store';
import {connectToStores} from 'fluxible-addons-react';

class TutorialNavigator extends React.Component {
  
  render() {
    
    let {quickstarts, quickstart} = this.props;

    let picker = undefined;
    let question = undefined;
    if (quickstart) {
      picker = <PlatformList quickstart={quickstart} {...this.props} />;
      question = quickstart.question;
    }
    else {
      picker = <QuickstartList quickstarts={quickstarts} {...this.props} />;
      question = "Getting started? Try our quickstarts."
    }
    
    return (
      <div id="tutorial-navigator">
        <div className='js-tutorial-navigator'>
          <div className="banner tutorial-wizard">
            <div className="container">
              <h1>Documentation</h1>
              <p className='question-text'>{question}</p><br/>
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
  quickstart: React.PropTypes.object
}

TutorialNavigator = connectToStores(TutorialNavigator, [TutorialStore], (context, props) => {
  let store = context.getStore(TutorialStore);
  return {
    quickstarts: store.getQuickstarts(),
    quickstart: store.getCurrentQuickstart()
  };
});


export default TutorialNavigator;
