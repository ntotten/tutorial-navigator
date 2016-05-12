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
    let {quickstarts, onDocumentLoaded, customNavigationAction} = this.props;
    let items = null;
    let hide = 'hide ';
    if (quickstarts) {
      hide = '';
      items = Object.keys(quickstarts).map(appType => {
        return <Quickstart
          key={appType}
          quickstart={quickstarts[appType]}
          onDocumentLoaded={onDocumentLoaded}
          customNavigationAction={customNavigationAction} />
      })
    }
    return (
      <div className={hide + "quickstart-list container"}>
        <div className="js-carousel" ref="carousel">{items}</div>
      </div>
    );
  }
  
}

QuickstartList.propTypes = {
  quickstarts: React.PropTypes.array,
  onDocumentLoaded: React.PropTypes.func,
  customNavigationAction: React.PropTypes.func,
  componentLoadedInBrowser: React.PropTypes.func
};

export default QuickstartList;
