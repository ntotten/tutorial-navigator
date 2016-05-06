import React from 'react';
import Platform from './platform';
import { getPlatformCollection } from '../util/tutorials';

class PlatformList extends React.Component {
  
  render() {
    let {quickstart, appType, onDocumentLoaded, customNavigationAction} = this.props;
    
    let items = getPlatformCollection(quickstart, appType).map((platform, i) => {
      return <Platform
        key={appType + i}
        delay={20 * i}
        appType={appType}
        platform={platform}
        onDocumentLoaded={onDocumentLoaded}
        customNavigationAction={customNavigationAction}/>;
    });

    return (
      <div key={this.props} className="container techlist">
        <ul className="circle-list">{items}</ul>
      </div>
    );
  }
  
}

export default PlatformList;
