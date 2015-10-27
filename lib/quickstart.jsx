var Quickstart = React.createClass({
  handleClick: function(quickstart) {
    var question = this.props.getQuestion(quickstart.name);
    this.props.onClick(quickstart.name);
  },
  render: function() {
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
});

module.exports = Quickstart
