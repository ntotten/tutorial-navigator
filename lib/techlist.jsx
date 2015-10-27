var Tech = require('./tech');

var TechList = React.createClass({
  render: function() {
    var collection = [];
    var classString = '';
    var options = this.props.getOptions(this.props.tutorial.options);

    if(!options) {
      return (
        <div></div>
      )
    }

    options.forEach(function(tech, i) {
      var time = 20 * i;

      collection.push(
        <Tech key={i} delay={time} model={tech} tutorial={this.props.tutorial} onClick={this.props.onItemClick}/>
      );
    }.bind(this));

    return (
      <div key={this.props.tutorial.options} className={classString + "container"}>
        <ul className="circle-list">
          {collection}
        </ul>
      </div>
    );
  }
});

module.exports = TechList;
