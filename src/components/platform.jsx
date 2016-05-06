import React from 'react';
//import navigateAction from '../action/navigate-action';
import loadArticleAction from '../action/load-article-action';

class Platform extends React.Component {
  
  handleClick(platform) {
    this.context.executeAction(loadArticleAction, {
      appType: this.props.appType,
      platform: platform.name
    });
  }
  
  getStyle() {
    return {
      animationDelay: this.props.delay + 'ms',
      WebkitAnimationDelay: this.props.delay + 'ms',
      animationDuration: '200ms',
      WebkitAnimationDuration: '200ms',
      animationTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      WebkitAnimationTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
    };
  }
  
  render() {
    var {platform} = this.props;
    return (
      <li className='animated scaleIn' style={this.getStyle()}>
        <div data-name={platform.name} className='circle-logo' onClick={this.handleClick.bind(this, platform)}>
          <div className='logo'></div>
          <div className='title'>{platform.title}</div>
        </div>
      </li>
    );
  }
  
}

Platform.contextTypes = {
  executeAction: React.PropTypes.func,
};

export default Platform;
