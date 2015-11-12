import React from 'react';
import Tech from './tech';
import { getPlatformCollection } from '../util/tutorials';

class TechList extends React.Component {
  render() {
    var collection = [];
    var classString = '';

    var platformType = this.props.appType;
    if (this.props.tech1) {
      platformType = 'backend';
    }

    var skippable = true;
    if(platformType === 'backend' || platformType === 'webapp') {
      skippable = false;
    }

    getPlatformCollection(this.props.quickstart, platformType)
    .forEach((tech, i) => {
      var time = 20 * i;

      collection.push(
        <Tech
          key={platformType + i}
          delay={time}
          skippable={skippable}
          tech={tech}
          tech1={this.props.tech1}
          appType={this.props.appType}
          onDocumentLoaded={this.props.onDocumentLoaded}
          customNavigationAction={this.props.customNavigationAction}/>
      );
    });

    return (
      <div key={this.props} className={classString + "container techlist"}>
        <ul className="circle-list">
          {collection}
        </ul>
      </div>
    );
  }
}

export default TechList;
