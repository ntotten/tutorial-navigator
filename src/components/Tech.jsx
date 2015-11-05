import React from 'react';
import navigateAction from '../action/navigate-action';
import loadArticleAction from '../action/load-article-action';
import Q from 'q';

class Tech extends React.Component {
  handleClick(tech) {
    var action;
    var payload = { appType: this.props.appType, baseUrl : this.props.baseUrl || ''};
    if(this.props.tech1) {
      payload.tech1 = this.props.tech1;
      payload.tech2 = tech.name;
      payload.currentTech = this.props.tech1;
      if (this.props.customNavigationAction){
          this.context.executeAction(this.props.customNavigationAction, payload);
      } else {
        var promises = [];
        if (this.props.tech2 !== 'no-api'){
          promises.push(this.context.executeAction(loadArticleAction, {
             appType: 'backend',
             tech1: this.props.tech1,
             tech2: tech.name,
             currentTech: tech.name,
             baseUrl : this.props.baseUrl || ''
           }));
         }

         promises.push(this.context.executeAction(loadArticleAction, payload));
         return Q.when(promises);
      }
    } else {
      payload.tech1 = tech.name;
      action = this.props.customNavigationAction || navigateAction;
      this.context.executeAction(action, payload);
    }
  }
  render() {
    var tech = this.props.tech;
    var style = {
      animationDelay: this.props.delay + 'ms',
      WebkitAnimationDelay: this.props.delay + 'ms',
      animationDuration: '200ms',
      WebkitAnimationDuration: '200ms',
      animationTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      WebkitAnimationTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
    };

    return (
      <li className='animated scaleIn' style={style}>
        <div data-name={tech.name} className='circle-logo' onClick={this.handleClick.bind(this, tech)}>
          <div className='logo'></div>
          <div className='title'>{tech.title}</div>
        </div>
      </li>
    );
  }
}

Tech.contextTypes = {
  executeAction: React.PropTypes.func,
};

export default Tech;
