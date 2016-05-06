import React from 'react';
import Quickstart from './quickstart';

class QuickstartList extends React.Component {
  
  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.componentDidMountClient();
    }
  }
  
  componentDidMountClient() {
    // Runs only on client, not on server
    if (this.props.componentLoadedInBrowser) {
      this.props.componentLoadedInBrowser.call(this);
    }
  }
  
  render() {
    let {quickstart, onDocumentLoaded, customNavigationAction} = this.props;
    let list = quickstart.appTypes.map((appType, i) => {
      return <Quickstart key={i} model={appType} onDocumentLoaded={onDocumentLoaded} customNavigationAction={customNavigationAction}/>
    })
    let hide = quickstart.appTypes ? '' : 'hide'
    return (
      <div className={hide + "quickstart-list container"}>
        <div className="js-carousel" ref="carousel">{list}</div>
      </div>
    );
  }
  
}

QuickstartList.propTypes = {
  quickstart: React.PropTypes.object,
  onDocumentLoaded: React.PropTypes.func,
  customNavigationAction: React.PropTypes.func,
  componentLoadedInBrowser: React.PropTypes.func
};

export default QuickstartList;
