import React from 'react';
import Platform from './platform';

class PlatformList extends React.Component {
  
  render() {
    let {quickstarts, appType, onDocumentLoaded, customNavigationAction} = this.props;
    
    let items = quickstarts[appType].platforms.map((platform, i) => {
      return <Platform
        key={appType + i}
        delay={20 * i}
        appType={appType}
        platform={platform}
        onDocumentLoaded={onDocumentLoaded}
        customNavigationAction={customNavigationAction}/>;
    });

    return (
      <div className="container techlist">
        <ul className="circle-list">{items}</ul>
      </div>
    );
  }
  
}

PlatformList.propTypes = {
  quickstarts: React.PropTypes.object,
  appType: React.PropTypes.string,
  onDocumentLoaded: React.PropTypes.func,
  customNavigationAction: React.PropTypes.func
};

export default PlatformList;
