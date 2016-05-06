import React from 'react';
import navigateAction from '../action/navigate-action';

class Quickstart extends React.Component {
  
  handleClick(quickstart) {
    let action = this.props.customNavigationAction || navigateAction;
    this.context.executeAction(action, {appType: quickstart.name});
  }

  render() {
    var quickstart = this.props.model;
    return (
      <div className="quickstart" data-type={quickstart.name} onClick={this.handleClick.bind(this, quickstart)}>
        <div className="symbol"></div>
        <strong className="title">{quickstart.title}</strong>
        <p className="description">{quickstart.description}</p>
        <p className="sample">{quickstart.example}</p>
        <div className="cta">
          <button className="btn btn-success btn-sm">Launch Quickstart</button>
        </div>
      </div>
    );
  }
  
}

Quickstart.propTypes = {
  model: React.PropTypes.object
}

Quickstart.contextTypes = {
  executeAction: React.PropTypes.func,
};

export default Quickstart;
