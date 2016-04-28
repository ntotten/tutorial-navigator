import React from 'react';
import { getPlatformName, getTechTitle } from '../util/tutorials';
import navigateAction from '../action/navigate-action';
import TutorialStore from '../stores/tutorial-store';
import { connectToStores } from 'fluxible-addons-react';

class Breadcrumbs extends React.Component {
  navigate(params) {
    var action = this.props.customNavigationAction || navigateAction;

    this.context.executeAction(action, {
      appType : params.appType,
      tech1: params.tech1,
      tech2: params.tech2
    });
  }
  render() {
    var list = [];
    var p = this.props;
    if(p.appType) {
      list.push(
        <a key="base" onClick={this.navigate.bind(this, {})}>
          <span className="text">Documentation</span>
        </a>
      );
      list.push(
        <a key="apptype" onClick={this.navigate.bind(this, { appType : this.props.appType })}>
          <i className="icon-budicon-461"></i><span className="text">{getPlatformName(p.appType)}</span>
        </a>
      );
    } else {
      return (<div></div>);
    }

    if(p.tech1) {
      list.push(
        <a key="tech1" onClick={this.navigate.bind(this,  { appType : this.props.appType, tech1: this.props.tech1 })}>
          <i className="icon-budicon-461"></i><span className="text">{getTechTitle(p.quickstart, p.appType, p.tech1)}</span>
        </a>
      );
    }

    if(p.tech2 && p.tech2 !== 'no-api') {
      list.push(
        <a key="tech2"  onClick={this.navigate.bind(this, { appType : this.props.appType, tech1: this.props.tech1, tech2: this.props.tech2 })}>
          <i className="icon-budicon-461"></i><span className="text">{getTechTitle(p.quickstart, 'backend', p.tech2)}</span>
        </a>
      );
    }

    return (<div className="breadcrumbs">{list}</div>);
  }
}


Breadcrumbs.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func,
};

Breadcrumbs = connectToStores(Breadcrumbs, [TutorialStore], (context, props) => {
  return context.getStore(TutorialStore).getState();
});

export default Breadcrumbs;
