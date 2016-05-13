import React from 'react';
import Platform from './platform';

class PlatformList extends React.Component {
  
  render() {
    let {appType, platforms, onDocumentLoaded, customNavigationAction} = this.props;
    
    let items = Object.keys(platforms).map((name, i) => (
      <Platform
        key={appType + i}
        delay={20 * i}
        appType={appType}
        platform={platforms[name]}
        onDocumentLoaded={onDocumentLoaded}
        customNavigationAction={customNavigationAction}/>
    ));

    return (
      <div className="container techlist">
        <ul className="circle-list">{items}</ul>
      </div>
    );
  }
  
}

PlatformList.propTypes = {
  platforms: React.PropTypes.object,
  appType: React.PropTypes.string,
  onDocumentLoaded: React.PropTypes.func,
  customNavigationAction: React.PropTypes.func
};

export default PlatformList;
