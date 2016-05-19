import React from 'react';
import _ from 'lodash';
import {navigateAction} from '../action/navigate-action';

class TutorialTableOfContents extends React.Component {
  
  handleClick(article) {
    let {quickstart, platform, customNavigationAction} = this.props;
    let action = customNavigationAction || navigateAction;
    this.context.executeAction(action, {
      quickstartId: quickstart.name,
      platformId: platform.name,
      articleId: article.name
    });
  }
  
  render() {
    let {platform, currentArticle} = this.props;
    
    let items = platform.articles.map((article, index) => {
      let selected = (article.name == currentArticle.name) ? 'selected ' : '';
      return <li key={index} className={selected + "tutorial-toc-article"} onClick={this.handleClick.bind(this, article)}>
        <span className="tutorial-toc-article-number">{article.number}</span>
        <span className="tutorial-toc-article-title">{article.title}</span>
      </li>
    });
    
    return (
      <div className="tutorial-toc">
        <div className="tutorial-toc-header">Contents</div>
        <ul className="tutorial-toc-articles">
          {items}
        </ul>
      </div>
    );
  }
  
}

TutorialTableOfContents.propTypes = {
  quickstart: React.PropTypes.object,
  platform: React.PropTypes.object,
  currentArticle: React.PropTypes.object,
  customNavigationAction: React.PropTypes.func
}

TutorialTableOfContents.contextTypes = {
  executeAction: React.PropTypes.func
};

export default TutorialTableOfContents;
