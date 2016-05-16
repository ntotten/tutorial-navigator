import React from 'react';
import _ from 'lodash';
import {navigateAction} from '../action/navigate-action';

class TutorialTableOfContents extends React.Component {
  
  handleClick(article) {
    let {appType, platform, customNavigationAction} = this.props;
    let action = customNavigationAction || navigateAction;
    this.context.executeAction(action, {
      appType,
      platform: platform.name,
      article
    });
  }
  
  render() {
    let {platform, selectedArticle} = this.props;
    
    let items = platform.articles.map((article, index) => {
      let selected = (article.name == selectedArticle) ? 'selected ' : '';
      return <li key={index} className={selected + "toc-article"} onClick={this.handleClick.bind(this, article.name)}>
        {article.title}
      </li>
    });
    
    return (
      <ul className="toc">
        {items}
      </ul>
    );
  }
  
}

TutorialTableOfContents.propTypes = {
  appType: React.PropTypes.string,
  platform: React.PropTypes.object,
  selectedArticle: React.PropTypes.string,
  customNavigationAction: React.PropTypes.func
}

TutorialTableOfContents.contextTypes = {
  executeAction: React.PropTypes.func
};

export default TutorialTableOfContents;
