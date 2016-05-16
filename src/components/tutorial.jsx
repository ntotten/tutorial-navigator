import React from 'react';
import ArticleStore from '../stores/article-store';
import { connectToStores } from 'fluxible-addons-react';

class Tutorial extends React.Component {
  
  componentDidMount () {
    this.initClient();
  }
  
  componentDidUpdate() {
    this.initClient();
  }
  
  initClient() {
    if (typeof document !== 'undefined') {
      if (this.props.componentLoadedInBrowser){
        this.props.componentLoadedInBrowser.call(this);
      }
      var article = this.refs.article;
      if (article) {
        var child = article.firstChild;
        if (child.nodeName === 'H1' || child.nodeName === 'H2') {
          child.classList.add('hide');
        }
      }
    }
  }
  
  render() {
    let {articleHtml} = this.props;
    
    if (!articleHtml) {
      return <div className='loading-tutorial'>
        <div className='auth0-spinner'>
          <div className='spinner'></div>
        </div>
      </div>;
    }
    
    let markup = {__html: articleHtml};
    return <div ref="article" dangerouslySetInnerHTML={markup} />;
  }
  
}

Tutorial.propTypes = {
  articleHtml: React.PropTypes.string,
  componentLoadedInBrowser: React.PropTypes.func
}

Tutorial = connectToStores(Tutorial, [ArticleStore], (context, props) => ({
  articleHtml: context.getStore(ArticleStore).getArticleHtml(props.appType, props.platform, props.article)
}));

export default Tutorial;
