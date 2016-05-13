import React from 'react';
import _ from 'lodash';

class TutorialTableOfContents extends React.Component {
  
  handleClick(article) {
    // TODO
  }
  
  render() {
    let {platform, selectedArticle} = this.props;
    
    let items = platform.articles.map(article => {
      let selected = (article.name == selectedArticle) ? 'selected ' : '';
      return <li className={selected + "toc-article"} onClick={this.handleClick.bind(this, article)}>
        {article.name}
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
  platform: React.PropTypes.object,
  selectedArticle: React.PropTypes.string
}

export default TutorialTableOfContents;
