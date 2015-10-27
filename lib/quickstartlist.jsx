var Quickstart = require('./quickstart');

var QuickstartList = React.createClass({
  componentWillUpdate: function(){
    if (this.props.onQuickstartListLoading){
      this.props.onQuickstartListLoading({ element : this.refs.carousel.getDOMNode(), quickstarts : this.props.quickstarts });
    }
  },
  componentDidUpdate: function() {
    if (this.props.onQuickstartListLoaded){
      this.props.onQuickstartListLoaded({ element : this.refs.carousel.getDOMNode(), quickstarts : this.props.quickstarts });
    }
  },
  render: function() {
    var list = [];
    var hide = (this.props.tutorial.appType) ? 'hide ' : '';
    this.props.quickstarts.forEach(function(quickstart, i) {
        list.push(
          <Quickstart
            getQuestion={this.props.getQuestion}
            key={i}
            model={quickstart}
            tutorial={this.props.tutorial}
            onClick={this.props.onItemClick}
          />);
    }.bind(this));

    return (
      <div key={this.props.tutorial} className={hide + "quickstart-list container"}>
        <div className="js-carousel" ref="carousel">{list}</div>
      </div>
    );
  }
});

module.exports = QuickstartList;
